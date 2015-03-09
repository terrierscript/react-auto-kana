# React Kana Input
[![Circle CI](https://circleci.com/gh/suisho/react-kana-input.svg?style=svg)](https://circleci.com/gh/suisho/react-kana-input)

> Japanese React Kana Input Component

## Example

```js
var React = require("react")
var KanaInput = require("react-kana-input")

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
          <KanaInput onUpdate={this.onUpdateKana} />
          <input name="kana" value={this.state.kana} onChange={this.onChange} />
        </div>
      </div>
    )
  }
})
module.exports = Example
```

- `onUpdate`
  - callback after generated kana
  - `data.kana` : Furigana

# Known Issue
- 同じ漢字が入力された場合の挙動