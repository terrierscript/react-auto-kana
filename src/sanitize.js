var skipSameValue = function(histories){
  return histories.reduce(function(result, value){
    var last = result[result.length - 1]
    if(last === undefined || last !== value){
      result.push(value)
    }
    return result
  }, [])
}
module.exports = function(array){
  array = skipSameValue(array)
  return array
}
