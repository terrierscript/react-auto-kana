var assert = require("power-assert")
var logic = require("../src/logic")

describe("logic", function(){
  it("convert", function(){
    var next = logic({
      value: "山田",
      prev : "やまだ"
    })
    assert.deepEqual("やまだ", next.kana)
  })
  it("add", function(){
    var next = logic({
      value: "山田た",
      kana : "やまだ",
      prev : "山田",
      dict : [
        ["山田" , "やまだ"]
      ]
    })
    assert.deepEqual("やまだた", next.kana)
  })
  it("山田たろう -> 山田太郎", function(){
    var next = logic({
      prev : "山田たろう",
      value: "山田太郎",
      kana : "やまだたろう",
      dict : [
        ["山田" , "やまだ"]
      ]
    })
    assert.deepEqual("やまだたろう", next.kana)
  })
  it("まりお -> 鞠男 -> 毬男", function(){
    var steps = ["まりお" ,"鞠男", "毬男"]
    steps.reduce(function(state, value){
      state.value = value
      var result = logic(state)
      assert.equal("まりお", result.kana)
      return result
    }, {})
  })
  it("not お -> を", function(){
    // var steps = ["まりお" ,"まりを","鞠男", "毬男"]
    // steps.reduce(function(state, value){
    //   state.value = value
    //   var result = logic(state)
    //   assert.equal("まりお", result.kana)
    //   return result
    // }, {})
  })
  it("remove", function(){
    var next = logic({
      value: "山",
      kana : "やまだ",
      prev : "山田",
      dict : [
        ["山田" , "やまだ"]
      ]
    })
    assert.deepEqual("やまだ", next.kana) // not change
  })
})