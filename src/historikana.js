var detectPartialize = function(reversed, groups){
  var head = reversed[0]
  var left, right
  // 分解を特定する
  reversed.forEach(function(value, i){
    if(!head.match(value) || head === value){
      return
    }
    left = reversed.slice(0, i - 1).map(function(val){
      return val.replace(value, "")
    })
    right = reversed.slice(i, reversed.length - 1)
  })
  if(left){
    detectPartialize(right, groups)
    detectPartialize(left, groups)
  }else{
    // 違う。登録していいのこの時だけでは。
    groups.push(reversed)
  }
  return groups
}
module.exports = function(histories){
  var reversed = histories.concat().reverse()
  var group = detectPartialize(reversed, [])
  console.log(group)
  // 仮名の特定
  // var reversed = histories.concat().reverse()
  // var kanas = reversed.reduce(function(result, current, i){
  //   var next = reversed[i - 1]
  //   var prev = reversed[i + 1]
  //   var diff = compactDiff(prev, current)
  //   console.log(diff)
  //   console.log(
  //     hasKana(current), isKana(current),  prev, "【" + current + "】", next
  //   )
  //   return result
  // }, [])
}
