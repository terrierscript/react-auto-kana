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
  var left, center, right
  // 分解を特定する
  reversed.forEach(function(value, i){
    var reg = new RegExp("(.*)" + value + "(.*)")
    if(!reg.test(head) || head === value){
      return
    }
    // var matched = reg.exec(head)
    // var leftMatch = matched[1]
    // var rightMatch = matched[2]
    left = reversed.slice(0, i - 1).map(function(val){
      return val.replace(value, "")
    })
    right = reversed.slice(i, reversed.length - 1)
  })
  if(left && left.length > 0 || right && right.length){ // center && center)
    // recursive
    detectPartialize(right, groups)
    detectPartialize(left, groups)
  }else{
    groups.push(reversed)
  }
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
