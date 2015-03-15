var diff = require("compact-diff")
var kanachar = require("./kanachar")
var convertPair = function(prev, current){
  return diff(prev, current).filter(function(d){
    return (d.added || d.removed)
  })[0] || {}
}

var diffmode = function(prev, current){
  var d = convertPair(prev, current)
  if(d.added && d.removed){
    return "converted"
  }
  if(d.added){
    return "added"
  }
  if(d.removed){
    return "removed"
  }
  return "none"
}
module.exports = diffmode
module.exports.isAddMode = function(prev, current, prevAdded){
  var dm = diffmode(prev, current)
  if(!prev){
    return true
  }
  if(kanachar(prev) && dm === "added"){
    return false
  }
  if((prevAdded === undefined || prevAdded === false) && dm === "added"){
    return true
  }
  return false
}
