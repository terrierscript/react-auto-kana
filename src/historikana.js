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

var detectPartialize = function(reversed, groups){
  var head = reversed[0]
  // 分解を特定する。最も後ろのパターンでのマッチを優先させる
  var split = reversed.reduce(function(result, value, i){
    var regValue = "(" + value + ")"
    var reg = new RegExp("(.*)" + regValue + "(.*)")
    console.log("=============")
    console.log([head,value])
    if(!reg.test(head) || head === value){
      return result
    }
    var matched = reg.exec(head)
    var left = matched[1]
    var center = matched[2]
    var right = matched[3]
    var befores = reversed.slice(0, i - 1)
    console.log(value, [left, center, right], befores)
    // var left = reversed.slice(0, i - 1).map(function(val){
    //   return val.replace(value, "")
    // })
    // var right = reversed.slice(i, reversed.length - 1)
    // if(left && left.length > 0 || right && right.length){
    //   return {
    //     left : left,
    //     right : right
    //   }
    // }
    // return result
  }, {})

  // if(split.left && split.right){ // center && center)
  //   detectPartialize(split.right, groups)
  //   detectPartialize(split.left, groups)
  // }else{
  //   groups.push(reversed)
  // }
  console.log(head, groups)
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
