//var compactDiff = require("compact-diff")

var convert = function(arr){
  return arr.map(function(v){
    return {
      value : v
    }
  })
}

var preFilter = function(spl, rest){
  for(var i = 0; i < spl.length; i++){
    var part = spl[i]
    var reg = new RegExp("^" + part.value)
    if(!reg.test(rest)){
      break
    }
    spl[i].matched = true
    rest = rest.replace(reg, "")
  }
  return {
    slots : spl,
    rest : rest
  }
}

var postFilter = function(spl, rest){
  for(var i = 0; i < spl.length; i++){
    var last = spl.length - i - 1
    var part = spl[last]
    var reg = new RegExp(part.value + "$")
    if(!reg.test(rest)){
      break
    }
    spl[last].matched = true
    rest = rest.replace(reg, "")
  }
  return {
    slots : spl,
    rest : rest
  }
}

module.exports.add = function(splits, value){
}

module.exports.convert = function(splits, value){
  var slots = convert(splits)
  // 前方
  var preFilterd = preFilter(slots, value)
  var postFilterd = postFilter(preFilterd.slots, preFilterd.rest)
  //console.log(spl, value)
  //console.log(spl, value, rest)
  var rest = postFilterd.rest
  return postFilterd.slots.map(function(parts){
    if(parts.matched){
      return {
        value : parts.value
      }
    }
    parts.changed = rest
    return parts
  })
}
