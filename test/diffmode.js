// return
// var diffmode = require("../src/diffmode")
// var assert = require("power-assert")
// var test = function(prev, current, prevAdded, expectFlag){
//   it(prev + " -> " + current, function(){
//     var result = diffmode.isAddMode(prev, current, prevAdded)
//     assert.equal(result, expectFlag)
//   })
// }
// describe("diffmode", function(){
//   test(undefined,"ｙ", undefined, true)
//   test("","ｙ", undefined, true)
//   test("ｙ","や", true, false)
//   test("や","やｍ", false, false)
//   test("や","やま", false, false)
//   test("やま","山", false, false)
//   test("山","山ｄ", false , true)
//   test("山","山だ", true , false)
//   test("山田","山田たｒ", false , false)
// })