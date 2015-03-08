var hiragana = require("../lib/hiragana")
var assert = require("power-assert")

describe("hiragana", function(){
  describe("is_hiragana", function(){
    it("noraml", function(){
      assert.equal(true, hiragana.isHiragana("あいう"))
    })
    it("kanji", function(){
      assert.equal(false, hiragana.isHiragana("山田"))
    })
    it("kanji + hiragana", function(){
      assert.equal(false, hiragana.isHiragana("山田たろう"))
    })
    it("ー", function(){
      assert.equal(true, hiragana.isHiragana("すーぱー"))
    })
    it("with space", function(){
      assert.equal(true, hiragana.isHiragana("やまだ　たろう"))
    })
    it("with harf space", function(){
      assert.equal(true, hiragana.isHiragana("やまだ たろう"))
    })
  })
})