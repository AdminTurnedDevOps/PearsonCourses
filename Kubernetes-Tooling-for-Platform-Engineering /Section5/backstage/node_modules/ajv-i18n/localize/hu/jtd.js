"use strict"
module.exports = function localize_hu(errors) {
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
            out += t + n + " kell legyen"
        }
        break
      case "enum":
        out = "egyenlő kell legyen valamely előre meghatározott értékkel"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "nem lehetnek további elemei"
            break
          case "missing":
            out = "kell legyen " + e.params.missingProperty + " tulajdonsága"
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += t + n + " kell legyen"
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += t + n + " kell legyen"
        break
      case "union":
        out = 'meg kell feleljen legalább egy "union" alaknak'
        break
      default:
        out = 'must pass "' + e.keyword + '" keyword validation'
    }
    e.message = out
  }
}
