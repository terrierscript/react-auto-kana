var React = require("react")
var AutoKana = require("../index.js")

var Debugger = React.createClass({
  getInitialState(){
    return {
      kana : "",
      kanaMode : "",
      data : {}
    }
  },
  onUpdateKana(data){
    this.setState({
      kana : data.kana,
      data : data,
      dataDump : JSON.stringify(data, null, "  "),
    })
    // this.props.onChange(this.state)
  },
  render(){
    //var b = ();
    var historyDump = JSON.stringify(this.state.data.history)
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
                {historyDump}
              </code>
            </pre>
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
