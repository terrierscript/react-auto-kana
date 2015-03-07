var replace = function(value, dic){
  var val = value
  // converts.forEach(function(pair){
  //   val = val.replace(pair[0], pair[1])
  // })
  Object.keys(dic).reverse().forEach(function(key){
    val = val.replace(key, dic[key])
  })
  return val
}

module.exports = function(value, dic){
  return replace(value, dic)
}
