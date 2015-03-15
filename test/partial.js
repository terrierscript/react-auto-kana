var partial = require("../src/partial")
var assert = require("power-assert")
describe("partial", function(){
  describe("convert", function(){
    it("simple", function(){
      var result = partial.convert(["山田", "たろう"], "山田太郎")
      var expect = [
        { value : "山田" },
        { value : "たろう", changed : "太郎"}
      ]
      assert.deepEqual(result, expect)
    })
    it("remove", function(){
      var result = partial.convert(["山田", "たろう"], "山たろう")
      var expect = [
        { value : "山田" , changed : "山" },
        { value : "たろう"}
      ]
      assert.deepEqual(result, expect)
    })
    it.skip("double change", function(){
      var result = partial.convert(["山田", "太郎"], "山本次郎")
      var expect = [
        { value : "山田" , changed : "山本" },
        { value : "太郎", changed : "次郎"}
      ]
    })
    it.skip("double change", function(){
      var result = partial.convert(["山田", "たろう"], "山ろう")
      var expect = [
        { value : "山田" , changed : "山" },
        { value : "たろう", changed : "ろう"}
      ]
    })
  })
  describe("added", function(){
    it("first add", function(){
      var result = partial.add([], "山田")
      var expect = [
        { value : "", changed : "山田" },
      ]
      assert.deepEqual(result, expect)
    })
    it("add", function(){
      var result = partial.add(["や"], "やｍ")
      var expect = [
        { value : "や"},
        { value : "", changed : "ｍ" },
      ]
      assert.deepEqual(result, expect)
    })
    it("after add", function(){
      var result = partial.add(["山田", "太郎"], "山田太郎ドカベン")
      var expect = [
        { value : "山田" },
        { value : "太郎" },
        { value : "", changed : "ドカベン" },
      ]
      assert.deepEqual(result, expect)
    })
    it("middle add", function(){
      var result = partial.add(["山田", "太郎"], "山田D太郎")
      var expect = [
        { value : "山田" },
        { value : "", changed : "D" },
        { value : "太郎"}
      ]
      assert.deepEqual(result, expect)
    })
    it("before add", function(){
      var result = partial.add(["山田", "太郎"], "D山田太郎")
      var expect = [
        { value : "", changed : "D" },
        { value : "山田" },
        { value : "太郎"}
      ]
      assert.deepEqual(result, expect)
    })
    it("add", function(){
      var result = partial.add(["山","田", "太","郎"], "山ほ田太郎")
      var expect = [
        { value : "山" },
        { value : "", changed : "ほ" },
        { value : "田" },
        { value : "太" },
        { value : "郎" }
      ]
      assert.deepEqual(result, expect)
    })
  })
  describe("auto detect", function(){
    it("as convert", function(){
      var result = partial(["山田", "ｔ"], "山田た") // convert
      var expect = [
        { value : "山田" },
        { value : "ｔ", changed : "た" }
      ]
      assert.deepEqual(result, expect)
    })
    it("as add", function(){
      var result = partial(["山田"], "山田ｔ") // add
      var expect = [
        { value : "山田" },
        { value : "", changed : "ｔ" }
      ]
      assert.deepEqual(result, expect)
    })
    it("as convert last", function(){
      var result = partial(["山田", "た"], "山田たう")
      var expect = [
        { value : "山田" },
        { value : "た", changed : "たう" }
      ]
      assert.deepEqual(result, expect)
    })
    it("as convert first", function(){
      var result = partial(["山田", "太郎"], "お山田太郎")
      var expect = [
        { value : "山田", changed : "お山田"},
        { value : "太郎" }
      ]
      assert.deepEqual(result, expect)
    })
  })
})
