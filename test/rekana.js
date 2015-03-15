var rekana = require("../src/rekana")
var assert = require("power-assert")

describe("rekana", function(){
  it("basic", function(){
    assert.equal("まりお", rekana("毬男", [
      ["毬","鞠"],
      ["鞠男","まりお"],
    ]))
  })
  it("すーぱー", function(){
    assert.equal("すーぱー", rekana("すーぱー", []))
  })
})