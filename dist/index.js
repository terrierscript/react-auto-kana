"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");

var defaultLogic = require("./logic");

var KanaInput = React.createClass({
  displayName: "KanaInput",

  propType: {
    initialValue: React.PropTypes.string,
    onUpdate: React.PropTypes.func.isRequired,
    logic: React.PropTypes.func
  },
  getCleanValue: function getCleanValue() {
    return {
      kana: "",
      value: ""
    };
  },
  getInitialState: function getInitialState() {
    return this.getCleanValue();
  },
  updateState: function updateState() {
    var _this = this;

    if (!this.state.value) {
      this.clean();
      return;
    }

    var logic = this.props.logic || defaultLogic;
    var next = logic(this.state);

    // var debug = true
    // if(debug){ //debug
    //   var hist = this.state.history || []
    //   hist.push(this.state.value)
    //   next.history = hist
    //   console.log(hist)
    // }

    this.setState(next, function () {
      _this.onUpdate();
    });
  },
  clean: function clean() {
    var _this = this;

    this.replaceState(this.getCleanValue(), function () {
      _this.onUpdate();
    });
  },
  onUpdate: function onUpdate() {
    this.props.onUpdate(this.state);
  },
  onChange: function onChange(e) {
    var _this = this;

    this.setState({ value: e.target.value }, function () {
      _this.updateState();
    });
    this.onUpdate();
  },
  render: function render() {
    return React.createElement("input", _extends({}, this.props, {
      value: this.state.value,
      onChange: this.onChange
    }));
  }
});
module.exports = KanaInput;

