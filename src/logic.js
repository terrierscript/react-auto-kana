var japanese = require("japanese")
var rekana = require("../lib/rekana")
var hiragana = require("../lib/hiragana")
var diff = require("../lib/diff")

var isConvertDiff = function(d){
  return d.removed && d.added
}

var build = function(state){
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  if(prev === current){ // no change
    return state
  }
  var diffPack = diff(prev, current)
  // analyse
  var stack = state.stack || []
  diffPack.forEach(function(d){
    if(!isConvertDiff(d)){
      return
    }
    if(hiragana.isHiragana(d.added)){
      return
    }
    stack.push([d.added, d.removed])
  })

  var converted = rekana(current, stack)
  if(!hiragana.isHiragana(converted)){
    converted = state.kana
  }
  var next = {
    stack : stack,
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
