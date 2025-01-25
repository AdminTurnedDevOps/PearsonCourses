"use strict"
module.exports = function localize_nb(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'tag "' + e.params.tag + '" must be string'
            break
          case "mapping":
            out = 'value of tag "' + e.params.tag + '" must be in mapping'
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "må være "
            if (t == "number") {
              out += "et tall"
            } else if (t == "integer") {
              out += "et heltall"
            } else if (t == "string") {
              out += "en streng"
            } else if (t == "boolean") {
              out += "ja eller nei"
            } else {
              out += t
            }
            out += n
        }
        break
      case "enum":
        out = "må være lik en av de forhåndsdefinerte verdiene"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "kan ikke ha flere egenskaper"
            break
          case "missing":
            out = "må ha den påkrevde egenskapen " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "må være "
            if (t == "number") {
              out += "et tall"
            } else if (t == "integer") {
              out += "et heltall"
            } else if (t == "string") {
              out += "en streng"
            } else if (t == "boolean") {
              out += "ja eller nei"
            } else {
              out += t
            }
            out += n
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "må være "
        if (t == "number") {
          out += "et tall"
        } else if (t == "integer") {
          out += "et heltall"
        } else if (t == "string") {
          out += "en streng"
        } else if (t == "boolean") {
          out += "ja eller nei"
        } else {
          out += t
        }
        out += n
        break
      case "union":
        out = 'må samsvare med et schema i "union"'
        break
      default:
        out = "må samsvare med valideringen for " + e.keyword
    }
    e.message = out
  }
}
