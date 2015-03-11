var React = require("react")
var Example = require("./example.jsx")
var CompareExample = require("./compare.jsx")
var DebugExample = require("./debug.jsx")

var compairContainer = document.getElementById("compare-container")
if(compairContainer){
  React.render(<CompareExample/>, compairContainer)
}

var normalyContainer = document.getElementById("normaly-container")
if(normalyContainer){
  React.render(<Example/>, normalyContainer)
}

var debugContainer = document.getElementById("debug-container")
if(debugContainer){
  React.render(<DebugExample/>, debugContainer)
}

