var React = require("react")
var Example = require("./example.jsx")
var DebugExample = require("./debug.jsx")

var normalyContainer = document.getElementById("normaly-container")
if(normalyContainer){
  React.render(<Example/>, normalyContainer)
}

var debugContainer = document.getElementById("debug-container")
if(debugContainer){
  React.render(<DebugExample/>, debugContainer)
}
