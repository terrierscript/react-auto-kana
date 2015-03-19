var partial = require("../src/partial")

describe("partial", function(){
  it("", function(){
    partial(["赤", "赤お", "赤おｎ","赤おに", "赤鬼"].reverse())
  })
  it("", function(){
    var steps = ["","あ","あｋ","あか","赤","赤あ","赤あお","赤青","赤ｋ青","赤き青","赤きい青","赤きいｒ青","赤きいろ青","赤黄色青"].reverse()

    console.log(partial(steps))
  })
})