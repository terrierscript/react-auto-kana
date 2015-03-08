var japanese = require("japanese")

// もはやjapaneseいらないかこれ。
var buildReg = function(){
  var reg = new RegExp(japanese.hiraganaRegex)
  var source = reg.source
                  .replace("[", "")
                  .replace("]", "")
  source += " 　ー" // harf space and full space
  var kanaSource = ["[", source, "]"].join("")
  return new RegExp(kanaSource, "g")
}

module.exports.isHiragana = function(str){
  var m = str.match(buildReg())
  return !!(m && m.length === str.length)
}
