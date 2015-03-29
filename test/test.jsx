var assert = require("power-assert")
var React = require("react/addons")
var jsdom = require('mocha-jsdom');
var AutoKana = require("../src/AutoKana.jsx")

describe("Component", function(){
  jsdom();
  it("do", function(done){
    var updateFunc = function(state){
      console.log(state)
      // done()
    }
    var component = React.addons.TestUtils.renderIntoDocument(<AutoKana  onUpdate={updateFunc}/>)
    var node = React.findDOMNode(component.refs.input);
    React.addons.TestUtils.Simulate.change(node,
      { target: { value: 'やまだ'}
    });
    React.addons.TestUtils.Simulate.change(node,
      { target: { value: '山田'}
    });

  })
})