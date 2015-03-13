var extend = require("extend")
var slotLogic = require("./slot")
var partial = require("./partial")
var diffmode = require("./diffmode")
var buildKana = function(slots){
  return slots.map(function(slot){
    return slot.kana
  }).join("")
}

var toSplits = function(partials){
  return partials.map(function(p){
    return p.changed || p.value
  })
}
module.exports = function(state){
  var partialFunc = "convert"
  var splits = state.splits || []
  if(diffmode.isAddMode(state.prev, state.value, state.prevMode)){
    partialFunc = "add"
  }
  var partials = partial[partialFunc](splits, state.value)
  console.log(partials, partialFunc, splits, state.prev, state.value)
  var slots = state.slots || []
  // polyfill slots
  var slot = extend({}, slots[0], {
    value : state.value
  })
  var next = slotLogic(slot)
  var nextSlot = [next]
  return {
    kana : buildKana(nextSlot),
    slots : nextSlot,
    splits : toSplits(partials),
    prev : state.value,
    prevMode : diffmode(state.prev, state.value)
  }
}
