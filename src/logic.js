var japanese = require("japanese")
var rekana = require("./rekana")
var kanachar = require("./kanachar")
var diff = require("compact-diff")

var convertPairs = function(prev, current, pairs){
  var diffPack = diff(prev, current)
  pairs = pairs || []
  diffPack.forEach(function(d){
    if(!d.removed || !d.added){ // skip if not pair
      return
    }
    var pair = [d.added, d.removed]
    if(kanachar(d.removed)){
      pairs.unshift(pair)
    }else{
      // 下記のような変遷をたどった場合の対応策
      // ex: お -> を -> お
      var emulatePairs = [pair].concat(pairs)
      var reverted = rekana(current, emulatePairs)
      if(kanachar(reverted)){
        pairs.unshift([d.added, d.removed])
      }
    }
  })
  return pairs
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

var convertPair = function(prev, current){
  var diffPack = diff(prev, current)
  return diffPack.filter(function(d){
    return (d.added || d.removed)
  })
}
var build = function(state){
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  if(prev === current){ // no change
    return {}
  }
  var prevMode = state.mode
  var mode = getMode(prev, current)
  console.log(prevMode, mode, prev, current, convertPair(prev, current))
  // 完全一致の文字列が過去に存在した場合は、cacheを利用
  // 下記挙動の場合の対処も兼ねる
  // ex: 山田 -> 山 -> 山田
  var cache = state.cache || {}
  if(cache[current]){
    return { kana : cache[current] }
  }
  // default
  var pairs = convertPairs(prev, current, state.pairs)
  //console.log(state.prev, state.value, pairs)
  var converted = rekana(current, pairs)
  if(!kanachar(converted)){
    converted = state.kana
  }else{
    cache[current] = converted
  }
  return {
    pairs : pairs,
    kana : converted,
    cache : cache,
    mode : mode
  }
}
module.exports = function(state){
  var next = build(state)
  return {
    pairs : next.pairs || state.pairs || [],
    kana : next.kana || state.kana || "",
    cache : next.cache || state.cache || {},
    mode : next.mode || state.mode || {},
    prev : state.value,
  }
}
