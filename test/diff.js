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
      { value: '山田' },
      { added: '太郎', removed: 'たろう' }
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
  it("add first", function(){
    var result = diff("太郎", "山田太郎")
    var expect = [
      { added: '山田'},
      { value: '太郎'}
    ]
    assert.deepEqual(result, expect)
  })
  it("insert", function(){
    var result = diff("山田太郎", "山田ドカベン太郎")
    var expect = [
      { value: '山田' },
      { added: 'ドカベン'},
      {value: '太郎' }
    ]
    assert.deepEqual(result, expect)
  })
})