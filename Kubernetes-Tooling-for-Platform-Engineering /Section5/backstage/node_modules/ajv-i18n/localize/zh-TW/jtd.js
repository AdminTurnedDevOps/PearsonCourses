"use strict"
module.exports = function localize_zh_TW(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = '標籤 "' + e.params.tag + '" 的類型必須是字串'
            break
          case "mapping":
            out = '標籤 "' + e.params.tag + '" 必須在 mapping 其中之一'
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "應該是 " + (t + n) + " 類型"
        }
        break
      case "enum":
        out = "應該要在預設的值之中"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "不可以有額外的屬性"
            break
          case "missing":
            out = "應該有必須屬性 " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "應該是 " + (t + n) + " 類型"
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "應該是 " + (t + n) + " 類型"
        break
      case "union":
        out = "不符合 union 指定的模式"
        break
      default:
        out = '應該通過 "' + e.keyword + ' 關鍵詞檢驗"'
    }
    e.message = out
  }
}
