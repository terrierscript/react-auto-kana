var kanachar = require("./kanachar")
var stemora = require("stemora")

// を === お
var isSameKana = function(str1, str2){
  if(!kanachar(str1)){
    return false
  }
  if(!kanachar(str2)){
    return false
  }
  return (stemora.normalize(str1) === stemora.normalize(str2))
}
var spoilLeft = function(left, center, right, befores){
  if(left === ""){
    return null
  }
  var reg = new RegExp(center + right + "$")
  return befores.map(function(val){
    return val.replace(reg, "")
  })
}
var spoilRight = function(left, center, right, befores){
  if(right === ""){
    return null
  }
  var reg = new RegExp("^" + left + center)
  return befores.map(function(val){
    return val.replace(reg, "")
  })
}
var detectPartialize = function(reversed, groups){
  var head = reversed[0]
  var hasMatched = false
  // console.log("==================" + head, groups)
  // 分解を特定する。最も後ろのパターンでのマッチを優先させる
  reversed.reduce(function(result, value, i){
    var regValue = "(" + value + ")"
    var reg = new RegExp("(.*)" + regValue + "(.*)")
    if(!reg.test(head) || head === value || value === ""){
      return result
    }
    // console.log("======|||||||============")
    hasMatched = true
    var matched = reg.exec(head)
    var left = matched[1]
    var center = matched[2]
    var right = matched[3]
    var befores = reversed.slice(0, i - 1)
    var lefts = spoilLeft(left, center, right, befores)
    var rights = spoilRight(left, center, right, befores)
    var centers = reversed.slice(i, reversed.length)
    // console.log(lefts, centers, rights)
    if(lefts){
      // console.log("left", lefts, [head,value], [left , center , right])
      detectPartialize(lefts, groups)
    }
    groups.push(centers)
    if(rights){
      // console.log("right", rights)
      detectPartialize(rights, groups)
    }
  }, {})
  if(!hasMatched){
    groups.push(reversed)
  }
  // console.log(groups)

  return groups
}

var getKana = function(group){
  var kanas = group.filter(function(value){
    return kanachar(value)
  })
  return kanas.reduce(function(result, kana){
    if(isSameKana(result, kana)){
      return kana
    }
    return result
  }, kanas[0])

}

// remove concurrent same value.
var shrink = function(histories){
  return histories.reduce(function(result, value){
    var last = result[result.length - 1]
    if(last === undefined || last !== value){
      result.push(value)
    }
    return result
  }, [])
}

module.exports = function(histories){
  histories = shrink(histories)
  var reversed = histories.concat().reverse()
  var groups = detectPartialize(reversed, [])
  var kana = groups.map(getKana)
  return kana.join("")
}
