var japanese = require("japanese")
var rekana = require("./rekana")
var kanachar = require("./kanachar")
var diff = require("compact-diff")
var stemora = require("stemora")

// を === お
var isSameKana = function(str1, str2){
  if(!kanachar(str1)){
    return false
  }
  if(!kanachar(str2)){
    return false
  }
  return (stemora.normalize(str1) === stemora.normalize(str2))
}

// dirty...
var convertPairs = function(prev, current, patches){
  var diffPack = diff(prev, current)
  patches = patches || []
  diffPack.forEach(function(d){
    if(!d.removed || !d.added){ // skip if not pair
      return
    }
    var pair = [d.added, d.removed]
    if(kanachar(d.removed)){
      // for mobile. convert directory like やまた -> やまだ
      if(kanachar(d.added) && !isSameKana(d.added, d.removed)){
        return
      }
      patches.unshift(pair)
    }else{
      // 下記のような変遷をたどった場合の対応策
      // ex: お -> を -> お
      var emulatePair = [pair].concat(patches)
      var reverted = rekana(current, emulatePair)
      if(kanachar(reverted)){
        if(kanachar(d.added) && !isSameKana(d.added, reverted)){
          return
        }
        patches.unshift([d.added, d.removed])
      }
    }
  })
  return patches
}

var getMode = function(prev, current){
  var diffPack = diff(prev, current)
  for(var i = 0; i < diffPack.length; i++){
    var d = diffPack[i]
    if(d.added && d.removed){
      return "convert"
    }
    if(d.added){
      return "added"
    }
    if(d.removed){
      return "removed"
    }
  }
}
var build = function(state){
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  if(prev === current){ // no change
    return {}
  }
  var mode = getMode(prev, current)
  // 完全一致の文字列が過去に存在した場合は、cacheを利用
  // 下記挙動の場合の対処も兼ねる
  // ex: 山田 -> 山 -> 山田
  var cache = state.cache || {}
  if(cache[current]){
    return { kana : cache[current] }
  }
  // default
  var patches = convertPairs(prev, current, state.patches)
  //console.log(state.prev, state.value, patches)
  var converted = rekana(current, patches)
  if(!kanachar(converted)){
    converted = state.kana
  }else{
    cache[current] = converted
  }
  return {
    patches : patches,
    kana : converted,
    cache : cache,
    mode : mode
  }
}

module.exports = function(state){
  var next = build(state)
  return {
    patches : next.patches || state.patches || [],
    kana : next.kana || state.kana || "",
    cache : next.cache || state.cache || {},
    prev : state.value,
  }
}
