"use strict"
module.exports = function localize_ja(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'tag "' + e.params.tag + '" must be string'
            break
          case "mapping":
            out = 'value of tag "' + e.params.tag + '" must be in mapping'
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += t + n + "でなければいけない"
        }
        break
      case "enum":
        out = "事前に定義された値のいずれかに等しくなければいけない"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "追加してはいけない"
            break
          case "missing":
            out =
              "必要なプロパティ" +
              e.params.missingProperty +
              "がなければいけない"
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += t + n + "でなければいけない"
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += t + n + "でなければいけない"
        break
      case "union":
        out = '"union"のスキーマとマッチしなくてはいけない'
        break
      default:
        out = 'must pass "' + e.keyword + '" keyword validation'
    }
    e.message = out
  }
}
