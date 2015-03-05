var japanese = require("japanese")

var isHiragana = function(str){
  var m = str.match(japanese.hiraganaRegex)
  return (m && m.length === str.length) ? true : false
}
var isKatakana = function(str){
  var m = str.match(japanese.katakanaRegex)
  return (m && m.length === str.length) ? true : false
}

module.exports.isHiragana = isHiragana
module.exports.isKatakana = isKatakana

module.exports.split = function(str){
  str = str || ""
  var splits = []
  var currentBuffer = ""
  var currentMode
  str.split("").forEach(function(char){
    var kanaFlag = isHiragana(char)
    if(currentMode === undefined){ // initalize
      currentMode = kanaFlag
    }
    // console.log(char, kanaFlag, currentMode, currentBuffer)
    if(currentMode !== kanaFlag){
      splits.push(currentBuffer)
      currentBuffer = ""
      currentMode = kanaFlag
    }
    currentBuffer += char
  })
  splits.push(currentBuffer)
  return splits
}
