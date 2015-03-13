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
      return slot
    }
    slot.matched = true
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
      return slot
    }
    slot.matched = true
    rest = rest.replace(reg, "")
    return slot
  }).reverse()

  return {
    slots : filterd,
    rest : rest
  }
}
var filter = function(slots, value){
  var preFilterd = preFilter(slots, value)
  var postFilterd = postFilter(preFilterd.slots, preFilterd.rest)
  return postFilterd
}

module.exports.add = function(splits, value){
}

module.exports.convert = function(splits, value){
  var slots = convert(splits)
  // 前方
  var filterd = filter(slots, value)
  return filterd.slots.map(function(parts){
    if(parts.matched){
      return {
        value : parts.value
      }
    }
    parts.changed = filterd.rest
    return parts
  })
}
