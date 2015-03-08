var rekana = require("../lib/rekana")
var assert = require("power-assert")

describe("rekana", function(){
  it("basic", function(){
    assert.equal("まりお", rekana("毬男", [
      ["鞠男","まりお"],
      ["毬","鞠"]
    ]))
  })
  it("すーぱー", function(){
    assert.equal("すーぱー", rekana("すーぱー", []))
  })
  it("生生生", function(){
    assert.equal("うぶなませい", rekana("生生生", [
      ["生" , "うぶ"],
      ["生" , "なま"],
      ["生" , "せい"],
    ]))
  })
})