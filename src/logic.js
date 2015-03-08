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
    if(!kanachar(d.removed)){
      // 下記のような変遷をたどった場合の対応策
      // ex: お -> を -> お
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
  // 完全一致の文字列が過去に存在した場合は、cacheを利用
  // 下記挙動の場合の対処も兼ねる
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
  return {
    pairs : next.pairs || state.pairs || [],
    kana : next.kana || state.kana || "",
    cache : next.cache || state.cache || {},
    prev : state.value,
  }
}
