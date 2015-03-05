var JsDiff = require("diff")

var hasAddedDiff = function(diff){
  return diff.some(function(d){
    return d.added === true
  })
}
var hasRemovedDiff = function(diff){
  return diff.some(function(d){
    return d.removed === true
  })
}

var args = function(oldStrOrDiff, newStr){
  if(newStr === undefined){
    return oldStrOrDiff
  }
  return JsDiff.diffChars(oldStrOrDiff, newStr)
}
module.exports = function(oldStr, newStr){
  var diff = args(oldStr, newStr)
  return {
    // only added
    added     : hasAddedDiff(diff),
    // only removed
    removed   : hasRemovedDiff(diff),
  }
}
