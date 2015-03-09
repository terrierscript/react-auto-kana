var React = require("react")
var AutoKana = require("../dist/index")
console.log(AutoKana)
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
          <span>Input:</span>
          <AutoKana onUpdate={this.onUpdateKana} placeholder="Input here!"/>
          <span>Kana:</span>
          <input name="kana" value={this.state.kana} onChange={this.onChange} />
        </div>
      </div>
    )
  }
})
module.exports = Example
