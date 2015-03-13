var diffmode = require("../src/diffmode")
var assert = require("power-assert")
var test = function(prev, current, prevAdded, assertFlag){
  it(prev + " -> " + current, function(){
    assert.equal(diffmode.isAddMode(prev, current, prevAdded), assertFlag)
  })
}
describe("diffmode", function(){
  test("","ｙ", undefined, false)
  test("ｙ","や", false, false)
  test("や","やｍ", false, false)
  test("や","やま", false, false)
  test("やま","山", false, false)
  test("山","山ｄ", false , true)
  test("山","山だ", true , false)
})