var compactDiff = require("compact-diff")
var toSlot = function(arr){
  return arr.map(function(v){
    return {
      value : v
    }
  })
}

var preFilter = function(slots, rest){
  var filterd = slots.map(function(slot){
    var reg = (new RegExp("^" + slot.value))
    if(!reg.test(rest)){
      slot.preUnmatched = true
      return slot
    }
    slot.matched = true
    slot.preMatched = true
    rest = rest.replace(reg, "")
    return slot
  })
  return {
    slots : filterd,
    rest : rest
  }
}

var postFilter = function(slots, rest){
  var filterd = slots.reverse().map(function(slot){
    var reg = new RegExp(slot.value + "$")
    if(!reg.test(rest)){
      slot.postUnmatched = true
      return slot
    }
    slot.matched = true
    slot.postMatched = true
    rest = rest.replace(reg, "")
    return slot
  })

  return {
    slots : filterd.reverse(),
    rest : rest
  }
}

var diffRestFilter = function(slots, rest, value){
  var filterd = slots.map(function(slot){
    var diff = compactDiff(slot.value, rest)
    console.log(diff, slot.value, rest)
    return slot
  })
  return {
    slots : filterd,
    rest : rest
  }
}
var filter = function(splits, value){
  var slots = toSlot(splits)
  var preFilterd = preFilter(slots, value)
  var postFilterd = postFilter(preFilterd.slots, preFilterd.rest)
  var diffRested = diffRestFilter(postFilterd.slots, postFilterd.rest, value)
  return diffRested
}

var _add = function(slots, rest){
  var init = []
  var restPartial = { value: "", changed : rest }

  // first
  var firstSlot = slots[0]
  if(!firstSlot || firstSlot.preUnmatched){
    init.push(restPartial)
  }

  // partials
  var partials = slots.reduce(function(result, current, i){
    var prev = slots[i - 1] || {}
    if(prev.preMatched && current.postMatched){
      result.push(restPartial)
    }
    result.push({value : current.value})
    return result
  }, init)

  // last
  var lastSlot = slots[slots.length - 1]
  if(lastSlot && lastSlot.postUnmatched){
    partials.push(restPartial)
  }
  return partials
}
var add = function(splits, value){
  var slots = filter(splits, value)
  return _add(slots.slots, slots.rest)
}

var _convert = function(slots, rest){
  return slots.map(function(slot){
    var partial = { value : slot.value }
    if(slot.matched){
      return partial
    }
    partial.changed = rest
    return partial
  })
}

var convert = function(splits, value){
  var filtered = filter(splits, value)
  return _convert(filtered.slots, filtered.rest)
}

var autoDetect = function(splits, value){
  var filtered = filter(splits, value)
  var allMatched = filtered.slots.every(function(slot){
    return slot.matched
  })
  if(!allMatched){
    return _convert(filtered.slots, filtered.rest)
  }
  return _add(filtered.slots, filtered.rest)

}
module.exports = autoDetect

module.exports.add = add
module.exports.convert = convert
