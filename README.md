# React Auto Kana
[![Circle CI](https://circleci.com/gh/suisho/react-auto-kana.svg?style=svg)](https://circleci.com/gh/suisho/react-auto-kana)

> Japanese React Kana Input Component

## Demo
[Live Demo](http://suisho.github.io/react-auto-kana/)

## Installation
```
npm install -S react-auto-kana
```
## Usage Example

```js
var React = require("react")
var AutoKana = require("react-auto-kana")

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
          <AutoKana onUpdate={this.onUpdateKana} />
          <input name="kana" value={this.state.kana} onChange={this.onChange} />
        </div>
      </div>
    )
  }
})
module.exports = Example
```

### props
- `onUpdate`
  - Callback after generated kana
  - `data.kana` : Generated kana value

If you want get Katakana, you can use [japanese](http://npmjs.org/japanese) module.

# Run demo localy

```
npm run example
```

# Known Issue
Core library is [here](http://github.com/suisho/historykana)

- Invalid behavior when same Kanji is input.
