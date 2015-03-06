var japanese = require("japanese")
var kanamap = require("./kanamap")

var toKana = function(map, value){
  var kana = value
  // convert with map
  Object.keys(map).forEach(function(key){
    var val = map[key]
    kana = kana.replace(key, val)
  })

  // sanitize (to only kana)
  var m = kana.match(japanese.hiraganaRegex)
  return m ? m.join("") : ""
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
  var kana = toKana(map, current)

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
