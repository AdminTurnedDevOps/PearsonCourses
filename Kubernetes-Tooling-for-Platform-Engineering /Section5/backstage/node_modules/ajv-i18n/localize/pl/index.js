"use strict"
module.exports = function localize_pl(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "nie powinien mieć więcej niż " + n + " element"
        if (n == 1) {
          out += "u"
        } else {
          out += "ów"
        }
        break
      case "additionalProperties":
        out = "nie powinien zawierać dodatkowych pól"
        break
      case "anyOf":
        out = 'powinien pasować do wzoru z sekcji "anyOf"'
        break
      case "const":
        out = "powinien być równy stałej"
        break
      case "contains":
        out = "must contain a valid item"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "powinien zawierać pol"
        if (n == 1) {
          out += "e"
        } else {
          out += "a"
        }
        out +=
          " " +
          e.params.deps +
          " kiedy pole " +
          e.params.property +
          " jest obecne"
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
            out = 'powinien przejść walidację "' + e.keyword + '"'
        }
        break
      case "enum":
        out = "powinien być równy jednej z predefiniowanych wartości"
        break
      case "false schema":
        out = "boolean schema is false"
        break
      case "format":
        out = 'powinien zgadzać się z formatem "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "powinien być " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "powinien być " + cond
        break
      case "if":
        out = 'must match "' + e.params.failingKeyword + '" schema'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "powinien być " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "nie powinien mieć więcej niż " + n + " element"
        if (n == 1) {
          out += "u"
        } else {
          out += "ów"
        }
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "nie powinien być dłuższy niż " + n + " znak"
        if (n != 1) {
          out += "ów"
        }
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "nie powinien zawierać więcej niż " + n + " "
        if (n == 1) {
          out += "pole"
        } else {
          out += "pól"
        }
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "powinien być " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "nie powinien mieć mniej niż " + n + " element"
        if (n == 1) {
          out += "u"
        } else {
          out += "ów"
        }
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "nie powinien być krótszy niż " + n + " znak"
        if (n != 1) {
          out += "ów"
        }
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "nie powinien zawierać mniej niż " + n + " "
        if (n == 1) {
          out += "pole"
        } else {
          out += "pól"
        }
        break
      case "multipleOf":
        out = "powinien być wielokrotnością " + e.params.multipleOf
        break
      case "not":
        out = 'nie powinien pasować do wzoru z sekcji "not"'
        break
      case "oneOf":
        out = 'powinien pasować do jednego wzoru z sekcji "oneOf"'
        break
      case "pattern":
        out = 'powinien zgadzać się ze wzorem "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'powinien mieć pole pasujące do wzorca "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "property name is invalid"
        break
      case "required":
        out = "powinien zawierać wymagane pole " + e.params.missingProperty
        break
      case "type":
        out = "powinien być " + e.params.type
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
          "nie powinien zawierać elementów które się powtarzają (elementy " +
          e.params.j +
          " i " +
          e.params.i +
          " są identyczne)"
        break
      default:
        out = 'powinien przejść walidację "' + e.keyword + '"'
    }
    e.message = out
  }
}
