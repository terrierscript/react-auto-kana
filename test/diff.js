var assert = require("power-assert")
var diff = require("../src/diff")
describe("diff", function(){
  it("first", function(){
    var result = diff("", "山田")
    var expect = [
      { added: '山田' }
    ]
    assert.deepEqual(result, expect)
  })
  it("convert", function(){
    var result = diff("山田たろう", "山田太郎")
    var expect = [
      { value: '山田' }, { added: '太郎', removed: 'たろう' }
    ]
    assert.deepEqual(result, expect)
  })
  it("delete", function(){
    var result = diff("山田太郎", "山田")
    var expect = [
      { value: '山田'},
      { removed: '太郎'}
    ]
    assert.deepEqual(result, expect)
  })
  it("it", function(){
    var result = diff("生生", "生せい")
    var expect = [
      { value: '生' }, { added: 'せい', removed: '生' }
    ]
    assert.deepEqual(result, expect)
  })
})