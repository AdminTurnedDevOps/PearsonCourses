"use strict"
module.exports = function localize_sk(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "nemôže obsahovať viac, než " + n + " prv"
        if (n == 1) {
          out += "ok"
        } else {
          out += "kov"
        }
        break
      case "additionalProperties":
        out = "nemôže obsahovať ďalšie položky"
        break
      case "anyOf":
        out = 'musí splňovať aspoň jednu zo schém v "anyOf"'
        break
      case "const":
        out = "musí byť konštanta"
        break
      case "contains":
        out = "musí obsahovať prvok zodpovedajúci schéme"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += " musí obsahovať polož"
        if (n >= 2 && n <= 4) {
          out += "ky"
        } else if (n != 1) {
          out += "iek"
        } else {
          out += "ka"
        }
        out += ": " + e.params.deps + ", ak obsahuje " + e.params.property
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
            out = 'musí splniť "' + e.keyword + '" validáciu'
        }
        break
      case "enum":
        out = "musí byť jedna z definovaných hodnôt"
        break
      case "false schema":
        out = "schéma je false"
        break
      case "format":
        out = 'musí obsahovať formát "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "musí byť " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "musí byť " + cond
        break
      case "if":
        out = 'must match "' + e.params.failingKeyword + '" schema'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "musí byť " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "nesmie obsahovať viac než " + n + " prv"
        if (n == 1) {
          out += "ok"
        } else {
          out += "kov"
        }
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "nesmie byť dlhší než " + n + " znak"
        if (n != 1) {
          out += "ov"
        }
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "nesmie obsahovať viac než " + n + " polož"
        if (n >= 2 && n <= 4) {
          out += "ky"
        } else if (n != 1) {
          out += "iek"
        } else {
          out += "ka"
        }
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "musí byť " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "nesmie obsahovať menej než " + n + " prv"
        if (n == 1) {
          out += "ok"
        } else {
          out += "kov"
        }
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "nesmie byť kratší než " + n + " znak"
        if (n != 1) {
          out += "ov"
        }
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "nesmie obsahovať menej než " + n + " polož"
        if (n >= 2 && n <= 4) {
          out += "ky"
        } else if (n != 1) {
          out += "iek"
        } else {
          out += "ka"
        }
        break
      case "multipleOf":
        out = "musí byť násobkom " + e.params.multipleOf
        break
      case "not":
        out = 'nesmie splňovať schému v "not"'
        break
      case "oneOf":
        out = 'musí splňovať práve jednu schému v "oneOf"'
        break
      case "pattern":
        out = 'musí splňovať regulárny výraz "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'musí obsahovať položku splňjúcu regulárny výraz "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "názov položky nezodpovedá schéme"
        break
      case "required":
        out = "musí obsahovať požadovanú položku " + e.params.missingProperty
        break
      case "type":
        out = "musí byť " + e.params.type
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
          "nesmie obsahovať duplicitné prvky (prvky ## " +
          e.params.j +
          " a " +
          e.params.i +
          " sú rovnaké)"
        break
      default:
        out = 'musí splniť "' + e.keyword + '" validáciu'
    }
    e.message = out
  }
}
