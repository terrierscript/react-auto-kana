var partial = require("../src/partial")
var assert = require("power-assert")
var heads = function(result){
  return result.map(function(p){
    return p[0]
  })
}
describe("partial", function(){
  it("left", function(){
    var steps = ["赤", "赤お", "赤おｎ","赤おに", "赤鬼"].reverse()
    assert.deepEqual(heads(partial(steps)), ["赤", "鬼"])
  })
  it("", function(){
    var steps = ["赤", "お赤", "おｎ赤","おに赤", "鬼赤"].reverse()
    assert.deepEqual(heads(partial(steps)), [ "鬼", "赤"])

  })
  it("", function(){
    var steps = ["","あ","あｋ","あか","赤","赤あ","赤あお","赤青","赤ｋ青","赤き青","赤きい青","赤きいｒ青","赤きいろ青","赤黄色青"].reverse()
    assert.deepEqual(heads(partial(steps)), ["赤", "黄色", "青"])
  })
})