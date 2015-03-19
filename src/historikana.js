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
  var result = befores.map(function(val){
    return val.replace(reg, "")
  })
  // console.log(befores, result)
  return result
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

var matcher = function(value){
  var pattern = []
  // left
  var regValue = "(" + value + ")"
  var leftReg = new RegExp("^" + regValue + "(.*)" + "$")
  if(leftReg.test(value)){
    var leftResult = leftReg.exec(value)
    pattern.push({
      left : leftResult[1],
      right : leftResult[2]
    })
  }
  var rightReg = new RegExp("^" + "(.*)" + regValue + "$")
  if(rightReg.test(value)){
    var rigthResult = rightReg.exec(value)
    pattern.push({
      left : rigthResult[1],
      right : rigthResult[2]
    })
  }
  // center
  var centerReg = new RegExp("^(.*)" + regValue + "(.*)$")
  if(centerReg.test(value)){
    var centerResult = centerReg.exec(value)
    pattern.push({
      left : centerResult[1],
      center : centerResult[2],
      right : centerResult[3]
    })
  }
}

var detectPartialize = function(reversed, groups, debug){
  var head = reversed[0]
  var hasMatched = false
  // console.log("==================")
  // console.log(debug, head, groups)
  // 分解を特定する。最も後ろのパターンでのマッチを優先させる
  reversed.reduce(function(result, value, i){
    var regValue = "(" + value + ")"

    var reg = new RegExp("^(.*)" + regValue + "(.*)$")
    if(!reg.test(head) || head === value || value === "" || hasMatched){
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
    // console.log(debug, [head, "=>", value])
    // console.log(debug, [left, center, right])
    // console.log(debug, [lefts, centers, rights])
    if(lefts){
      // console.log("left", lefts, [head, "=>", value], [lefts, centers, rights])
      // console.log("lefts", lefts)
      detectPartialize(lefts, groups, "left-" + value)
    }
    if(centers){
      // console.log("center", centers, reversed)
      detectPartialize(centers, groups, "center-" + value)
    }
    if(rights){
      // console.log("right", rights)
      detectPartialize(rights, groups, "rigth-" + value)
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
  var groups = detectPartialize(reversed, [], "start")
  // console.log(groups)
  var kana = groups.map(getKana)
  return kana.join("")
}
