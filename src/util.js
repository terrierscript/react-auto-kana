
var getMode = function(prev, current){
  var diffPack = diff(prev, current)
  for(var i = 0; i < diffPack.length; i++){
    var d = diffPack[i]
    if(d.added && d.removed){
      return "converted"
    }
    if(d.added){
      return "added"
    }
    if(d.removed){
      return "removed"
    }
  }
}

var getConvertPair = function(prev, current){
  var diffPack = diff(prev, current)
  return diffPack.filter(function(d){
    return (d.added || d.removed)
  })
}