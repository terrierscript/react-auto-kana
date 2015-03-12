var extend = require("extend")
var slotLogic = require("./slot")
var buildKana = function(slots){
  return slots.map(function(slot){
    return slot.kana
  }).join("")
}

module.exports = function(state){
  var slots = state.slots || []
  var slot = extend({}, slots[0], {
    value : state.value
  })

  var next = slotLogic(slot)
  var nextSlot = [next]
  return {
    kana : buildKana(nextSlot),
    slots : nextSlot,
    prev : state.value,
  }
}
