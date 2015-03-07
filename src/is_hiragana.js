var japanese = require("japanese")
module.exports = function(str){
  var m = str.match(japanese.hiraganaRegex)
  return (m && m.length === str.length) ? true : false
}
