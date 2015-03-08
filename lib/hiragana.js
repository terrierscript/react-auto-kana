
// kanaとしての許容文字のみかどうかの判定
// npm japaneseと同じロジックだと少々広すぎかもしれない
module.exports.isHiragana = function(str){
  var reg = new RegExp("^[ 　ぁあ-んー]*$")
  return reg.test(str)
}
