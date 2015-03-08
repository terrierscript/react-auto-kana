var japanese = require("japanese")
var rekana = require("./rekana")
var kanachar = require("../lib/kanachar")
var diff = require("../lib/diff")

var convertPairs = function(prev, current, pairs){
  var diffPack = diff(prev, current)
  pairs = pairs || []
  diffPack.forEach(function(d){
    if(!d.removed || !d.added){ // not pair
      return
    }
    var pair = [d.added, d.removed]
    if(!kanachar(d.removed)){
      // を -> お という変換をなるべくスムーズに
      var reverted = rekana.revert(d.removed, pairs)
      if(kanachar(reverted)){
        pairs.unshift([d.added, reverted])
      }
      return
    }
    pairs.unshift(pair)
  })
  return pairs
}
var build = function(state){
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  if(prev === current){ // no change
    return {}
  }
  // 下記挙動の場合のskip
  // ex: 山田 -> 山 -> 山田
  var cache = state.cache || {}
  if(cache[current]){
    return { kana : cache[current] }
  }

  // default
  var pairs = convertPairs(prev, current, state.pairs)
  var converted = rekana(current, pairs)
  if(!kanachar(converted)){
    converted = state.kana
  }
  cache[current] = converted
  return {
    pairs : pairs,
    kana : converted,
    cache : cache
  }
}
module.exports = function(state){
  var next = build(state)
  var n = {
    pairs : next.pairs || state.pairs || [],
    kana : next.kana || state.kana || "",
    cache : next.cache || state.cache || {},
    // store prev value
    prev : state.value,
  }
  return n
}
