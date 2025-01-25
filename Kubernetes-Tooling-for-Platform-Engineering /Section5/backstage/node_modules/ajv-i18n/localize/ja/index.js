"use strict"
module.exports = function localize_ja(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "は" + n + "以上あってはいけない"
        break
      case "additionalProperties":
        out = "追加してはいけない"
        break
      case "anyOf":
        out = '"anyOf"のスキーマとマッチしなくてはいけない'
        break
      case "const":
        out = "must be equal to constant"
        break
      case "contains":
        out = "must contain a valid item"
        break
      case "dependencies":
      case "dependentRequired":
        out = "" + e.params.property + "がある場合、"
        var n = e.params.depsCount
        out += "は" + e.params.deps + "をつけなければいけない"
        break
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'tag "' + e.params.tag + '" must be string'
            break
          case "mapping":
            out = 'value of tag "' + e.params.tag + '" must be in oneOf'
            break
          default:
            out = 'must pass "' + e.keyword + '" keyword validation'
        }
        break
      case "enum":
        out = "事前に定義された値のいずれかに等しくなければいけない"
        break
      case "false schema":
        out = "boolean schema is false"
        break
      case "format":
        out = '"' + e.params.format + '"形式に揃えなければいけない'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "must be " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "must be " + cond
        break
      case "if":
        out = 'must match "' + e.params.failingKeyword + '" schema'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += cond + "でなければいけない"
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "は" + n + "個以上であってはいけない"
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "は" + n + "文字以上であってはいけない"
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "は" + n + "個以上のプロパティを有してはいけない"
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += cond + "でなければいけない"
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "は" + n + "個以下であってはいけない"
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "は" + n + "文字以下であってはいけない"
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "は" + n + "個以下のプロパティを有してはいけない"
        break
      case "multipleOf":
        out = "" + e.params.multipleOf + "の倍数でなければいけない"
        break
      case "not":
        out = '"not"のスキーマに従って有効としてはいけない'
        break
      case "oneOf":
        out = '"oneOf"のスキーマと完全に一致しなくてはいけない'
        break
      case "pattern":
        out = '"' + e.params.pattern + '"のパターンと一致しなければいけない'
        break
      case "patternRequired":
        out =
          'must have property matching pattern "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "property name is invalid"
        break
      case "required":
        out =
          "必要なプロパティ" + e.params.missingProperty + "がなければいけない"
        break
      case "type":
        out = "" + e.params.type + "でなければいけない"
        break
      case "unevaluatedItems":
        out = ""
        var n = e.params.len
        out += "must NOT have more than " + n + " item"
        if (n != 1) {
          out += "s"
        }
        break
      case "unevaluatedProperties":
        out = "must NOT have unevaluated properties"
        break
      case "uniqueItems":
        out =
          "重複するアイテムがあってはいけない（" +
          e.params.j +
          "と" +
          e.params.i +
          "は同じである）"
        break
      default:
        out = 'must pass "' + e.keyword + '" keyword validation'
    }
    e.message = out
  }
}
