"use strict"
module.exports = function localize_cs(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "nemůže mít víc, než " + n + " prv"
        if (n >= 2 && n <= 4) {
          out += "ky"
        } else if (n != 1) {
          out += "ek"
        } else {
          out += "ků"
        }
        break
      case "additionalProperties":
        out = "nemůže mít další položky"
        break
      case "anyOf":
        out = 'musí vyhovět alespoň jednomu schématu v "anyOf"'
        break
      case "const":
        out = "musí být roven konstantě"
        break
      case "contains":
        out = "musí obsahovat prvek odpovídající schématu"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "musí mít polož"
        if (n >= 2 && n <= 4) {
          out += "ky"
        } else if (n != 1) {
          out += "ek"
        } else {
          out += "ka"
        }
        out += ": " + e.params.deps + ", pokud obsahuje " + e.params.property
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
            out = 'musí vyhovět "' + e.keyword + '" validaci'
        }
        break
      case "enum":
        out = "musí být rovno jedné hodnotě z výčtu"
        break
      case "false schema":
        out = "schéma je false"
        break
      case "format":
        out = 'musí být ve formátu "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "musí být " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "musí být " + cond
        break
      case "if":
        out = 'musí vyhovět "' + e.params.failingKeyword + '" schématu'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "musí být " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "nesmí obsahovat víc než " + n + " prv"
        if (n >= 2 && n <= 4) {
          out += "ky"
        } else if (n != 1) {
          out += "ek"
        } else {
          out += "ků"
        }
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "nesmí být delší než " + n + " zna"
        if (n >= 2 && n <= 4) {
          out += "ky"
        } else if (n != 1) {
          out += "k"
        } else {
          out += "ků"
        }
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "nesmí mít víc než " + n + " polož"
        if (n >= 2 && n <= 4) {
          out += "ky"
        } else if (n != 1) {
          out += "ek"
        } else {
          out += "ka"
        }
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "musí být " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "nesmí obsahovat méně než " + n + " prv"
        if (n >= 2 && n <= 4) {
          out += "ky"
        } else if (n != 1) {
          out += "ek"
        } else {
          out += "ků"
        }
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "nesmí být kratší než " + n + " zna"
        if (n >= 2 && n <= 4) {
          out += "ky"
        } else if (n != 1) {
          out += "k"
        } else {
          out += "ků"
        }
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "nesmí mít méně než " + n + " polož"
        if (n >= 2 && n <= 4) {
          out += "ky"
        } else if (n != 1) {
          out += "ek"
        } else {
          out += "ka"
        }
        break
      case "multipleOf":
        out = "musí být násobkem " + e.params.multipleOf
        break
      case "not":
        out = 'nesmí vyhovět schématu v "not"'
        break
      case "oneOf":
        out = 'musí vyhovět právě jednomu schématu v "oneOf"'
        break
      case "pattern":
        out = 'musí vyhovět regulárnímu výrazu "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'musí obsahovat položku vyhovující regulárnímu výrazu "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "název položky není platný"
        break
      case "required":
        out = "musí obsahovat požadovanou položku " + e.params.missingProperty
        break
      case "type":
        out = "musí být " + e.params.type
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
          "nesmí obsahovat duplicitní prvky (prvky ## " +
          e.params.j +
          " a " +
          e.params.i +
          " jsou identické)"
        break
      default:
        out = 'musí vyhovět "' + e.keyword + '" validaci'
    }
    e.message = out
  }
}
