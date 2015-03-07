
module.exports = function(value, dic){
  var val = value
  Object.keys(dic).reverse().forEach(function(key){
    val = val.replace(key, dic[key])
  })
  return val
}
