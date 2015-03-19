var partial = require("../src/partial")
var assert = require("power-assert")
describe("partial", function(){
  it("", function(){
    partial(["赤", "赤お", "赤おｎ","赤おに", "赤鬼"].reverse())
  })
  it("", function(){
    partial(["赤", "お赤", "おｎ赤","おに赤", "鬼赤"].reverse())
  })
  it("", function(){
    var steps = ["","あ","あｋ","あか","赤","赤あ","赤あお","赤青","赤ｋ青","赤き青","赤きい青","赤きいｒ青","赤きいろ青","赤黄色青"].reverse()
    var result = partial(steps)
    console.log(result)
    // assert.equal(result.map(function(p){return p[0]}).join(""), steps[0])
    // console.log(partial(steps))
  })
})