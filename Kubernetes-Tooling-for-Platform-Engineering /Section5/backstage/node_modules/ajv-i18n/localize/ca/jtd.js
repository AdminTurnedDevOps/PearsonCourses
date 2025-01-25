"use strict"
module.exports = function localize_ca(errors) {
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
            out += "ha de ser del tipus " + (t + n)
        }
        break
      case "enum":
        out = "ha de ser igual a un dels valors predefinits"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "no ha de tenir propietats addicionals"
            break
          case "missing":
            out =
              "ha de tenir la propietat requerida " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "ha de ser del tipus " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "ha de ser del tipus " + (t + n)
        break
      case "union":
        out = 'ha de coincidir amb algun esquema definit a "union"'
        break
      default:
        out = 'ha de passar la validació de la clau "' + e.keyword + '"'
    }
    e.message = out
  }
}
