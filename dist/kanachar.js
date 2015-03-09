
// kanaとしての許容文字のみかどうかの判定
module.exports = function(str){
  var reg = new RegExp("^[ 　ぁあ-んー]*$")
  return reg.test(str)
}
