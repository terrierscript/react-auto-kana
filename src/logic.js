var japanese = require("japanese")
var kanadic = require("./kanadic")
var rekana = require("./rekana")
var isHiragana = require("./is_hiragana")

var onlyKana = function(value){
  var m = value.match(japanese.hiraganaRegex)
  return m ? m.join("") : ""
}

var buildKana = function(dic, value){
  var kana = value
  // convert with dic
  Object.keys(dic).forEach(function(key){
    var val = dic[key]
    kana = kana.replace(key, val)
  })
  return onlyKana(kana)
}

var build = function(state){
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  var dic = state.dic || {}
  var kana = state.kana || ""
  // hiragana and katakana
  if(prev === current){
    return state
  }
  dic = kanadic(prev, current, dic)

  var newKana = rekana(current, dic)
  if(isHiragana(newKana)){
    kana = newKana
  }

  var nextState = {
    kana : kana,
    dic : dic,
  }
  return nextState
}

module.exports = function(state){
  console.log(state.prev, state.value, state.dic)
  var next = build(state)
  // store prev value
  next.prev = state.value

  return next
}
