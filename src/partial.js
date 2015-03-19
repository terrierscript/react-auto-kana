var compactDiff = require("compact-diff")
var isConvert = function(diff){
  return (diff.added && diff.removed)
}

var isChanged = function(diff){
  return (diff.added || diff.removed)
}


var diffEdge = function(diffs){
  var stop = false
  return diffs.reduce(function(result, diff){
    if(isChanged(diff) || stop){
      stop = true
      return result
    }
    result.push(diff)
    return result
  }, []).map(function(diff){
    return diff.value
  }).join("")
}

var partialize = function(array){
  var head = array[0]
  var edges
  var breakpoint = -1
  // detect breakpoint
  array.forEach(function(value, i){
    var next = array[i + 1]
    if(!next){ return }
    if(head === value){ return }
    if(breakpoint > -1){ return }
    var diffs = compactDiff(value, head)
    var leftDiff = diffEdge(diffs)
    var rightDiff = diffEdge(diffs.concat().reverse())
    if(edges === undefined){
      edges = {
        left : leftDiff,
        right : rightDiff
      }
    }
    if(edges.left !== leftDiff || edges.right !== rightDiff){
      breakpoint = i
      return
    }
  })
  if(breakpoint === -1){
    return {
      current : array
    }
  }
  // split array
  var rest = array.concat()
  var hitted = rest.splice(0, breakpoint - 1)
  var current = hitted.map(function(value){
    var reg = new RegExp("^" + edges.left + "(.+)" + edges.right + "$")
    return value.replace(reg, "$1")
  })
  return {
    current : current,
    left : edges.left,
    right : edges.right,
    next : rest
  }
}
var partial = function(array, result){
  result = result || []
  var part = partialize(array)
  // console.log(array)
  if(!part.next){
    result.push(part.current)
    return result
  }
  var nextResult = partial(part.next)
  var heads = nextResult.map(function(n){
    return n[0]
  })
  var leftIndex = heads.indexOf(part.left)
  var rightIndex = heads.indexOf(part.right)
  if(leftIndex > -1){
    nextResult.splice(leftIndex + 1, 0, part.current)
  }else if(rightIndex > -1){
    nextResult.splice(rightIndex, 0, part.current)
  }
  return nextResult
}
module.exports = function(array){
  return partial(array, [])
}
