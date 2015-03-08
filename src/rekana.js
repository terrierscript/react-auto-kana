var kanachar = require("./kanachar")

var replaceKana = function(value, dic){
  dic.concat().reverse().forEach(function(d){
    if(!kanachar(d[1])){
      return
    }
    value = value.replace(d[0], d[1])
  })
  return value
}
var revert = function(value, dic){
  dic.concat().reverse().forEach(function(d){
    value = value.replace(d[0], d[1])
  })
  return value
}

module.exports = function(value, dic){
  value = revert(value, dic)
  return replaceKana(value, dic)
}

module.exports.revert = function(value, dic){
  return revert(value, dic)
}
