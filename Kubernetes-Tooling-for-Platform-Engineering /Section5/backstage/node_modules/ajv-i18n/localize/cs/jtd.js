"use strict"
module.exports = function localize_cs(errors) {
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
            out += "musí být " + (t + n)
        }
        break
      case "enum":
        out = "musí být rovno jedné hodnotě z výčtu"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "nemůže mít další položky"
            break
          case "missing":
            out =
              "musí obsahovat požadovanou položku " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "musí být " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "musí být " + (t + n)
        break
      case "union":
        out = 'musí vyhovět alespoň jednomu schématu v "union"'
        break
      default:
        out = 'musí vyhovět "' + e.keyword + '" validaci'
    }
    e.message = out
  }
}
