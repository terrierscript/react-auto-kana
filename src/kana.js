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

var polyfill = function(slot, value){
  var _slot = extend({}, slot, {
    value : value
  })
  var next = slotLogic(_slot)
  return [next]
}

module.exports = function(state){
  var slots = polyfill((state.slots || [state.value])[0] || {}, state.value)
  var diffs = compactDiff(state.prev, state.value)
  
  // complete convert
  // if(diffs.length === 1 && diffs[0].added && diffs[0].removed){
  //   console.log("CCC", diffs)
  // }
  var cache = state.cache || {}
  console.log(diffs, slots[0].kana)
  var processed = diffs.map(function(diff){
    // console.log(slots[0].cache)

    if(diff.value && cache[diff.value]){
      console.log("Z", cache[diff.value], diff.value)
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
  // console.log(processed)
  var kana = buildKana(slots)
  if(!kanachar(state.value)){
    cache[state.value] = kana
  }
  return {
    kana : kana,
    slots : slots,
    prev : state.value,
    cache : cache
  }
}
