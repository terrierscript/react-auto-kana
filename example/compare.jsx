var defaultLogic = require("../src/kana")
var legacyLogic = require("../legacy/legacy_logic")

var React = require("react")

var CompareExample = React.createClass({
  getCleanValue(){
    return {
      kana: "",
      value: ""
    }
  },
  getInitialState(){
    return {
      defaultState : this.getCleanValue(),
      legacyState : this.getCleanValue()
    }
  },
  clear(){
    this.replaceState(this.getInitialState())
  },
  onChange(e){
    var value = e.target.value
    if(value === ""){
      this.clear()
      return
    }
    var currentState = this.state
    currentState.defaultState.value = value
    currentState.legacyState.value = value
    // console.log(JSON.stringify([currentState.defaultState.prev, value, currentState.defaultState.map], "  "))

    var nextDefaultState = defaultLogic(currentState.defaultState)
    var nextLegacyState = legacyLogic(currentState.legacyState)

    this.setState({
      input : value,
      defaultState : nextDefaultState,
      legacyState : nextLegacyState
    })
  },
  render(){
    return (
      <div>
        <div className="input-block">
          <input value={this.state.input} onChange={this.onChange}/>
        </div>
        <div className="kana-block">
          <h3>今回の実装</h3>
          <div>Kana: {this.state.defaultState.kana}</div>
          <h3>なんちゃって<a href="http://rubricks.org/autoKana.html">autoKana</a>実装</h3>
          <div>Kana: {this.state.legacyState.kana}</div>
        </div>
      </div>
    )
  }
})

module.exports = CompareExample
