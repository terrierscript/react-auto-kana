var japanese = require("japanese")
var rekana = require("./rekana")
var kanachar = require("./kanachar")
var diff = require("compact-diff")
var extend = require("extend")
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
var convertPairs = function(prev, current, pairs){
  var diffPack = diff(prev, current)
  pairs = pairs || []
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
      pairs.unshift(pair)
    }else{
      // 下記のような変遷をたどった場合の対応策
      // ex: お -> を -> お
      var emulatePairs = [pair].concat(pairs)
      var reverted = rekana(current, emulatePairs)
      if(kanachar(reverted)){
        if(kanachar(d.added) && !isSameKana(d.added, reverted)){
          return
        }
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
      return "converted"
    }
    if(d.added){
      return "added"
    }
    if(d.removed){
      return "removed"
    }
  }
}

var getConvertPair = function(prev, current){
  var diffPack = diff(prev, current)
  return diffPack.filter(function(d){
    return (d.added || d.removed)
  })
}

var buildPartialInner = function(partial, current, prev){
  // 完全一致の文字列が過去に存在した場合は、cacheを利用
  // 下記挙動の場合の対処も兼ねる
  // ex: 山田 -> 山 -> 山田
  var cache = partial.cache || {}
  if(cache[current]){
    return { kana : cache[current] }
  }

  // default
  var pairs = convertPairs(prev, current, partial.pairs)
  //console.log(state.prev, state.value, pairs)
  var converted = rekana(current, pairs)
  if(!kanachar(converted)){
    converted = partial.kana
  }else{
    cache[current] = converted
  }
  return {
    value : current,
    pairs : pairs,
    kana : converted,
    cache : cache,
  }
}

var buildPartial = function(partial, current, prev){
  var next = buildPartialInner(partial, current, prev)
  var defaults = {
    stacks : [],
    pairs :  [],
    kana  :  "",
    cache : {},
    mode  :  {},
  }
  return extend(defaults, next, {
    prev : current
  })
}

var build = function(state){
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  if(prev === current){ // no change
    return {}
  }
  // LEAST prev = partials.join
  var prevMode = state.mode
  var mode = getMode(prev, current)
  var stacks = state.stacks || []
  var active = stacks[stacks.length - 1]
  if(prev === active && mode === "converted"){
    stacks.pop()
    stacks.push(current)
  }else if(prevMode === "converted"
    && mode === "converted"
    && kanachar(prev)){
    stacks.push(current)
  }else{
  //  console.log("LLLLLLLLL")
  }

  // history.push([
  //   prev, current, prevMode, mode, kanachar(prev)
  // ].join(" , "))

  return buildPartial(state, current, prev)
}
module.exports = function(state){
  var next = build(state)
  var defaults = {
    stacks : [],
    pairs :  [],
    kana  :  "",
    cache : {},
    mode  :  {},
  }
  return extend(defaults, state, next, {
    prev : state.value
  })
}
