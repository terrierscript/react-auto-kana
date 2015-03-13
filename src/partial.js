//var compactDiff = require("compact-diff")

var convert = function(arr){
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
  }).reverse()

  return {
    slots : filterd,
    rest : rest
  }
}
var filter = function(splits, value){
  var slots = convert(splits)
  var preFilterd = preFilter(slots, value)
  var postFilterd = postFilter(preFilterd.slots, preFilterd.rest)
  return postFilterd
}

module.exports.add = function(splits, value){
  var filterd = filter(splits, value)
  var slots = filterd.slots
  var init = []
  var restPartial = { value: "", changed : filterd.rest }
  if(slots[0].preUnmatched){
    init.push(restPartial)
  }
  var partials = slots.reduce(function(result, slot, i){
    var before = slots[i - 1] || {}
    if(before.preMatched && slot.postMatched){
      result.push(restPartial)
    }
    result.push({value : slot.value})
    return result
  }, init)
  if(slots[slots.length - 1].postUnmatched){
    partials.push(restPartial)
  }
  return partials
}

module.exports.convert = function(splits, value){
  var filterd = filter(splits, value)
  return filterd.slots.map(function(slot){
    var partial = { value : slot.value }
    if(slot.matched){
      return partial
    }
    partial.changed = filterd.rest
    return partial
  })
}
