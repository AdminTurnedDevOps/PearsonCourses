"use strict"
module.exports = function localize_sv(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "borde ha fler än " + n + " sak"
        if (n != 1) {
          out += "er"
        }
        break
      case "additionalProperties":
        out = "borde inte ha fler egenskaper"
        break
      case "anyOf":
        out = 'borde matcha något schema i "anyOf"'
        break
      case "const":
        out = "bör vara en konstant"
        break
      case "contains":
        out = "bör innehålla ett giltigt objekt"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "borde ha egenskap"
        if (n != 1) {
          out += "er"
        }
        out +=
          " " +
          e.params.deps +
          " när egenskap " +
          e.params.property +
          " finns tillgängligt"
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
            out = 'bör passera "' + e.keyword + '" nyckelord validering'
        }
        break
      case "enum":
        out = "borde vara ekvivalent med en av dess fördefinierade värden"
        break
      case "false schema":
        out = "boolean schema är falskt"
        break
      case "format":
        out = 'borde matcha formatet "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "bör vara " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "bör vara " + cond
        break
      case "if":
        out = 'must match "' + e.params.failingKeyword + '" schema'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "borde vara " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "borde inte ha fler än " + n + " sak"
        if (n != 1) {
          out += "er"
        }
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "borde inte vara längre än " + n + " tecken"
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "borde inte ha fler än " + n + " egenskap"
        if (n != 1) {
          out += "er"
        }
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "borde vara " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "borde inte ha färre än " + n + " sak"
        if (n != 1) {
          out += "er"
        }
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "borde inte vara kortare än " + n + " tecken"
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "borde inte ha färre än " + n + " egenskap"
        if (n != 1) {
          out += "er"
        }
        break
      case "multipleOf":
        out = "borde vara en multipel av " + e.params.multipleOf
        break
      case "not":
        out = 'borde inte vara giltigt enligt schema i "not"'
        break
      case "oneOf":
        out = 'borde matcha exakt ett schema i "oneOf"'
        break
      case "pattern":
        out = 'borde matcha mönstret "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'bör ha en egenskap som matchar mönstret "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "egenskap med namnet är inte giltig"
        break
      case "required":
        out = "borde ha den nödvändiga egenskapen " + e.params.missingProperty
        break
      case "type":
        out = "borde vara " + e.params.type
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
          "borde inte ha duplicerade saker (sakerna ## " +
          e.params.j +
          " och " +
          e.params.i +
          " är identiska)"
        break
      default:
        out = 'bör passera "' + e.keyword + '" nyckelord validering'
    }
    e.message = out
  }
}
