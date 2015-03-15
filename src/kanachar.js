// TODO: customizable function
// kanaとしての許容文字のみかどうかの判定
module.exports = function(str){
  str = str || ""
  var reg = new RegExp("^[ 　ぁあ-んー]*$")
  return reg.test(str)
}
