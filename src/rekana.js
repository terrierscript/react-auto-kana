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
  pairs.concat().forEach(function(pair){
    // 確率的には正しいが、非常に場当たり的
    var reg = new RegExp("(.*)(" + pair[0] + ")")
    value = value.replace(reg, "$1" + pair[1])
    // value = value.replace(pair[0], pair[1])
    console.log(value)
  })
  return value
}

module.exports = function(value, pairs){
  console.log("===========")
  console.log("::", value)
  value = revert(value, pairs)
  
  return revertToKana(value, pairs)
}

module.exports.revert = function(value, pairs){
  return revert(value, pairs)
}
