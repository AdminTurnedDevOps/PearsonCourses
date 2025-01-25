"use strict"
module.exports = function localize_hu(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "nem lehet több, mint " + n + " eleme"
        break
      case "additionalProperties":
        out = "nem lehetnek további elemei"
        break
      case "anyOf":
        out = 'meg kell feleljen legalább egy "anyOf" alaknak'
        break
      case "const":
        out = "must be equal to constant"
        break
      case "contains":
        out = "must contain a valid item"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "-nak kell legyen"
        if (n > 1) {
          out += "ek"
        }
        out += " a következő tulajdonsága"
        if (n != 1) {
          out += "i"
        }
        out +=
          ": " +
          e.params.deps +
          ", ha van " +
          e.params.property +
          " tulajdonsága"
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
            out = 'must pass "' + e.keyword + '" keyword validation'
        }
        break
      case "enum":
        out = "egyenlő kell legyen valamely előre meghatározott értékkel"
        break
      case "false schema":
        out = "boolean schema is false"
        break
      case "format":
        out =
          'meg kell feleljen a következő formátumnak: "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "must be " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "must be " + cond
        break
      case "if":
        out = 'must match "' + e.params.failingKeyword + '" schema'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "kell legyen " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "nem lehet több, mint " + n + " eleme"
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "nem lehet hosszabb, mint " + n + " szimbólum"
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "nem lehet több, mint " + n + " tulajdonsága"
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "kell legyen " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "nem lehet kevesebb, mint " + n + " eleme"
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "nem lehet rövidebb, mint " + n + " szimbólum"
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "nem lehet kevesebb, mint " + n + " tulajdonsága"
        break
      case "multipleOf":
        out =
          "a többszöröse kell legyen a következő számnak: " +
          e.params.multipleOf
        break
      case "not":
        out = 'nem lehet érvényes a "not" alaknak megfelelően'
        break
      case "oneOf":
        out = 'meg kell feleljen pontosan egy "oneOf" alaknak'
        break
      case "pattern":
        out =
          'meg kell feleljen a következő mintának: "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'must have property matching pattern "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "property name is invalid"
        break
      case "required":
        out = "kell legyen " + e.params.missingProperty + " tulajdonsága"
        break
      case "type":
        out = "" + e.params.type + " kell legyen"
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
          "nem lehetnek azonos elemei (" +
          e.params.j +
          " és " +
          e.params.i +
          " elemek azonosak)"
        break
      default:
        out = 'must pass "' + e.keyword + '" keyword validation'
    }
    e.message = out
  }
}
