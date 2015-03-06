var japanese = require("japanese")

// sanitize (to only kana)
module.export = function(value){
  var m = value.match(japanese.hiraganaRegex)
  return m ? m.join("") : ""
}
