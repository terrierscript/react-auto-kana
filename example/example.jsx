var React = require("react")
var AutoKana = require("../index")
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
          <div className="input-block">
            <span>Input:</span>
            <AutoKana onUpdate={this.onUpdateKana} placeholder="Input here!"/>
          </div>
          <div className="kana-block">
            <span>Kana:</span>
            <input name="kana" value={this.state.kana} onChange={this.onChange} />
          </div>
        </div>
      </div>
    )
  }
})
module.exports = Example
