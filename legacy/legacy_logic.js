var japanese = require("japanese")
var JsDiff = require("diff")
var operateDiff = require("./operate_diff")
var kanautil = require("./kanautil")

var getActive = function(value){
  var lastKana = kanautil.split(value).pop() || ""
  var nextActive = kanautil.isHiragana(lastKana) ? lastKana : ""

  return nextActive || ""
}

var getSanitizedActive = function(value){
  var split = kanautil.split(value) || []
  return split.reverse()[1] || ""
}

var debug = function(args){
  //console.log(arguments[0])
}

var build = function(prevValue, value, buffer, kana){
  var nextState = {}
  var baseBuffer = buffer
  // diffの追加/削除状態を簡易化
  var diffState = operateDiff(JsDiff.diffChars(prevValue, value))
  var isRemove = diffState.removed && !diffState.added

  var active = getActive(value)
  var prevActive = getActive(prevValue)

  var activeReg = new RegExp(active + "$")
  var prevActiveReg = new RegExp(prevActive + "$")

  debug([kana, buffer, active, prevActive, value, prevValue])
  var isRemoveConfused = (function(){ //判定不可能な状態か検出する
    if(!isRemove){ return false }
    // example :(山田はな子 -> 山田はな)
    if(active.length > prevActive.length){
      return true
    }
    // already confused
    if(!activeReg.test(kana) && !prevActiveReg.test(kana)){
      return true
    }
    return false
  })()

  if(isRemoveConfused){ // isolated
    nextState.kana = kana
    nextState.buffer = baseBuffer
    return nextState
  }

  if(prevActive === ""){
    // fix buffer like : やｍ -> や
    var sanitize = getSanitizedActive(prevValue)
    var sanitizeReg = new RegExp(sanitize + "$")
    buffer = buffer.replace(sanitizeReg, "")

    // buffer: まりお value: [まり夫 => まりお]
    buffer = buffer.replace(activeReg, "")
  }
  // bufferを正規化
  if(isRemove){
    var removeReg = new RegExp(prevActive + "$")
    buffer = buffer.replace(removeReg, "")
  }
  nextState.buffer = buffer

  // 状態を保存
  if(active.length < prevActive.length && !isRemove){
    nextState.kana = nextState.buffer = kana
    return nextState
  }
  nextState.kana = buffer + active
  return nextState
}

var main = function(state){
  var prevValue = japanese.hiraganize(state.prevValue || "")
  var value = japanese.hiraganize(state.value || "")
  if(prevValue === value){
    return state
  }
  return build(prevValue, value, state.buffer || "", state.kana)
}

module.exports = function(state){
  var next = main(state)
  next.prevValue = state.value
  return next
}
