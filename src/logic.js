var japanese = require("japanese")
var rekana = require("../lib/rekana")
var kanachar = require("../lib/kanachar")
var diff = require("../lib/diff")

var buildConvertDict = function(prev, current, dic){
  var diffPack = diff(prev, current)
  dic = dic || []
  diffPack.forEach(function(d){
    if(!d.removed || !d.added){
      return
    }
    var pairDic = [d.added, d.removed]
    if(kanachar(d.added) && !kanachar(d.removed)){
      var rk = rekana.revert(current, [pairDic].concat(dic))
      if(kanachar(rk)
        && rk.length === d.added.length
        && rk !== d.added){
        dic.unshift([d.added, rk])
        return
      }
    }
    if(!kanachar(d.removed)){
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
  var dict = buildConvertDict(prev, current, state.dict)
  var converted = rekana(current, dict)
  if(!kanachar(converted)){
    converted = state.kana
  }
  var next = {
    dict : dict,
    kana : converted,
  }
  return next
}
module.exports = function(state){
  var next = build(state)
  // store prev value
  next.prev = state.value
  return next
}
