"use strict"
module.exports = function localize_sv(errors) {
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
            out += "borde vara " + (t + n)
        }
        break
      case "enum":
        out = "borde vara ekvivalent med en av dess fördefinierade värden"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "borde inte ha fler egenskaper"
            break
          case "missing":
            out =
              "borde ha den nödvändiga egenskapen " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "borde vara " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "borde vara " + (t + n)
        break
      case "union":
        out = 'borde matcha något schema i "union"'
        break
      default:
        out = 'bör passera "' + e.keyword + '" nyckelord validering'
    }
    e.message = out
  }
}
