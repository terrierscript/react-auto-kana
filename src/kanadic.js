var extend = require("extend")
var japanese = require("japanese")
var JsDiff = require("diff")
var japarser = require("japarser")

var isHiragana = function(str){
  var m = str.match(japanese.hiraganaRegex)
  return (m && m.length === str.length) ? true : false
}


var updateMap = function(map, key, value){
  key = japarser(key)[0].value
  if(!value){
    return map
  }
  if(isHiragana(key)){ // すでにひらがなならskip
    return map
  }
  if(!isHiragana(value)){ // mapから現在の変換候補を取得
    value = map[value] || value
  }
  var currentValue = map[key]
  if(currentValue && currentValue.length < value.length){
    value = currentValue
  }
  map[key] = value
  return map
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

module.exports = function(prev, current, baseMap){
  baseMap = baseMap || {}
  current = japanese.hiraganize(current)
  prev = japanese.hiraganize(prev)
  //prev = baseMap[prev] || prev

  if(prev === current){
    return baseMap
  }
  var map = extend(true, {}, baseMap) // clone
  var diffPair = getConvertPair(prev, current)
  diffPair.forEach(function(set){
    map = updateMap(map, set.added.value, set.removed.value)
  })
  return map
}
