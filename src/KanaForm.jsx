var React = require("react")
var extend = require("extend")
var buildKanaState = require("./build_kana_state") // TODO
var KanaInput = React.createClass({
  propType : {
    initialValue : React.PropTypes.string,
    onUpdate : React.PropTypes.func.isRequired
  },
  getCleanValue(){
    return {
      buffer : "",
      kana : "",
      value : "",
      prevValue : "",
    }
  },
  getInitialState(){
    var clean = this.getCleanValue()
    clean.value = this.props.initialValue || ""
    return clean
  },
  onKeyEvent(){
    this.updateState()
  },
  updateState(){
    if(this.isBlank()){ // clean if empty
      this.clean()
      return
    }
    //var state = this.getNextState(this.state)
  /*  this.setState(state, () => {
      this.onUpdate()
    })*/
    this.updateNextState(this.state)
  },
  setKanaState(state){
    this.setState(state, () => {
      this.onUpdate()
    })
  },
  clean(){
    this.replaceState(this.getCleanValue(), () => {
      this.onUpdate()
    })
  },
  updateNextState(state){
    var old = extend(state, {})
    buildKanaState(state, (err, next) => {
      if(err){
        return
      }
      //console.log(old, "=>", next)
      this.setKanaState(next)
    })
    //return next
  },
  isBlank(){
    return !this.state.value
  },
  isConvert(){
    if(!this.isBlank() && this.state.value.length === this.state.kana.length){
      return true
    }
  },
  onUpdate(){
    //console.log(this.state)
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
      value={this.state.value}
      onChange={this.onChange}
    />
  }
})
var Example = React.createClass({
  getInitialState(){
    return {
      kana : ""
    }
  },
  onUpdateKana(data){
    this.setState({
      kana : data.kana
    })
    //this.props.onChange(this.state)
  },
  onChange(e){
    this.setState({
      kana : e.target.value
    })
  },
  render(){
    return (
      <div>
        <div>
          <KanaInput onUpdate={this.onUpdateKana} />
          <input name="kana" value={this.state.kana} onChange={this.onChange} />
        </div>
      </div>
    )
  }
})

module.exports = Example
module.exports.KanaInput = KanaInput
