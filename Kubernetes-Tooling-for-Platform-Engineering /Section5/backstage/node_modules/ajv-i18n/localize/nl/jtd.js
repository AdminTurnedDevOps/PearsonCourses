"use strict"
module.exports = function localize_nl(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'tag "' + e.params.tag + '" moet een tekenreeks zijn'
            break
          case "mapping":
            out =
              'de waarde van het veld "' +
              e.params.tag +
              '" moet voorkomen in de mapping'
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
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
            out += n + " (" + t + ") bevatten"
        }
        break
      case "enum":
        out = "moet overeenkomen met één van de voorgedefinieerde waarden"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "mag geen extra eigenschappen bevatten"
            break
          case "missing":
            out = "moet de eigenschap " + e.params.missingProperty + " bevatten"
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
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
            out += n + " (" + t + ") bevatten"
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
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
        out += n + " (" + t + ") bevatten"
        break
      case "union":
        out = 'moet overeenkomen met een schema in "union"'
        break
      default:
        out = 'moet sleutelwoord validatie "' + e.keyword + '" doorstaan'
    }
    e.message = out
  }
}
