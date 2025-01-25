"use strict"
module.exports = function localize_nl(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "mag niet meer dan " + n + " item"
        if (n != 1) {
          out += "s"
        }
        out += " bevatten"
        break
      case "additionalProperties":
        out = "mag geen extra eigenschappen bevatten"
        break
      case "anyOf":
        out = 'moet overeenkomen met een schema in "anyOf"'
        break
      case "const":
        out = "moet gelijk zijn aan constante"
        break
      case "contains":
        out = "moet een geldig item bevatten"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "moet de eigenschap"
        if (n != 1) {
          out += "pen"
        }
        out +=
          " " +
          e.params.deps +
          " bevatten als " +
          e.params.property +
          " is gedefinieerd"
        break
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'tag "' + e.params.tag + '" moet een tekenreeks zijn'
            break
          case "mapping":
            out =
              'de waarde van het veld "' +
              e.params.tag +
              '" moet voorkomen in de oneOf'
            break
          default:
            out = 'moet sleutelwoord validatie "' + e.keyword + '" doorstaan'
        }
        break
      case "enum":
        out = "moet overeenkomen met één van de voorgedefinieerde waarden"
        break
      case "false schema":
        out = "boolean schema is fout"
        break
      case "format":
        out =
          'moet overeenkomen met het volgende formaat: "' +
          e.params.format +
          '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "moet " + cond + " zijn"
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "moet " + cond + " zijn"
        break
      case "if":
        out = 'moet overeenkomen met "' + e.params.failingKeyword + '" schema'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "moet " + cond + " zijn"
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "mag niet meer dan " + n + " item"
        if (n != 1) {
          out += "s"
        }
        out += " bevatten"
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "mag niet langer dan " + n + " karakter"
        if (n != 1) {
          out += "s"
        }
        out += " zijn"
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "mag niet meer dan " + n + " eigenschap"
        if (n != 1) {
          out += "pen"
        }
        out += " bevatten"
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "moet " + cond + " zijn"
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "mag niet minder dan " + n + " item"
        if (n != 1) {
          out += "s"
        }
        out += " bevatten"
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "mag niet korter dan " + n + " karakter"
        if (n != 1) {
          out += "s"
        }
        out += " zijn"
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "mag niet minder dan " + n + " eigenschap"
        if (n != 1) {
          out += "pen"
        }
        out += " bevatten"
        break
      case "multipleOf":
        out = "moet een veelvoud van " + e.params.multipleOf + " zijn"
        break
      case "not":
        out = 'mag niet overeenkomen met een schema in "not"'
        break
      case "oneOf":
        out = 'moet overeenkomen met één schema in "oneOf"'
        break
      case "pattern":
        out =
          'moet overeenkomen met het volgende patroon: "' +
          e.params.pattern +
          '"'
        break
      case "patternRequired":
        out =
          'moet een eigenschap bevatten die overeenkomt met het pattroon: "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "eigenschapnaam is ongeldig"
        break
      case "required":
        out = "moet de eigenschap " + e.params.missingProperty + " bevatten"
        break
      case "type":
        out = ""
        var t = e.params.type
        out += "moet een "
        if (t == "number") {
          out += "nummer"
        } else if (t == "integer") {
          out += "geheel getal"
        } else if (t == "string") {
          out += "tekenreeks"
        } else if (t == "boolean") {
          out += "ja of nee waarde"
        }
        out += " (" + t + ") bevatten"
        break
      case "unevaluatedItems":
        out = ""
        var n = e.params.len
        out += "mag niet meer dan " + n + " item"
        if (n != 1) {
          out += "s"
        }
        out += " bevatten"
        break
      case "unevaluatedProperties":
        out = "mag geen ongecontroleerde eigenschappen bevatten"
        break
      case "uniqueItems":
        out =
          "mag geen gedupliceerde items bevatten (items ## " +
          e.params.j +
          " en " +
          e.params.i +
          " zijn identiek)"
        break
      default:
        out = 'moet sleutelwoord validatie "' + e.keyword + '" doorstaan'
    }
    e.message = out
  }
}
