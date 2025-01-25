"use strict"
module.exports = function localize_de(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "darf nicht mehr als " + n + " Element"
        if (n != 1) {
          out += "e"
        }
        out += " enthalten"
        break
      case "additionalProperties":
        out = "darf keine zusätzlichen Attribute haben"
        break
      case "anyOf":
        out = 'muss einem der Schemata in "anyOf" entsprechen'
        break
      case "const":
        out = "muss gleich der Konstanten sein"
        break
      case "contains":
        out = "muss ein valides Element enthalten"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "muss Attribut"
        if (n != 1) {
          out += "e"
        }
        out +=
          " " +
          e.params.deps +
          " aufweisen, wenn Attribut " +
          e.params.property +
          " gesetzt ist"
        break
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'der Tag "' + e.params.tag + '" muss eine Zeichenkette sein'
            break
          case "mapping":
            out =
              'der Wert vom Tag "' +
              e.params.tag +
              '" muss im oneOf enthalten sein'
            break
          default:
            out = 'muss die Validierung "' + e.keyword + '" bestehen'
        }
        break
      case "enum":
        out = "muss einem der vorgegebenen Werte entsprechen"
        break
      case "false schema":
        out = "boolesches Schema ist falsch"
        break
      case "format":
        out = 'muss diesem Format entsprechen: "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "muss " + cond + " sein"
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "muss " + cond + " sein"
        break
      case "if":
        out = 'muss dem Schema "' + e.params.failingKeyword + '" entsprechen'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "muss " + cond + " sein"
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "darf nicht mehr als " + n + " Element"
        if (n != 1) {
          out += "e"
        }
        out += " haben"
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "darf nicht länger als " + n + " Zeichen sein"
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "darf nicht mehr als " + n + " Attribut"
        if (n != 1) {
          out += "e"
        }
        out += " haben"
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "muss " + cond + " sein"
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "darf nicht weniger als " + n + " Element"
        if (n != 1) {
          out += "e"
        }
        out += " haben"
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "darf nicht kürzer als " + n + " Zeichen sein"
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "darf nicht weniger als " + n + " Attribut"
        if (n != 1) {
          out += "e"
        }
        out += " haben"
        break
      case "multipleOf":
        out = "muss ein Vielfaches von " + e.params.multipleOf + " sein"
        break
      case "not":
        out = 'muss dem in "not" angegebenen Schema widersprechen'
        break
      case "oneOf":
        out = 'muss genau einem der Schemata in "oneOf" entsprechen'
        break
      case "pattern":
        out = 'muss diesem Muster entsprechen: "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'muss ein Attribut nach folgendem Muster haben "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "Attributname ist ungültig"
        break
      case "required":
        out =
          "muss das erforderliche Attribut " +
          e.params.missingProperty +
          " enthalten"
        break
      case "type":
        out = "muss sein: " + e.params.type
        break
      case "unevaluatedItems":
        out = ""
        var n = e.params.len
        out += "darf nicht mehr als " + n + " Element"
        if (n != 1) {
          out += "e"
        }
        out += " haben"
        break
      case "unevaluatedProperties":
        out = "darf keine unausgewerteten Attribute haben"
        break
      case "uniqueItems":
        out =
          "darf keine Duplikate enthalten (Elemente #" +
          e.params.j +
          " und #" +
          e.params.i +
          " sind gleich)"
        break
      default:
        out = 'muss die Validierung "' + e.keyword + '" bestehen'
    }
    e.message = out
  }
}
