"use strict"
module.exports = function localize_fr(errors) {
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
            out += "doit être de type " + (t + n)
        }
        break
      case "enum":
        out = "doit être égal à une des valeurs prédéfinies"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "ne doit pas contenir de propriétés additionnelles"
            break
          case "missing":
            out = "requiert la propriété " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "doit être de type " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "doit être de type " + (t + n)
        break
      case "union":
        out = 'doit correspondre à un schéma de "union"'
        break
      default:
        out = 'doit être valide selon le critère "' + e.keyword + '"'
    }
    e.message = out
  }
}
