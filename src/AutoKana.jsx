var React = require("react")
var historikana = require("./historikana")

var logic = function(state){
  var value = state.value
  state.history.push(value)
  var result = historikana(state.history)
  state.kana = result.kana
  state.partial = result.partial
  return state
}

var KanaInput = React.createClass({
  propType : {
    initialValue : React.PropTypes.string,
    onUpdate : React.PropTypes.func.isRequired,
    logic : React.PropTypes.func
  },
  getCleanValue(){
    return {
      kana: "",
      value: "",
      history: []
    }
  },
  getInitialState(){
    return this.getCleanValue()
  },
  updateState(){
    if(!this.state.value){
      this.clean()
      return
    }

    // var logic = this.props.logic || kanaLogic
    var next = logic(this.state)

    this.setState(next, () => {
      this.onUpdate()
    })
  },
  clean(){
    this.replaceState(this.getCleanValue(), () => {
      this.onUpdate()
    })
  },
  onUpdate(){
    this.props.onUpdate(this.state)
  },
  onChange(e){
    this.setState({ value : e.target.value }, () => {
      this.updateState()
    })
    this.onUpdate()
  },
  render(){
    return <input
      {...this.props}
      value={this.state.value}
      onChange={this.onChange}
    />
  }
})
module.exports = KanaInput
