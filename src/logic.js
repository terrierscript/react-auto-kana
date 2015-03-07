var japanese = require("japanese")
var kanamap = require("./kanamap")


var onlyKana = function(value){
  var m = value.match(japanese.hiraganaRegex)
  return m ? m.join("") : ""
}

var buildKana = function(map, value){
  var kana = value
  // convert with map
  Object.keys(map).forEach(function(key){
    var val = map[key]
    kana = kana.replace(key, val)
  })
  return onlyKana(kana)
}

var build = function(state){
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  var map = state.map || {}
  // hiragana and katakana
  if(prev === current){
    return state
  }
  map = kanamap(prev, current, map)
  var kana = buildKana(map, current)

  var nextState = {
    kana : kana,
    map : map,
  }
  return nextState
}

module.exports = function(state){
  console.log(state)
  var next = build(state)
  // store prev value
  next.prev = state.value

  return next
}
