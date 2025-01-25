"use strict"
module.exports = function localize_de(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'der Tag "' + e.params.tag + '" muss eine Zeichenkette sein'
            break
          case "mapping":
            out =
              'der Wert vom Tag "' +
              e.params.tag +
              '" muss im Mapping enthalten sein'
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "muss sein: " + (t + n)
        }
        break
      case "enum":
        out = "muss einem der vorgegebenen Werte entsprechen"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "darf keine zusätzlichen Attribute haben"
            break
          case "missing":
            out =
              "muss das erforderliche Attribut " +
              e.params.missingProperty +
              " enthalten"
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "muss sein: " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "muss sein: " + (t + n)
        break
      case "union":
        out = 'muss einem der Schemata in "union" entsprechen'
        break
      default:
        out = 'muss die Validierung "' + e.keyword + '" bestehen'
    }
    e.message = out
  }
}
