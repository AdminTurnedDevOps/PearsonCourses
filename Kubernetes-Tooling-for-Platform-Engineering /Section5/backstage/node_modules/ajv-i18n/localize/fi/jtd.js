"use strict"
module.exports = function localize_fi(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'tunniste "' + e.params.tag + '" täytyy olla merkkijono'
            break
          case "mapping":
            out =
              'tunnisteen arvon "' + e.params.tag + '" on oltava kartoituksessa'
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "täytyy olla " + (t + n)
        }
        break
      case "enum":
        out = "täytyy olla yhtä kuin jokin sallituista arvoista"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "ei saa sisältää ylimääräisiä ominaisuuksia"
            break
          case "missing":
            out = "täytyy sisältää ominaisuus " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "täytyy olla " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "täytyy olla " + (t + n)
        break
      case "union":
        out = 'täytyy vastata "union" skeemaa'
        break
      default:
        out = 'täytyy läpäistä "' + e.keyword + '" avainsanatarkistus'
    }
    e.message = out
  }
}
