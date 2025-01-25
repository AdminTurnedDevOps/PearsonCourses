"use strict"
module.exports = function localize_id(errors) {
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
            out += "harus berupa " + (t + n)
        }
        break
      case "enum":
        out = "harus sama dengan salah satu dari nilai yang telah ditentukan"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "tidak boleh memiliki properti tambahan"
            break
          case "missing":
            out = "harus memiliki properti " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "harus berupa " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "harus berupa " + (t + n)
        break
      case "union":
        out = 'harus cocok dengan beberapa skema pada "union"'
        break
      default:
        out = 'harus lulus validasi kata kunci "' + e.keyword + '"'
    }
    e.message = out
  }
}
