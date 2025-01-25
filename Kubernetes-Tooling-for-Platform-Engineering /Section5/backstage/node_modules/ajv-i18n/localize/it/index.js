"use strict"
module.exports = function localize_it(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "non dovrebbe avere più di " + n + " element"
        if (n == 1) {
          out += "o"
        } else {
          out += "i"
        }
        break
      case "additionalProperties":
        out = "non deve avere attributi aggiuntivi"
        break
      case "anyOf":
        out = 'deve corrispondere ad uno degli schema in "anyOf"'
        break
      case "const":
        out = "deve essere uguale alla costante"
        break
      case "contains":
        out = "deve contentere un elemento valido"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "dovrebbe avere "
        if (n == 1) {
          out += "l'"
        } else {
          out += "gli "
        }
        out += "attribut"
        if (n == 1) {
          out += "o"
        } else {
          out += "i"
        }
        out +=
          " " +
          e.params.deps +
          " quando l'attributo " +
          e.params.property +
          " è presente"
        break
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'il tag "' + e.params.tag + '" deve essere di tipo stringa'
            break
          case "mapping":
            out =
              'il valore del tag "' + e.params.tag + '" deve essere nei oneOf'
            break
          default:
            out = 'deve essere valido secondo il criterio "' + e.keyword + '"'
        }
        break
      case "enum":
        out = "deve essere uguale ad uno dei valori consentiti"
        break
      case "false schema":
        out = "lo schema booleano è falso"
        break
      case "format":
        out = 'deve corrispondere al formato "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "deve essere " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "deve essere " + cond
        break
      case "if":
        out = 'deve corrispondere allo schema "' + e.params.failingKeyword + '"'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "deve essere " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "non deve avere più di " + n + " element"
        if (n == 1) {
          out += "o"
        } else {
          out += "i"
        }
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "non deve essere più lungo di " + n + " caratter"
        if (n == 1) {
          out += "e"
        } else {
          out += "i"
        }
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "non deve avere più di " + n + " attribut"
        if (n == 1) {
          out += "o"
        } else {
          out += "i"
        }
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "deve essere " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "non deve avere meno di " + n + " element"
        if (n == 1) {
          out += "o"
        } else {
          out += "i"
        }
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "non deve essere meno lungo di " + n + " caratter"
        if (n == 1) {
          out += "e"
        } else {
          out += "i"
        }
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "non deve avere meno di " + n + " attribut"
        if (n == 1) {
          out += "o"
        } else {
          out += "i"
        }
        break
      case "multipleOf":
        out = "deve essere un multiplo di " + e.params.multipleOf
        break
      case "not":
        out = 'non deve essere valido in base allo schema di "non"'
        break
      case "oneOf":
        out = 'deve corrispondere esattamente ad uno degli schema in "oneOf"'
        break
      case "pattern":
        out = 'deve corrispondere al formato "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'deve avere un attributo che corrisponda al formato "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "il nome dell'attritbuto non è valido"
        break
      case "required":
        out = "deve avere l'attributo obbligatorio " + e.params.missingProperty
        break
      case "type":
        out = "deve essere di tipo " + e.params.type
        break
      case "unevaluatedItems":
        out = ""
        var n = e.params.len
        out += "non deve avere più di " + n + " elementi"
        if (n == 1) {
          out += "o"
        } else {
          out += "i"
        }
        break
      case "unevaluatedProperties":
        out = "non deve avere attributi non valutati"
        break
      case "uniqueItems":
        out =
          "non deve avere duplicati (gli elementi ## " +
          e.params.j +
          " e " +
          e.params.i +
          " sono uguali)"
        break
      default:
        out = 'deve essere valido secondo il criterio "' + e.keyword + '"'
    }
    e.message = out
  }
}
