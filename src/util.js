
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
}

var getConvertPair = function(prev, current){
  var diffPack = diff(prev, current)
  return diffPack.filter(function(d){
    return (d.added || d.removed)
  })
}

var build = function(state){
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  if(prev === current){ // no change
    return {}
  }
  // LEAST prev = partials.join
  var prevMode = state.mode
  var mode = getMode(prev, current)
  var stacks = state.stacks || []
  var active = stacks[stacks.length - 1]
  if(prev === active && mode === "converted"){
    stacks.pop()
    stacks.push(current)
  }else if(prevMode === "converted"
    && mode === "converted"
    && kanachar(prev)){
    stacks.push(current)
  }else{
  //  console.log("LLLLLLLLL")
  }

  // history.push([
  //   prev, current, prevMode, mode, kanachar(prev)
  // ].join(" , "))

  return buildPartial(state, current, prev)
}

var buildPartial = function(partial, current, prev){
  var next = buildPartialInner(partial, current, prev)
  var defaults = {
    stacks : [],
    pairs :  [],
    kana  :  "",
    cache : {},
    mode  :  {},
  }
  return extend(defaults, next, {
    prev : current
  })
}
