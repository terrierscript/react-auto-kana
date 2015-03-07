// var extend = require("extend")
var japanese = require("japanese")
var JsDiff = require("diff")
var japarser = require("japarser")
var isHiragana = require("./is_hiragana")

var updateDic = function(dic, key, value){
  key = japarser(key)[0].value
  if(!value){
    return dic
  }
  if(isHiragana(key)){ // すでにひらがなならskip
    return dic
  }
  if(!isHiragana(value)){ // dicから現在の変換候補を取得
    value = dic[value] || value
  }
  var currentValue = dic[key]
  if(currentValue && currentValue.length <= value.length){
    value = currentValue
  }
  dic[key] = value
  return dic
}

// 隣接したdiffを、addとremoveのペアにする
var getConvertPair = function(prevStr, currentStr){
  var diffPair = []
  var reversedDiff = JsDiff.diffChars(prevStr, currentStr)
  reversedDiff.reduce(function(addedDiff, removedDiff){
    if(!addedDiff.added || !removedDiff.removed){
      return removedDiff
    }
    diffPair.push({
      added : addedDiff,
      removed : removedDiff
    })
    return removedDiff
  })
  return diffPair
}

module.exports = function(prev, current){
  //baseDic = baseDic || []
  current = japanese.hiraganize(current)
  prev = japanese.hiraganize(prev)

  if(prev === current){
    return []
  }
  //var dic = baseDic.concat() // clone
  var diffPair = getConvertPair(prev, current)
  return diffPair.forEach(function(set){
    return [set.added.value, set.removed.value]
    //dic.push(pair)
    //dic = updateDic(dic, set.added.value, set.removed.value)
  })
  //return dic
}
