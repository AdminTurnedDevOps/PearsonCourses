"use strict"
module.exports = function localize_th(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'tag "' + e.params.tag + '" ต้องเป็น string'
            break
          case "mapping":
            out = 'ต้องมีค่าของ tag "' + e.params.tag + '" ใน mapping'
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "ต้องเป็น " + (t + n)
        }
        break
      case "enum":
        out = "ต้องตรงกับหนึ่งในค่าที่กำหนดไว้"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "ต้องไม่มี property อื่นๆ นอกเหนีอจากที่กำหนดไว้"
            break
          case "missing":
            out = "ต้องมี property " + e.params.missingProperty + " ด้วย"
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "ต้องเป็น " + (t + n)
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "ต้องเป็น " + (t + n)
        break
      case "union":
        out = 'ต้องตรงกับหนึ่งใน schema ที่กำหนดไว้ใน "union"'
        break
      default:
        out = 'ต้องผ่านคีย์เวิร์ด "' + e.keyword + '"'
    }
    e.message = out
  }
}
