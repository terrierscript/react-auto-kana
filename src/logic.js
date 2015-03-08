var japanese = require("japanese")
//var kanadic = require("./kanadic")
var rekana = require("./rekana")
var isHiragana = require("./is_hiragana")
var diff = require("./diff")
// var onlyKana = function(value){
//   var m = value.match(japanese.hiraganaRegex)
//   return m ? m.join("") : ""
// }

// var buildKana = function(dic, value){
//   var kana = value
//   // convert with dic
//   Object.keys(dic).forEach(function(key){
//     var val = dic[key]
//     kana = kana.replace(key, val)
//   })
//   return onlyKana(kana)
// }
// 
// var build = function(state){
//   var prev = japanese.hiraganize(state.prev || "")
//   var current = japanese.hiraganize(state.value || "")
//   console.log(diff(prev, current))
//   //return
//   var dic = state.dic || {}
//   var kana = state.kana || ""
//   // hiragana and katakana
//   if(prev === current){
//     return state
//   }
//   dic = kanadic(prev, current, dic)
// 
//   var newKana = rekana(current, dic)
//   if(isHiragana(newKana)){
//     kana = newKana
//   }
// 
//   var nextState = {
//     kana : kana,
//     dic : dic,
//   }
//   return nextState
// }
//
// var rekana = function(value, dic){
//   dic.concat().forEach(function(d){
//     if(isHiragana(d[1])){
//       value = value.replace(d[0], d[1])
//     }
//   })
//   dic.concat().reverse().forEach(function(d){
//     value = value.replace(d[0], d[1])
//   })
//   return value
// }
var isConvert = function(d){
  return d.removed && d.added
}
var build2 = function(state){
  console.log("============")
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  if(prev === current){ // no change
    return state
  }
  var diffPack = diff(prev, current)
  console.log(JSON.stringify(diffPack))
  // analyse
  var stack = state.stack || []
  var bornes = state.bornes || []
  diffPack.forEach(function(d){
    if(!isConvert(d)){
      return
    }
    if(isHiragana(d.added)){
      return
    }
    stack.push([d.added, d.removed])
    var newKana = rekana(d.added, stack)
    //console.log(newKana, d.added, JSON.stringify(stack))
    bornes.push({
      kana : newKana,
      value : d.added
    })
  })
  //console.log(JSON.stringify(bornes))
  var converted = rekana(current, stack)
  // console.log("ZZZ", prev, current, converted)
  // // generate structure
  // // generate kana
  // var kana = []
  // diffPack.forEach(function(d){
  //   if(d.value){
  //     kana.push(rekana(d.value, stack))
  //   }
  //   if(d.added){
  //     kana.push(rekana(d.added, stack))
  //   }
  // })
  // console.log(prev, current, kana)
  // console.log(diffPack)
  // console.log(JSON.stringify(stack))
  var next = {
    stack : stack,
    kana : converted, //kana.join(""),
    bornes : bornes
  }
  return next
}
module.exports = function(state){
  //var next =
  //build(state)
  var next = build2(state)
  // store prev value
  next.prev = state.value
  // debug
  next.history = (function(history){
    history.push(state.value)
    return history
  })(state.history || [])
  // end debug
  return next
}
