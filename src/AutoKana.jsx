var React = require("react")

var kanaLogic = require("./kana")

var KanaInput = React.createClass({
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
    return this.getCleanValue()
  },
  updateState(){
    if(!this.state.value){
      this.clean()
      return
    }

    var logic = this.props.logic || kanaLogic
    var next = logic(this.state)

    // var debug = true
    // if(debug){ //debug
    //   var hist = this.state.history || []
    //   hist.push(this.state.value)
    //   next.history = hist
    //   console.log(hist)
    // }

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
