var isHiragana = require("./is_hiragana")

// var replace = function(value, dic){
//   var val = value
//   // converts.forEach(function(pair){
//   //   val = val.replace(pair[0], pair[1])
//   // })
//   Object.keys(dic).reverse().forEach(function(key){
//     val = val.replace(key, dic[key])
//   })
//   return val
// }

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
module.exports.replaceConvert = function(value, dic){
  dic.concat().reverse().forEach(function(d){
    value = value.replace(d[0], d[1])
  })
  return value
}
