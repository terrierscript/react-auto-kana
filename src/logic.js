var japanese = require("japanese")
var rekana = require("./rekana")
var kanachar = require("../lib/kanachar")
var diff = require("../lib/diff")

var buildConvertDict = function(prev, current, dic){
  var diffPack = diff(prev, current)
  dic = dic || []
  diffPack.forEach(function(d){
    if(!d.removed || !d.added){ // not pair
      return
    }
    var pairDic = [d.added, d.removed]
    if(!kanachar(d.removed)){
      // を -> お という変換をなるべくスムーズに
      var reverted = rekana.revert(d.removed, dic)
      if(kanachar(reverted)){
        dic.unshift([d.added, reverted])
      }
      return
    }
    dic.unshift(pairDic)
  })
  return dic
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
  var dict = buildConvertDict(prev, current, state.dict)
  var converted = rekana(current, dict)
  // console.log(converted, dict)
  if(!kanachar(converted)){
    converted = state.kana
  }
  cache[current] = converted
  return {
    dict : dict,
    kana : converted,
    cache : cache
  }
}
module.exports = function(state){
  var next = build(state)
  return {
    dict : next.dict || state.dict || [],
    kana : next.kana || state.kana || "",
    cache : next.cache || state.cache || {},
    // store prev value
    prev : state.value,
  }
}
