var japanese = require("japanese")
var rekana = require("./rekana")
var kanachar = require("./kanachar")
var compactDiff = require("compact-diff")
var extend = require("extend")
var stemora = require("stemora")

// を === お
var isSameKana = function(str1, str2){
  if(!kanachar(str1)){
    return false
  }
  if(!kanachar(str2)){
    return false
  }
  return (stemora.normalize(str1) === stemora.normalize(str2))
}
var emulatePatch = function(current, newPatch, patches){
  var emulatePatches = [newPatch].concat(patches)
  return rekana(current, emulatePatches)
}

var isEnablePatch = function(added, removed){
  // if(kanachar(removed)){
  if(!kanachar(added)){
    return true
  }
  // for mobile : ex) やまた -> やまだ
  // ["やまた" , "やまだ"] is invalid
  // ["まりお" , "まりを"] is valid
  if(isSameKana(added, removed)){
    return true
  }
  return false
  // }
  // return true
}

var generatePatches = function(prev, current, patches){
  var diffPack = compactDiff(prev, current)
  return diffPack.reduce(function(newPatches, d){
    if(!d.removed || !d.added){ // skip if falsy value
      return newPatches
    }

    var patch = [d.added, d.removed]

    // removed is kana
    if(kanachar(d.removed) && !isEnablePatch(d.added, d.removed)){
      return newPatches
    }

    // remove is not kana (revert emulation)
    if(!kanachar(d.removed) && !isEnablePatch(d.added, emulatePatch(current, patch, newPatches))){
      return newPatches
    }

    newPatches.unshift(patch)
    return newPatches
  }, patches || [])
}


var build = function(state){
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  if(prev === current){ // no change
    return {}
  }
  // 完全一致の文字列が過去に存在した場合は、cacheを利用
  // 下記挙動の場合の対処も兼ねる
  // ex: 山田 -> 山 -> 山田
  var cache = state.cache || {}
  if(cache[current]){
    return { kana : cache[current] }
  }
  // console.log(state.patches, state.cache)
  // default
  var patches = generatePatches(prev, current, state.patches)
  //console.log(state.prev, state.value, patches)
  var converted = rekana(current, patches)
  if(kanachar(converted)){
    if(!kanachar(current)){
      cache[current] = converted
    }
  }else{
    converted = state.kana
  }
  return {
    patches : patches,
    kana : converted,
    cache : cache,
  }
}



module.exports = function(state){
  var next = build(state)
  var defaults = {
    patches :  [],
    kana  :  "",
    cache : {},
  }
  return extend(defaults, state, next, {
    prev : state.value
  })
}
