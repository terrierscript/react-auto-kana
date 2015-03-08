// Generate compact diff
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

var hasChange = function(diff){
  return diff.added || diff.removed
}
module.exports = function(prev, current) {
  var diff = JsDiff.diffChars(prev, current)
  var diffStruct = []
  diff.reduce(function(first, second, index, arr) {
    if (first.added && second.removed) {
      diffStruct.push({
        added: first.value,
        removed: second.value
      })
      return {}
    }
    if(first.added && !second.removed) {
      diffStruct.push(normalize(first))
    }
    if(!hasChange(second)) {
      diffStruct.push(normalize(second))
    } else if(index === arr.length - 1 ){ // last
      diffStruct.push(normalize(second))
    }
    return second
  }, {})
  return diffStruct
}
