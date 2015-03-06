var defaultLogic = require("../src/logic")
var legacyLogic = require("../legacy/legacy_logic")

var React = require("react")
var KanaInput = require("../src/KanaInput.jsx")

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
  onUpdateKana(data){
    this.setState({ kana : data.kana })
  },
  onUpdateKanaLegacy(data){
    this.setState({ kanaLegacy : data.kana })
  },
  onChange(e){
    var currentState = this.state
    var value = e.target.value
    currentState.defaultState.value = value
    currentState.legacyState.value = value

    var nextDefaultState = defaultLogic(currentState.defaultState)
    var nextLegacyState = legacyLogic(currentState.legacyState)

    this.setState({
      input : e.target.value,
      defaultState : nextDefaultState,
      legacyState : nextLegacyState
    })
  },
  render(){
    return (
      <div>
        <h1>React Kana Input</h1>
        <div className="input-block">
          <h2>Input</h2>
          <input value={this.state.input} onChange={this.onChange}/>
        </div>
        <div className="kana-block">
          <h2>Kana</h2>
          <div>Normal: {this.state.defaultState.kana}</div>
          <div>Legacy: {this.state.legacyState.kana}</div>
        </div>
      </div>
    )
  }
})

React.render(<CompareExample/>, document.getElementById("container"))
