var React = require("react")
var Example = require("./example.jsx")
var CompareExample = require("./compare.jsx")

var compairContainer = document.getElementById("compare-container")
if(compairContainer){
  React.render(<CompareExample/>, compairContainer)
}
var normalyContainer = document.getElementById("normaly-container")
React.render(<Example/>, normalyContainer)
