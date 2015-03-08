var japanese = require("japanese")
var rekana = require("../lib/rekana")
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
    return state
  }
  var kanaHistory = state.kanaHistory || {}
  // skip add and remove
  // ex: 山田 -> 山 -> 山田
  if(kanaHistory[current]){
    return {
      dict : state.dict,
      kana : kanaHistory[current],
      kanaHistory : kanaHistory
    }
  }
  var dict = buildConvertDict(prev, current, state.dict)
  var converted = rekana(current, dict)
  if(!kanachar(converted)){
    converted = state.kana
  }
  kanaHistory[current] = converted
  var next = {
    dict : dict,
    kana : converted,
    kanaHistory : kanaHistory
  }
  return next
}
module.exports = function(state){
  var next = build(state)
  // store prev value
  next.prev = state.value
  return next
}
