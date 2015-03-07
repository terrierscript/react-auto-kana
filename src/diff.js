// Compact diff

var JsDiff = require("diff")

var normalize = function(diff){
  var str = {}
  if(diff.added){
    str.added = diff.value
    return str
  }
  if(diff.removed){
    str.removed = diff.value
    return str
  }
  str.value = diff.value
  return str
}
module.exports = function(prev, current) {
  var diff = JsDiff.diffChars(prev, current)
  var diffStruct = []
  diff.reduce(function(first, second, index, arr) {
    //console.log(first, second)
    if (first.added && second.removed) {
      diffStruct.push({
        added: first.value,
        removed: second.value
      })
    }else if(!second.added && !second.removed) {
      diffStruct.push(normalize(second))
    } else if(index === arr.length - 1 ){ // last
      diffStruct.push(normalize(second))
    }
    return second
  }, {})
  return diffStruct
}
