"use strict"
module.exports = function localize_zh_TW(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "不可以超過" + n + "個元素"
        break
      case "additionalProperties":
        out = "不可以有額外的屬性"
        break
      case "anyOf":
        out = "不符合 anyOf 指定的模式"
        break
      case "const":
        out = "應該等於常數"
        break
      case "contains":
        out = "應該包含一個有效元素"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "應該要有屬性" + e.params.property + "的依賴屬性" + e.params.deps
        break
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = '標籤 "' + e.params.tag + '" 的類型必須是字串'
            break
          case "mapping":
            out = '標籤 "' + e.params.tag + '" 必須在 oneOf 其中之一'
            break
          default:
            out = '應該通過 "' + e.keyword + ' 關鍵詞檢驗"'
        }
        break
      case "enum":
        out = "應該要在預設的值之中"
        break
      case "false schema":
        out = "布林模式不正確"
        break
      case "format":
        out = "應該要符合" + e.params.format + "格式"
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "應該是 " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "應該是 " + cond
        break
      case "if":
        out = '應該符合 "' + e.params.failingKeyword + '" schema'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "應該要 " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "不應該多於 " + n + " 個"
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "不應該多於 " + n + " 個字元"
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "不應該多於 " + n + " 個屬性"
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "應該要 " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "不應該少於 " + n + " 個"
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "不應該少於 " + n + " 個字元"
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "不應該少於 " + n + " 個屬性"
        break
      case "multipleOf":
        out = "應該是 " + e.params.multipleOf + " 的整數倍"
        break
      case "not":
        out = '不應該符合 "not" schema'
        break
      case "oneOf":
        out = '只能符合一個 "oneOf" 中的 schema'
        break
      case "pattern":
        out = '應該符合模式 "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out = "應該有屬性對應模式 " + e.params.missingPattern
        break
      case "propertyNames":
        out = "属性名 無效"
        break
      case "required":
        out = "應該有必須屬性 " + e.params.missingProperty
        break
      case "type":
        out = "應該是 " + e.params.type + " 類型"
        break
      case "unevaluatedItems":
        out = ""
        var n = e.params.len
        out += " 的元素不可以超過 " + n + " 個"
        break
      case "unevaluatedProperties":
        out = "不應該有未驗證的屬性"
        break
      case "uniqueItems":
        out =
          "不應該有重複項目 (第 " +
          e.params.j +
          " 項和第 " +
          e.params.i +
          " 項是重複的)"
        break
      default:
        out = '應該通過 "' + e.keyword + ' 關鍵詞檢驗"'
    }
    e.message = out
  }
}
