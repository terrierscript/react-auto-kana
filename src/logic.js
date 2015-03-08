var japanese = require("japanese")
var rekana = require("./rekana")
var isHiragana = require("./is_hiragana")
var diff = require("./diff")

var onlyKana = function(value){
  var m = value.match(japanese.hiraganaRegex)
  return m ? m.join("") : ""
}

var isConvert = function(d){
  return d.removed && d.added
}

var build2 = function(state){
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  if(prev === current){ // no change
    return state
  }
  var diffPack = diff(prev, current)
  console.log(JSON.stringify(diffPack))
  // analyse
  var stack = state.stack || []
  // var bornes = state.bornes || []
  diffPack.forEach(function(d){
    if(!isConvert(d)){
      return
    }
    if(isHiragana(d.added)){
      return
    }
    stack.push([d.added, d.removed])
  })

  var kanad = rekana(current, stack)
  var converted = onlyKana(kanad)
  var next = {
    stack : stack,
    kana : converted,
  }
  return next
}
module.exports = function(state){
  //var next =
  //build(state)
  var next = build2(state)
  // store prev value
  next.prev = state.value

  // debug
  next.history = (function(history){
    history.push(state.value)
    return history
  })(state.history || [])
  // end debug
  return next
}
