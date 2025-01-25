"use strict"
module.exports = function localize_ko(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = '"' + e.params.tag + '"태그는 문자열이여야 합니다'
            break
          case "mapping":
            out =
              '"' + e.params.tag + '"태그의 값은 반드시 매핑에 있어야합니다.'
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += t + n + "이여야 합니다"
        }
        break
      case "enum":
        out = "미리 정의된 값중 하나여야 합니다"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "추가적인 속성은 허용되지 않습니다"
            break
          case "missing":
            out = "" + e.params.missingProperty + " 속성은 필수입니다"
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += t + n + "이여야 합니다"
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += t + n + "이여야 합니다"
        break
      case "union":
        out = '"union"의 스키마와 일치해야 합니다'
        break
      default:
        out = '"' + e.keyword + '"키워드 검사를 통과해야 합니다'
    }
    e.message = out
  }
}
