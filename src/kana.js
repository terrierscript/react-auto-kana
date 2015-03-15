var extend = require("extend")
var slotLogic = require("./slot")
// var partial = require("./partial")
var compactDiff = require("compact-diff")

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

var polyfill = function(state){
  var slots = state.slots || []
  var slot = extend({}, slots[0], {
    value : state.value
  })
  var next = slotLogic(slot)
  return [next]
}

module.exports = function(state){
  var slots = polyfill(state)
  var cDiff = compactDiff(state.prev, state.value)
  var cache = state.cache || {}
  // console.log("============")
  // console.log(cDiff)
  var processed = cDiff.map(function(diff){
    // console.log(slots[0].cache)

    if(diff.value){
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

  return {
    kana : buildKana(slots),
    slots : slots,
    prev : state.value,
    cache : cache
  }
}
