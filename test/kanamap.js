var kanamap = require("../src/kanamap")
var assert = require("power-assert")
describe("kanamap", function(){
  it("山田", function(){
    assert.deepEqual(kanamap("やまだ", "山田"),{
      "山田" : "やまだ"
    })
  })
  it("山田太郎", function(){
    assert.deepEqual(kanamap("山田たろう", "山田太郎"),{
      "太郎" : "たろう"
    })
  })
  it("山田た", function(){
    assert.deepEqual(kanamap("山田ｔ", "山田た", {"山田":"やまだ"}),{
      "山田" : "やまだ"
    })
  })
  it("山田太郎 with normal map", function(){
    var map = {"山田":"やまだ","山田ｔ":"やまだ","山田た":"やまだ","山田たｒ":"やまだ","山田たろ":"やまだ","山田たろう":"やまだ"}
    assert.deepEqual(kanamap("山田たろう", "山田太郎", map),{
      "太郎" : "たろう"
    })
  })
  it("山田ｔ", function(){
    assert.deepEqual(kanamap("山田", "山田ｔ"),{})
  })
  it("mapが拡張される", function(){
    assert.deepEqual(kanamap("鞠男", "毬男", {　"鞠男" : "まりお"}), {
      "鞠男" : "まりお",
      "毬男" : "まりお"
    })
  })
})
