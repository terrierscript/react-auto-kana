var extend = require("extend")
var japanese = require("japanese")
var JsDiff = require("diff")

var isHiragana = function(str){
  var m = str.match(japanese.hiraganaRegex)
  return (m && m.length === str.length) ? true : false
}

var updateMap = function(map, key, value){
  if(!value){
    return map
  }
  if(isHiragana(key)){ // すでにひらがな
    return map
  }
  if(!isHiragana(value)){
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
var getDiffSet = function(prevStr, currentStr){
  var diffSet = []
  var reversedDiff = JsDiff.diffChars(prevStr, currentStr)
  reversedDiff.reduce(function(addedDiff, removedDiff){
    if(!addedDiff.added || !removedDiff.removed){
      return removedDiff
    }
    diffSet.push({
      added : addedDiff,
      removed : removedDiff
    })
    return removedDiff
  })
  return diffSet
}

module.exports = function(prev, current, baseMap){
  baseMap = baseMap || {}
  prev = japanese.hiraganize(prev)
  current = japanese.hiraganize(current)
  // 連続で変換されたときのmapから、先んじて戻す。
  prev = baseMap[prev] || prev

  if(prev === current){
    return baseMap
  }

  var map = extend(true, {}, baseMap)
  var diffSet = getDiffSet(prev, current)
  diffSet.forEach(function(set){
    map = updateMap(map, set.added.value, set.removed.value)
  })
  return map
}
