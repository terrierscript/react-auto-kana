var partial = require("../src/partial")
describe("partial", function(){
  it("simple", function(){
    var result = partial(["山田", "たろう"], "山田太郎")
    var expect = [
      { value : "山田" },
      { value : "たろう", changed : "太郎"}
    ]
    console.log(result)
  })
  it("simple", function(){
    var result = partial(["山田", "たろう"], "山たろう")
    var expect = [
      { value : "山田" , changed : "山" },
      { value : "たろう"}
    ]
  })
  it("double change", function(){
    var result = partial(["山田", "太郎"], "山本次郎")
    var expect = [
      { value : "山田" , changed : "山本" },
      { value : "太郎", changed : "次郎"}
    ]
  })
  it("double change", function(){
    var result = partial(["山田", "たろう"], "山ろう")
    var expect = [
      { value : "山田" , changed : "山" },
      { value : "たろう", changed : "ろう"}
    ]
  })
  it("insert", function(){
    var result = partial(["山田", "太郎"], "山田D太郎")
    var expect = [
      { value : "山田"  },
      { value : "", changed: "D"},
      { value : "たろう"}
    ]
  })
})