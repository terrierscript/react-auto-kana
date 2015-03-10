var compactDiff = require("compact-diff")
module.exports = function(splits, value){
  var rest = value
  var diffSplit = []
  var post = []
  var pre = []
  var v, i, reg
  // 前方
  for(i = 0; i < splits.length; i++){
    v = splits[i]
    reg = new RegExp("^" + v)
    if(!reg.match(rest)){
      diffSplit.unshift(rest)
      break;
    }
    rest = rest.replace(reg, "")
    post.push({
      value : v
    })
  }

  for(i = 0; i < splits.length; i++){
    v = splits[splits.length - i - 1]
    reg = new RegExp(v + "$")
    if(!reg.match(rest)){
      diffSplit.push(rest)
      return
    }
    rest = rest.replace(reg, "")
    pre.unshift({
      value : v
    })
  }
  
}