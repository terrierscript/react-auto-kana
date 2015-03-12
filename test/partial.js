var partial = require("../src/partial")
var assert = require("power-assert")
describe("partial", function(){
  it("simple", function(){
    var result = partial(["山田", "たろう"], "山田太郎")
    var expect = [
      { value : "山田" },
      { value : "たろう", changed : "太郎"}
    ]
    assert.deepEqual(result, expect)
  })
  it("simple", function(){
    var result = partial(["山田", "たろう"], "山たろう")
    var expect = [
      { value : "山田" , changed : "山" },
      { value : "たろう"}
    ]
    assert.deepEqual(result, expect)
  })
  it.skip("double change", function(){
    var result = partial(["山田", "太郎"], "山本次郎")
    var expect = [
      { value : "山田" , changed : "山本" },
      { value : "太郎", changed : "次郎"}
    ]
  })
  it.skip("double change", function(){
    var result = partial(["山田", "たろう"], "山ろう")
    var expect = [
      { value : "山田" , changed : "山" },
      { value : "たろう", changed : "ろう"}
    ]
  })
})