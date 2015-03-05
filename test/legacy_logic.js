var assert = require("power-assert")
var buildState = require("../legacy/legacy_logic.js")

// Test Helper

var generateTestMsg = function(input, expect, msg) {
  msg = msg || ""
  return [input.prevValue, "(" + input.kana + ")", "=>", input.value, "(" + expect.kana + ")", ":", msg].join(" ")
}

var test = function(input, expect, msg) {
  it(generateTestMsg(input, expect, msg), function(done) {
    var result = buildState(input)
    var keys = ["kana", /*"buffer"*/ ]
    keys.forEach(function(key) {
      assert.equal(result[key], expect[key], "fail:" + key)
    })
    done()
  })
}
var testPending = function(input, expect, msg) {
  it(generateTestMsg(input, expect, msg))
}

describe("legacy", function() {
  describe("kana", function() {
    describe("stadnard", function() {
      test({
        value: "ｙ",
        kana: "",
        buffer: ""
      }, {
        kana: "",
      })
      test({
        value: "あ",
        buffer: "",
        kana: "",
      }, {
        kana: "あ",
      })
      test({
        value: "あい",
        kana: "あ",
        buffer: "",
      }, {
        kana: "あい",
      })
      test({
        value: "あ",
        kana: "あい",
        buffer: "",
      }, {
        kana: "あ",
        buffer: "",
      }, "removed")
    })
    describe("stadnard convert", function() {
      test({
        value: "山本",
        prevValue: "やまもと",
        kana: "やまもと",
        buffer: ""
      }, {
        value: "山本",
        kana: "やまもと",
        buffer: "やまもと"
      }, "Convert")
    })
    describe("Yamada", function() {
      test({
        value: "山田た",
        prevValue: "山田",
        kana: "やまだ",
        buffer: "やまだ"
      }, {
        value: "山田た",
        kana: "やまだた",
        buffer: "やまだ"
      })
      test({
        value: "山田た",
        prevValue: "山田たろ",
        kana: "やまだたろ",
        buffer: "やまだ"
      }, {
        value: "山田た",
        kana: "やまだた",
        buffer: "やまだ"
      }, "backspace XXX")
      test({
        buffer: "やまだ",
        kana: "やまだ",
        value: "山田"
      }, {
        buffer: "やまだ",
        kana: "やまだ",
        value: "山田"
      })
      test({
        buffer: "やまだ",
        kana: "やまだ",
        value: "山"
      }, {
        buffer: "やまだ",
        kana: "やまだ",
        value: "山"
      })
      test({
        kana: "やまやま",
        value: "やま山",
        buffer: "やまやま"
      }, {
        buffer: "やまやま",
        kana: "やまやま",
        value: "やま山"
      })
      test({
        buffer: "",
        kana: "や",
        value: "やま"
      }, {
        buffer: "",
        kana: "やま",
        value: "やま"
      })
      test({
        buffer: "",
        kana: "や",
        value: "やｍ",
        prevValue: "や"
      }, {
        value: "やｍ",
        kana: "や",
        buffer: "や"
      })
      test({
        buffer: "",
        kana: "やま",
        prevValue: "やま",
        value: "山"
      }, {
        kana: "やま"
      })
      test({
        buffer: "あやま",
        kana: "あやま",
        value: "あ山や"
      }, {
        buffer: "あやま",
        kana: "あやまや",
        value: "あ山や"
      })

      test({
        buffer: "",
        kana: "や",
        value: "やｍ",
        prevValue: "や"
      }, {
        kana: "や"
      })
      test({
        buffer: "や",
        kana: "や",
        value: "やま",
        prevValue: "やｍ",
        prevKana: "や"
      }, {
        buffer: "",
        kana: "やま",
        value: "やま"
      })
      test({
        buffer: "やまだ",
        kana: "やまだ",
        value: "山田た",
        prevValue: "山田ｔ",
        prevKana: "やまだ"
      }, {
        buffer: "やまだ",
        kana: "やまだた"
      })
      test({
          buffer: "やまだ",
          kana: "やまだた",
          value: "山田",
          prevValue: "山田た"
        }, //active : null, prevActive : た presani: null
        {
          buffer: "やまだ",
          kana: "やまだ"
        },
        "Backspace"
      )
      test({
          buffer: "やまだ",
          kana: "やまだたろう",
          value: "山田太郎",
          prevValue: "山田たろう"
        }, {
          buffer: "やまだたろう",
          kana: "やまだたろう"
        },
        "Convert"
      )
    })
    describe("Mario (katakana)", function() {

      test({
          buffer: "",
          kana: "まりお",
          value: "まりお",
          prevValue: "マリオ"
        }, {
          buffer: "",
          kana: "まりお"
        },
        "Katakana to Hiragana"
      )
      test({
        buffer: "やまもとま",
        kana: "やまもとま",
        value: "山本まり",
        prevValue: "山本まｒ"
      }, {
        kana: "やまもとまり"
      })
      test({
          buffer: "やまもとまりお",
          kana: "やまもとまりお",
          value: "山本麻里お",
          prevValue: "山本万里生"
        }, {
          kana: "やまもとまりお"
        },
        "Convert"
      )
      test({
        buffer: "やまもと",
        kana: "やまもとまりお",
        value: "山本麻里お",
        prevValue: "山本まりお"
      }, {
        kana: "やまもとまりお"
      })
      test({
          buffer: "やまいもやま",
          kana: "やまいもやま",
          value: "山いも",
          prevValue: "山いも山"
        }, {
          kana: "やまいもやま"
        },
        "backspace mixed"
      )
    })
    describe("Confused", function() {
      test({
        buffer: "やまだたろう",
        kana: "やまだたろう",
        value: "やま",
        prevValue: "やまだ"
      }, {
        kana: "やまだたろう"
      })
      test({
        buffer: "やまま",
        kana: "やまま",
        value: "やママｍ",
        prevValue: "やママｍ"
      }, {
        kana: "やまま"
      })
    })
  })
})