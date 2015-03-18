var extend = require("extend")
var slotLogic = require("./slot")
// var partial = require("./partial")
var compactDiff = require("compact-diff")
var kanachar = require("./kanachar")
var buildKana = function(slots){
  return slots.map(function(slot){
    return slot.kana
  }).join("")
}

// var toSplits = function(partials){
//   return partials.map(function(p){
//     return p.changed || p.value
//   })
// }

var convertSlot = function(value, slot){
  var _slot = extend({}, slot, {
    value : value
  })
  var next = slotLogic(_slot)
  return next
}

module.exports = function(state){
  var diffs = compactDiff(state.prev, state.value)
  var splits = state.splits || {}
  var cache = state.cache || {}
  var slots = state.slots || [{}]
  // console.log("==============")

  var activeSplits = diffs.reduce(function(result, diff){
    if(diff.value && cache[diff.value]){
      // slot確定
      result.push(diff.value)
    }
    console.log(diff)
    return result
  }, [])
  var activeSlots = slots.filter(function(slot){
    return activeSplits.every(function(split){
      if(slot.value === split){
        return false
      }
      return true
    })
  })
  // console.log(activeSplits, activeSlots)
  // var spls = Object.keys(splits).join("")
  // var diff2 = compactDiff(spls, state.value)
  // diff2.forEach(function(diff){
  //   if(splits[diff.value] && splits[diff.value].kana){
  //     return
  //   }
  //   console.log(diff)
  // })

  var nextSlots = activeSlots.map(function(slot){
    return convertSlot(state.value, slot)
  })
  // console.log(nextSlots)

  // console.log(processed)
  var kana = buildKana(nextSlots)
  if(!kanachar(state.value)){
    cache[state.value] = kana
  }
  return {
    kana : kana,
    slots : nextSlots,
    splits : activeSplits,
    prev : state.value,
    cache : cache
  }
}
