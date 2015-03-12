//var compactDiff = require("compact-diff")

var convert = function(arr){
  return arr.map(function(v){
    return {
      value : v
    }
  })
}

module.exports = function(splits, value){
  var rest = value
  var spl = convert(splits)
  var i, part, reg // TODO: let?
  // 前方
  for( i = 0; i < spl.length; i++){
    part = spl[i]
    reg = new RegExp("^" + part.value)
    if(!reg.test(rest)){
      break
    }
    spl[i].matched = true
    rest = rest.replace(reg, "")
  }
  //console.log(spl, value)
  for( i = 0; i < spl.length; i++){
    var j = splits.length - i - 1
    part = spl[j]
    reg = new RegExp(part.value + "$")
    if(!reg.test(rest)){
      break
    }
    spl[j].matched = true
    rest = rest.replace(reg, "")
  }
  //console.log(spl, value, rest)
  return spl.map(function(parts){
    if(parts.matched){
      return {
        value : parts.value
      }
    }
    parts.changed = rest
    return parts
  })
}
