var compactDiff = require("compact-diff")
var isConvert = function(diff){
  return (diff.added && diff.removed)
}

var isChanged = function(diff){
  return (diff.added || diff.removed)
}

var getConverts = function(diffs){
  return diffs.filter(function(diff){
    return isConvert(diff)
  })
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

  // if(!isCenter){
  // }
  // if(isCenter){
  //   var lefts = rest.map(function(value){
  //     var reg = new RegExp(edges.right + "$")
  //     return value.replace(reg, "")
  //   })
  //   var rights = rest.map(function(value){
  //     var reg = new RegExp("^" + edges.left)
  //     return value.replace(reg, "")
  //   })
  //   // console.log([lefts, rights])
  // }
  // console.log(hitted, rest)
}
var partial = function(array, result){
  result = result || []
  var part = partialize(array)
  // console.log(part)
  if(part.next){
    var nR = partial(part.next)
    console.log("====")
    console.log(nR, part.left, part.right)
    // TODO:left と rightの位置を調整したい。
    if(nR[0] === part.left){
      nR.unshift(part.current)
      // result.push(part.current)
    }else{
      nR.push(part.current)
    }
    return nR
  }else{
    result.push(part.current)
  }
  return result
}
module.exports = partial
