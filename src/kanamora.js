var group = [
  ["あ", "ぁ"],
  ["い", "ぃ", "ゐ"],
  ["う", "ぅ"],
  ["え", "ぇ", "ゑ"],
  ["お", "ぉ", "を"],
  ["つ", "っ"],
  ["や", "ゃ"],
  ["ゆ", "ゅ"],
  ["よ", "ょ"],
  ["わ", "ゎ"],
  ["ア", "ァ"],
  ["イ", "ィ"],
  ["ウ", "ゥ"],
  ["エ", "ェ"],
  ["オ", "ォ", "ヲ"],
  ["カ", "ヵ"],
  ["ケ", "ヶ"],
  ["ツ", "ッ"],
  ["ヤ", "ャ"],
  ["ユ", "ュ"],
  ["ヨ", "ョ"],
  ["ワ", "ヮ"],
]

module.exports.getGroup = function(char){
  var result = group.filter(function(grp){
    return grp.join(" ").match(char)
  })
  return result[0]
}
module.exports.sameGroup = function(char1, char2){
  return group.some(function(grp){
    var str = grp.join(" ")
    return str.match(char1) && str.match(char2)
  })
}
