var assert = require("power-assert")
var React = require("react/addons")
var jsdom = require('mocha-jsdom');
var AutoKana = require("../lib/AutoKana.js")
var TestUtils = React.addons.TestUtils
describe("Simple scenario", function(){
  jsdom();
  it("do", function(){
    function noop(){ // noop
    }

    var component = TestUtils.renderIntoDocument(<AutoKana onUpdate={noop}/>)
    var node = TestUtils.findRenderedDOMComponentWithTag(component, "input");

    var inputHistory = ["ｙ","や","やｍ","やま","やまｄ","やまだ","山田","山田","山田ｔ","山田た","山田たｒ","山田たろ","山田たろう","山田太郎","山田太郎"]
    inputHistory.forEach(function(v){
      TestUtils.Simulate.change(node,
        { target: { value: v}
      })
    })
    assert.equal(component.state.kana, "やまだたろう")

  })
})