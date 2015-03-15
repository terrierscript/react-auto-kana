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

var polyfill = function(value, slot){
  var _slot = extend({}, slot, {
    value : value
  })
  var next = slotLogic(_slot)
  return next
}

module.exports = function(state){
  var diffs = compactDiff(state.prev, state.value)
  var splits = state.splits || []
  var cache = state.cache || {}
  var processed = diffs.map(function(diff){
    // console.log(slots[0].cache)

    if(diff.value && cache[diff.value]){
      // console.log("Z", cache[diff.value], diff.value)
      splits.push({
        
      })
      // console.log(state.prev, diff)
      // return slotLogic({
      //   value : diff.value,
      //   prev : state.prev,
      //   cache : state.cache,
      //   patches : state.patches,
      // })
    }else{
      return slotLogic({
        value : diff.added,
        prev : diff.removed,
        cache : state.cache,
        patches : state.patches,
      })
    }
  })

  var slots = (state.slots || [{}])
  var nextSlots = slots.map(function(slot){
    // console.log(slots)
    return polyfill(state.value, slot)
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
    prev : state.value,
    cache : cache
  }
}
