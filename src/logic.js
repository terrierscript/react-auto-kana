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
    if(kanachar(d.added)){
      return
    }
    dic.push([d.added, d.removed])
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
