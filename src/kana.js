var extend = require("extend")
var diff = require("compact-diff")
var slotLogic = require("./slot")

var buildKana = function(slots){
  return slots.map(function(slot){
    return slot.kana
  }).join("")
}

var getMode = function(prev, current){
  var diffPack = diff(prev, current)
  for(var i = 0; i < diffPack.length; i++){
    var d = diffPack[i]
    if(d.added && d.removed){
      return "converted"
    }
    if(d.added){
      return "added"
    }
    if(d.removed){
      return "removed"
    }
  }
  return "none"
}

var getConvertPair = function(prev, current){
  var diffPack = diff(prev, current)
  return diffPack.filter(function(d){
    return (d.added || d.removed)
  })
}

module.exports = function(state){
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
    prev : state.value,
  }
}
