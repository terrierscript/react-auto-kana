var sameMoraGroup = [
  ["い", "ゐ"],
  ["え", "ゑ"],
  ["お", "を"],
  ["オ", "ヲ"],
]

var suteganaGroup = [
  ["あ", "ぁ"],
  ["い", "ぃ"],
  ["う", "ぅ"],
  ["え", "ぇ"],
  ["お", "ぉ"],
  ["つ", "っ"],
  ["や", "ゃ"],
  ["ゆ", "ゅ"],
  ["よ", "ょ"],
  ["わ", "ゎ"],
  ["ア", "ァ"],
  ["イ", "ィ"],
  ["ウ", "ゥ"],
  ["エ", "ェ"],
  ["オ", "ォ"],
  ["カ", "ヵ"],
  ["ク", "ㇰ"],
  ["ケ", "ヶ"],
  ["シ", "ㇱ"],
  ["ス", "ㇲ"],
  ["ツ", "ッ"],
  ["ト", "ㇳ"],
  ["ヌ", "ㇴ"],
  ["ハ", "ㇵ"],
  ["ヒ", "ㇶ"],
  ["フ", "ㇷ"],
  ["ヘ", "ㇸ"],
  ["ホ", "ㇹ"],
  ["ム", "ㇺ"],
  ["ヤ", "ャ"],
  ["ユ", "ュ"],
  ["ヨ", "ョ"],
  ["ワ", "ヮ"],
  ["ラ", "ㇻ"],
  ["リ", "ㇼ"],
  ["ル", "ㇽ"],
  ["レ", "ㇾ"],
  ["ロ", "ㇿ"]
]

var kanaGroup = sameMoraGroup.concat(suteganaGroup)

var kanaReg = new RegExp(kanaGroup.map(function(group){
  return group[1]
}), "g")

// generate table
var kanaTable = {}
kanaGroup.forEach(function(kana){
  kanaTable[kana[1]] = kana[0]
})

module.exports.getGroup = function(char){
  var result = kanaGroup.filter(function(grp){
    return grp.join(" ").match(char)
  })
  return result[0]
}
module.exports.isSameKana = function(char1, char2){
  return kanaGroup.some(function(grp){
    var str = grp.join(" ")
    return str.match(char1) && str.match(char2)
  })
}
module.exports.normalize = function(str){
  string.replace(kanaReg, function(){
    
  })
}