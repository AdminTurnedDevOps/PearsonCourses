"use strict"
module.exports = function localize_ru(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'поле "' + e.params.tag + '" должно быть строкой'
            break
          case "mapping":
            out =
              'значение поля "' +
              e.params.tag +
              '" должно быть ключом одной из схем'
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "должно быть " + (t + n)
        }
        break
      case "enum":
        out = "должно быть равно одному из разрешенных значений"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "не должно иметь дополнительных полей"
            break
          case "missing":
            out = "должно иметь обязательное поле " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "должно быть " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "должно быть " + (t + n)
        break
      case "union":
        out = 'должно соответствовать одной их схем в "union"'
        break
      default:
        out = 'должно соответствовать правилу "' + e.keyword + '"'
    }
    e.message = out
  }
}
