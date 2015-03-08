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
      dict : [["山田", "やまだ"]]
    }
    assert.deepEqual(expect.dict, next.dict)
    assert.deepEqual(expect, next)
  })
})