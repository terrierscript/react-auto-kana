var React = require("react")

var defaultLogic = require("./logic")

var KanaInput = React.createClass({displayName: "KanaInput",
  propType : {
    initialValue : React.PropTypes.string,
    onUpdate : React.PropTypes.func.isRequired,
    logic : React.PropTypes.func
  },
  getCleanValue(){
    return {
      kana: "",
      value: ""
    }
  },
  getInitialState(){
    var clean = this.getCleanValue()
    clean.value = this.props.initialValue || ""
    return clean
  },
  updateState(){
    if(!this.state.value){
      this.clean()
      return
    }

    var logic = this.props.logic || defaultLogic
    var next = logic(this.state)

    var debug = true
    if(debug){ //debug
      var hist = this.state.history || []
      hist.push(this.state.value)
      next.history = hist
      console.log(hist)
    }

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
    return React.createElement("input", {
      value: this.state.value,
      onChange: this.onChange}
    )
  }
})
module.exports = KanaInput
