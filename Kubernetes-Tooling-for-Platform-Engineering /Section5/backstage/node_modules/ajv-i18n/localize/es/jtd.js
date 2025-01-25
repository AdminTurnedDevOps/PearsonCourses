"use strict"
module.exports = function localize_es(errors) {
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
            out += "debe ser " + (t + n)
        }
        break
      case "enum":
        out = "deber ser igual a uno de los valores predefinidos"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "no debe tener propiedades adicionales"
            break
          case "missing":
            out =
              "debe tener la propiedad requerida " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "debe ser " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "debe ser " + (t + n)
        break
      case "union":
        out = 'debe coincidir con algún esquema en "union"'
        break
      default:
        out = 'debe pasar la validación de palabra clave "' + e.keyword + '"'
    }
    e.message = out
  }
}
