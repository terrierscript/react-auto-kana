var assert = require("power-assert")
var logic = require("../src/logic")

describe("logic", function(){
  it("convert", function(){
    var next = logic({
      value: "山田",
      prev : "やまだ"
    })
    var expect = {
      kana : "やまだ",
      prev : "山田",
      stack : [["山田", "やまだ"]]
    }
    assert.deepEqual(expect.stack, next.stack)
    assert.deepEqual(expect, next)
  })
})