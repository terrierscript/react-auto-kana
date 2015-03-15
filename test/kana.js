var assert = require("power-assert")
var slot = require("../src/slot")
var kanaLogic = require("../src/kana")
var todo = process.env.CI ? it.skip : it
var stepTest = function(steps, kana){
  var result = steps.reduce(function(state, value){
    state.value = value
    var result = kanaLogic(state)
    // console.log(result)
    return result
  }, {})
  assert.equal(kana, result.kana)

}
describe("logics", function(){
  describe("slot logic", function(){
    // it("convert", function(){
    //   var next = slot({
    //     value: "山田",
    //     prev : "やまだ"
    //   })
    //   assert.deepEqual("やまだ", next.kana)
    // })
    // it("add", function(){
    //   var next = slot({
    //     value: "山田た",
    //     kana : "やまだ",
    //     prev : "山田",
    //     patches : [
    //       ["山田" , "やまだ"]
    //     ]
    //   })
    //   assert.deepEqual("やまだた", next.kana)
    // })
    // it("山田たろう -> 山田太郎", function(){
    //   var next = slot({
    //     prev : "山田たろう",
    //     value: "山田太郎",
    //     kana : "やまだたろう",
    //     patches : [
    //       ["山田" , "やまだ"]
    //     ]
    //   })
    //   assert.deepEqual("やまだたろう", next.kana)
    // })
    // it("remove", function(){
    //   var next = slot({
    //     value: "山",
    //     kana : "やまだ",
    //     prev : "山田",
    //     pairs : [
    //       ["山田" , "やまだ"]
    //     ]
    //   })
    //   assert.deepEqual("やまだ", next.kana) // not change
    // })
  })
  describe("E2E", function(){
    it("XXX ｙ -> や", function(){
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
    it("Dokaben scenario", function(){
      var steps = ["ｙ", "や", "やｍ", "やま", "やまｄ", "やまだ", "山田", "山田", "山田ｔ", "山田た", "山田たｒ", "山田たろ", "山田たろう", "山田太郎", "山田太郎"]
      stepTest(steps, "やまだたろう")
    })
    it("Yamada Removed scenario", function(){
      var steps = ["ｙ", "や", "やｍ", "やま", "やまｄ", "やまだ", "山田", "山田", "山", "山ｄ", "山だ", "山田", "山田", "山田ｔ", "山田た", "山田た"]
      stepTest(steps, "やまだた")
    })
    todo("SuperMario1 scenario", function(){
      var steps = ["ｓ", "す", "すｈ", "すは", "酢派", "酢破", "素破" ,
      "素破ｍ", "素破ま", "素破まｒ", "素破まり",
      "素破まりお", "素破真理雄"
      , "素破万里緒",
      "素破毬男", "素破マリヲ", "素破鞠男"
      ]
      stepTest(steps, "すはまりお")
    })
    it("SuperMario2 scenario", function(){
      var steps = [
      "まりお", "真理雄", "まりを", "万里緒",
      "毬男", "鞠男"]
      stepTest(steps, "まりお")
    })
    it("SuperMario3 scenario", function(){
      var steps = ["ｍ", "ま", "まｒ", "まり", "まりお", "真理夫", "万里夫", "真理雄", "マリヲ"]//, "万里緒"]
      stepTest(steps, "まりお")
    })
    it("Same Kanji scenario", function(){
      var steps = ["う", "うｂ", "うぶ", "生", "生", "生ｎ", "生な", "生なｍ", "生なま", "生生", "生生", "生生ｓ", "生生せ", "生生せい", "生生生", "生生生"]
      stepTest(steps, "うぶなませい")
    })
    it.skip("first insertSame Kanji scenario (issue)", function(){
      var steps = ["","ｎ","な","なｍ","なま","生","生う","生うｂ","生うぶ","生生","ｓ生生","せ生生","せい生生","生生生"]
      stepTest(steps, "せいなまうぶ")
    })
    it("Mobile Convert", function(){
      // In mobile app. input by char
      var steps = ["や", "やま", "やまた", "やまだ", "山田"]
      stepTest(steps, "やまだ")
    })
  })
})