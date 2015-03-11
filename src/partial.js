var compactDiff = require("compact-diff")

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
  // 前方
  for(let i = 0; i < spl.length; i++){
    let part = spl[i]
    let v = part.value
    let reg = new RegExp("^" + v)
    if(!reg.test(rest)){
      spl[i].diff = true
      break
    }
    rest = rest.replace(reg, "")
  }

  for(let i = 0; i < splits.length; i++){
    let part = spl[splits.length - i - 1]
    let v = part.v
    let reg = new RegExp(v + "$")
    if(!reg.test(rest)){
      spl[i].diff = true
      break
    }
    rest = rest.replace(reg, "")
  }
  spl.forEach(function(part){

  })
  return spl
}
