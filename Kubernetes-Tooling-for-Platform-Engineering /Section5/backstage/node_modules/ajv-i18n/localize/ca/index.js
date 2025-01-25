"use strict"
module.exports = function localize_ca(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "no ha de tenir més de " + n + " element"
        if (n != 1) {
          out += "s"
        }
        break
      case "additionalProperties":
        out = "no ha de tenir propietats addicionals"
        break
      case "anyOf":
        out = 'ha de coincidir amb algun esquema definit a "anyOf"'
        break
      case "const":
        out = "ha de ser igual a la constant"
        break
      case "contains":
        out = "ha de contenir un ítem vàlid"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "ha de contenir la propietat"
        if (n != 1) {
          out += "s"
        }
        out +=
          " " +
          e.params.deps +
          " quan la propietat " +
          e.params.property +
          " és present"
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
            out = 'ha de passar la validació de la clau "' + e.keyword + '"'
        }
        break
      case "enum":
        out = "ha de ser igual a un dels valors predefinits"
        break
      case "false schema":
        out = "l’esquema és fals"
        break
      case "format":
        out = 'ha de coincidir amb el format "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "ha de ser " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "ha de ser " + cond
        break
      case "if":
        out =
          'ha de correspondre’s amb l’esquema "' + e.params.failingKeyword + '"'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "ha de ser " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "no ha de tenir més de " + n + " ítem"
        if (n != 1) {
          out += "s"
        }
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "no pot contenir més de " + n + " caràcter"
        if (n != 1) {
          out += "s"
        }
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "no pot contenir més de " + n + " propietat"
        if (n != 1) {
          out += "s"
        }
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "ha de ser " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "no ha de tenir menys de " + n + " ítem"
        if (n != 1) {
          out += "s"
        }
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "no pot contenir menys de " + n + " caràcter"
        if (n != 1) {
          out += "s"
        }
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "no pot contenir menys de " + n + " propietat"
        if (n != 1) {
          out += "s"
        }
        break
      case "multipleOf":
        out = "ha de ser múltiple de " + e.params.multipleOf
        break
      case "not":
        out = 'no ha de ser vàlid d’acord amb l’esquema definit a "not"'
        break
      case "oneOf":
        out = 'ha de coincidir només amb un esquema definit a "oneOf"'
        break
      case "pattern":
        out = 'ha de coincidir amb el patró "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'la propietat ha de coincidir amb el patró "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "la propietat no és vàlida"
        break
      case "required":
        out = "ha de tenir la propietat requerida " + e.params.missingProperty
        break
      case "type":
        out = "ha de ser del tipus " + e.params.type
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
          "no ha de tenir ítems duplicats (els ítems ## " +
          e.params.j +
          " i " +
          e.params.i +
          " són idèntics)"
        break
      default:
        out = 'ha de passar la validació de la clau "' + e.keyword + '"'
    }
    e.message = out
  }
}
