"use strict"
module.exports = function localize_zh(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = '标签 "' + e.params.tag + '" 的类型必须为字符串'
            break
          case "mapping":
            out = '标签 "' + e.params.tag + '" 的值必须在 mapping 之中'
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "应当是 " + (t + n) + " 类型"
        }
        break
      case "enum":
        out = "应当是预设定的枚举值之一"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "不允许有额外的属性"
            break
          case "missing":
            out = "应当有必需属性 " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
            out += "应当是 " + (t + n) + " 类型"
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
        out += "应当是 " + (t + n) + " 类型"
        break
      case "union":
        out = "数据应为 union 所指定的其中一个"
        break
      default:
        out = '应当通过 "' + e.keyword + ' 关键词校验"'
    }
    e.message = out
  }
}
