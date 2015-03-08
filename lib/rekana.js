var isHiragana = require("./hiragana").isHiragana


var replaceKana = function(value, dic){
  dic.concat().forEach(function(d){
    if(isHiragana(d[1])){
      value = value.replace(d[0], d[1])
    }
  })
  return value
}
var replaceConvert = function(value, dic){
  dic.concat().reverse().forEach(function(d){
    if(!isHiragana(d[1])){
      value = value.replace(d[0], d[1])
    }
  })
  return value
}

module.exports = function(value, dic){
  value = replaceConvert(value, dic)
  return replaceKana(value, dic)
}
