"use strict"
module.exports = function localize_it(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'il tag "' + e.params.tag + '" deve essere di tipo stringa'
            break
          case "mapping":
            out =
              'il valore del tag "' + e.params.tag + '" deve essere nei mapping'
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "deve essere di tipo " + (t + n)
        }
        break
      case "enum":
        out = "dovrebbe essere uguale ad uno dei valori predefiniti"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "non deve avere attributi addizionali"
            break
          case "missing":
            out =
              "deve avere l'attributo obbligatorio " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "deve essere di tipo " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "deve essere di tipo " + (t + n)
        break
      case "union":
        out = 'deve corrispondere ad uno schema in "union"'
        break
      default:
        out = 'deve essere valido secondo il criterio "' + e.keyword + '"'
    }
    e.message = out
  }
}
