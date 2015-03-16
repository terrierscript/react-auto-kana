var historikana = require("../src/historikana")
describe("historikana", function(){
  it("SuperMario1 scenario", function(){
    var steps = ["ｓ", "す", "すｈ", "すは", "酢派", "酢破", "素破" ,
    "素破ｍ", "素破ま", "素破まｒ", "素破まり",
    "素破まりお", "素破真理雄"
    , "素破万里緒",
    "素破毬男", "素破まりを", "素破鞠男", "素破鞠夫"
    ]
    console.log(historikana(steps)) //, "すはまりお")
  })
  
  it("Same Kanji scenario", function(){
    var steps = ["う", "うｂ", "うぶ", "初", "生", "生ｎ", "生な", "生なｍ", "生なま", "生生", "生生", "生生ｓ", "生生せ", "生生せい", "生生生", "生生生"]
    // stepTest(steps, "うぶなませい")
    console.log(historikana(steps)) //, "すはまりお")

  })
})
