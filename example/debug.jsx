var React = require("react")
var AutoKana = require("../src/AutoKana.jsx")

var Debugger = React.createClass({
  getInitialState(){
    return {
      kana : "",
      kanaMode : ""
    }
  },
  onUpdateKana(data){
    var mode = this.state.kanaMode
    console.log(mode, data)
    this.setState({
      kana : data.kana,
      prevMode : mode,
      kanaMode : data.mode,
      data : data,
      dataDump : JSON.stringify(data, null, "  ")
    })
    // this.props.onChange(this.state)
  },
  onChange(e){
    this.setState({
      kana : e.target.value,
    })
  },
  render(){
    //var b = ();
    return (
      <div>
        <div className="input-block">
          <span>Input:</span>
          <AutoKana onUpdate={this.onUpdateKana} placeholder="Input here!"/>
        </div>
        <div className="debug-block">
          <div>
            Mode: <span>{this.state.prevMode} || {this.state.kanaMode}</span>
          </div>
          <div>
            <pre>
              <code>
                {this.state.dataDump}
              </code>
            </pre>
          </div>
        </div>
      </div>
    )
  }
})
module.exports = Debugger
