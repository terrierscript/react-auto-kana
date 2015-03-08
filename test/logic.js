var assert = require("power-assert")
var logic = require("../src/logic")

var stepTest = function(steps, kana){
  var result = steps.reduce(function(state, value){
    state.value = value
    var result = logic(state)
    // console.log(result)
    return result
  }, {})
  assert.equal(kana, result.kana)

}
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
  it("ｙ -> や", function(){
    var steps = ["ｙ" , "や"]
    stepTest(steps, "や")
  })
  it("やｍ -> やま", function(){
    var steps = ["ｙ" , "や", "やｍ", "やま"]
    stepTest(steps, "やま")
  })
  it("まりお -> 鞠男 -> 毬男", function(){
    var steps = ["まりお" ,"鞠男", "毬男"]
    stepTest(steps, "まりお")
  })
  it("not お -> を XXX", function(){
    var steps = ["まりお","まりを","鞠男", "毬男"]
    stepTest(steps, "まりお")
  })
  it("not お -> を part2", function(){
    var steps = ["まりお","鞠男", "まりを", "毬男"]
    stepTest(steps, "まりお")
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
  it("Dokaben scenario", function(){
    var steps = ["ｙ", "や", "やｍ", "やま", "やまｄ", "やまだ", "山田", "山田", "山田ｔ", "山田た", "山田たｒ", "山田たろ", "山田たろう", "山田太郎", "山田太郎"]
    stepTest(steps, "やまだたろう")
  })
  it("Yamada Removed scenario", function(){
    var steps = ["ｙ", "や", "やｍ", "やま", "やまｄ", "やまだ", "山田", "山田", "山", "山ｄ", "山だ", "山田", "山田", "山田ｔ", "山田た", "山田た"]
    stepTest(steps, "やまだた")
  })
  it("SuperMario1 scenario", function(){
    var steps = ["ｓ", "す", "すｈ", "すは", "素破", "素破",
    "素破ｍ", "素破ま", "素破まｒ", "素破まり",
    "素破まりお", "素破真理雄", "素破万里緒",
    "素破毬男", "素破マリヲ", "素破鞠男"]
    stepTest(steps, "すはまりお")
  })
  it("SuperMario2 scenario", function(){
    var steps = [
    "まりお", "真理雄", "まりを", "万里緒",
    "毬男", "鞠男"]
    stepTest(steps, "まりお")
  })
})