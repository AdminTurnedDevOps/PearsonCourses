"use strict"
module.exports = function localize_es(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "no debe tener más de " + n + " elemento"
        if (n != 1) {
          out += "s"
        }
        break
      case "additionalProperties":
        out = "no debe tener propiedades adicionales"
        break
      case "anyOf":
        out = 'debe coincidir con algún esquema en "anyOf"'
        break
      case "const":
        out = "debe ser igual a la constante"
        break
      case "contains":
        out = "debe contener un elemento válido"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "debe contener la"
        if (n != 1) {
          out += "s"
        }
        out += " propiedad"
        if (n != 1) {
          out += "es"
        }
        out +=
          " " +
          e.params.deps +
          " cuando la propiedad " +
          e.params.property +
          " se encuentra presente"
        break
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'tag "' + e.params.tag + '" must be string'
            break
          case "mapping":
            out = 'value of tag "' + e.params.tag + '" must be in oneOf'
            break
          default:
            out =
              'debe pasar la validación de palabra clave "' + e.keyword + '"'
        }
        break
      case "enum":
        out = "deber ser igual a uno de los valores predefinidos"
        break
      case "false schema":
        out = "el esquema és falso"
        break
      case "format":
        out = 'debe coincidir con el formato "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "debe ser " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "debe ser " + cond
        break
      case "if":
        out =
          'debe corresponderse con el esquema "' + e.params.failingKeyword + '"'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "debe ser " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "no debe contener más de " + n + " elemento"
        if (n != 1) {
          out += "s"
        }
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "no debe contener más de " + n + " caracter"
        if (n != 1) {
          out += "es"
        }
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "no debe contener más de " + n + " propiedad"
        if (n != 1) {
          out += "es"
        }
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "debe ser " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "no debe contener menos de " + n + " elemento"
        if (n != 1) {
          out += "s"
        }
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "no debe contener menos de " + n + " caracter"
        if (n != 1) {
          out += "es"
        }
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "no debe contener menos de " + n + " propiedad"
        if (n != 1) {
          out += "es"
        }
        break
      case "multipleOf":
        out = "debe ser múltiplo de " + e.params.multipleOf
        break
      case "not":
        out = 'no debe ser válido según el esquema en "not"'
        break
      case "oneOf":
        out = 'debe coincidir con un solo esquema en "oneOf"'
        break
      case "pattern":
        out = 'debe coincidir con el patron "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'la propiedad debe coincidir con el patrón "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "la propiedad no és válida"
        break
      case "required":
        out = "debe tener la propiedad requerida " + e.params.missingProperty
        break
      case "type":
        out = "debe ser " + e.params.type
        break
      case "unevaluatedItems":
        out = ""
        var n = e.params.len
        out += "must NOT have more than " + n + " item"
        if (n != 1) {
          out += "s"
        }
        break
      case "unevaluatedProperties":
        out = "must NOT have unevaluated properties"
        break
      case "uniqueItems":
        out =
          "no debe contener elementos duplicados, (los elementos ## " +
          e.params.j +
          " y " +
          e.params.i +
          " son idénticos)"
        break
      default:
        out = 'debe pasar la validación de palabra clave "' + e.keyword + '"'
    }
    e.message = out
  }
}
