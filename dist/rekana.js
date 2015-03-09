var kanachar = require("./kanachar")

var revertToKana = function(value, pairs){
  pairs.concat().reverse().forEach(function(pair){
    if(!kanachar(pair[1])){
      return
    }
    value = value.replace(pair[0], pair[1])
  })
  return value
}
var revert = function(value, pairs){
  //pairs.concat().reverse().forEach(function(pair){
  pairs.concat().forEach(function(pair){
    value = value.replace(pair[0], pair[1])
  })
  return value
}

module.exports = function(value, pairs){
  value = revert(value, pairs)
  return revertToKana(value, pairs)
}

module.exports.revert = function(value, pairs){
  return revert(value, pairs)
}
