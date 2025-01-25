"use strict"
module.exports = function localize_sk(errors) {
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
            out += "musí byť " + (t + n)
        }
        break
      case "enum":
        out = "musí byť jedna z definovaných hodnôt"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "nemôže obsahovať ďalšie položky"
            break
          case "missing":
            out =
              "musí obsahovať požadovanú položku " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "musí byť " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "musí byť " + (t + n)
        break
      case "union":
        out = 'musí splňovať aspoň jednu zo schém v "union"'
        break
      default:
        out = 'musí splniť "' + e.keyword + '" validáciu'
    }
    e.message = out
  }
}
