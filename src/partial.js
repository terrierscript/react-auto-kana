var compactDiff = require("compact-diff")

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
  })
}

var partialize_ = function(array){
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
    var leftEdge = diffEdge(diffs).join("")
    var rightEdge = diffEdge(diffs.concat().reverse()).reverse().join("")
    if(edges === undefined){
      edges = {
        left : leftEdge,
        right : rightEdge
      }
      return
    }
    if(edges.left !== leftEdge && rightEdge === ""){
      breakpoint = i
      return
    }
    if(edges.right !== rightEdge && leftEdge === ""){
      breakpoint = i
      return
    }
  })
  console.log(array, breakpoint)
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


var getBreakPoint = function(array){
  var head = array[0]
  var left, right
  var breakpoint = -1
  // detect breakpoint
  array.forEach(function(value, i){
    if(!array[i + 1] || head === value || breakpoint > -1){
      return
    }
    var diffs = compactDiff(value, head)
    var _left = diffEdge(diffs).join("")
    var _right = diffEdge(diffs.concat().reverse()).reverse().join("")
    if(left === undefined && right === undefined){
      left = _left
      right = _right
    }
    // break
    if(left !== _left){
      if(right === "" && _left === ""){
        breakpoint = i
        return
      }
      left = _left
    }
    if(right !== _right){
      if(left === "" && _right === ""){
        breakpoint = i
        return
      }
      right = _right
    }
  })
  return {
    breakpoint : breakpoint,
    left : left,
    right : right
  }
}

var sanitize = function(array, left, right){
  return array.map(function(value){
    var reg = new RegExp("^" + left + "(.+)" + right + "$")
    return value.replace(reg, "$1")
  })
}

var partialize = function(array){
  var breaks = getBreakPoint(array)

  if(breaks.breakpoint === -1){
    return [array]
  }
  var rest = array.concat() // copy
  var hitted = rest.splice(0, breaks.breakpoint - 1)
  hitted = sanitize(hitted, breaks.left, breaks.right)
  var r = partialize(rest)
  var h = partialize(hitted)
  if(breaks.left !== ""){
    return r.concat(h)
  }else if(breaks.right !== ""){
    return h.concat(r)
  }
}

var partial = function(array, result){
  result = result || []
  var part = partialize(array)
  return part
}
module.exports = function(array){
  var result = partial(array, [])
  return result
}
