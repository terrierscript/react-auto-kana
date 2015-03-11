var React = require("react")
var AutoKana = require("../index.js")

var Debugger = React.createClass({
  getInitialState(){
    return {
      kana : "",
      kanaMode : "",
      history : []
    }
  },
  onUpdateKana(data){
    var mode = this.state.kanaMode
    var history = this.state.history || []

    this.setState({
      kana : data.kana,
      prevMode : mode,
      kanaMode : data.mode,
      data : data,
      dataDump : JSON.stringify(data, null, "  "),
      history : history,
      historyDump : JSON.stringify(history)

    })
    // this.props.onChange(this.state)
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
                {this.state.historyDump}
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
