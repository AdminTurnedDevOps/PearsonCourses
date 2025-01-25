"use strict"
module.exports = function localize_pl(errors) {
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
            out += "powinien być " + (t + n)
        }
        break
      case "enum":
        out = "powinien być równy jednej z predefiniowanych wartości"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "nie powinien zawierać dodatkowych pól"
            break
          case "missing":
            out = "powinien zawierać wymagane pole " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "powinien być " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "powinien być " + (t + n)
        break
      case "union":
        out = 'powinien pasować do wzoru z sekcji "union"'
        break
      default:
        out = 'powinien przejść walidację "' + e.keyword + '"'
    }
    e.message = out
  }
}
