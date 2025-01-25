"use strict"
module.exports = function localize_ko(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += " 항목은 아이템을 " + n + "개 이상 가질 수 없습니다"
        break
      case "additionalProperties":
        out = "추가적인 속성은 허용되지 않습니다"
        break
      case "anyOf":
        out = '"anyOf"의 스키마와 일치해야 합니다'
        break
      case "const":
        out = "상수와 같아야합니다"
        break
      case "contains":
        out = "올바른 아이템을 포함해야 합니다"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out +=
          e.params.property +
          "속성이 있는 경우, " +
          e.params.deps +
          " 속성이 있어야합니다"
        break
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = '"' + e.params.tag + '"태그는 반드시 문자열이여야 합니다'
            break
          case "mapping":
            out =
              '"' + e.params.tag + '"태그의 값은 반드시 oneOf에 있어야 합니다'
            break
          default:
            out = '"' + e.keyword + '"키워드 검사를 통과해야 합니다'
        }
        break
      case "enum":
        out = "미리 정의된 값중 하나여야 합니다"
        break
      case "false schema":
        out = "boolean 스키마는 올바르지 않습니다"
        break
      case "format":
        out = '"' + e.params.format + '" 포맷과 일치해야 합니다'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += " " + cond + " 이여야 합니다"
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += " " + cond + " 이여야 합니다"
        break
      case "if":
        out = '"' + e.params.failingKeyword + '" 스키마와 일치해야 합니다'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += " " + cond + " 이여야 합니다"
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "아이템이 최대 " + n + "개이여야 합니다"
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "최대 " + n + "글자여야 합니다"
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "속성은 최대 " + n + "개 이내여야 합니다"
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += " " + cond + " 이여야 합니다"
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "아이템이 최소 " + n + "개이여야 합니다"
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "최소 " + n + "글자여야 합니다"
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "속성은 최소 " + n + "개 이상이여야 합니다"
        break
      case "multipleOf":
        out = "" + e.params.multipleOf + "의 배수여야 합니다"
        break
      case "not":
        out = '"not"스키마에 따라 유효하지 않아야 합니다'
        break
      case "oneOf":
        out = '"oneOf" 스키마중 하나와 정확하게 일치해야 합니다'
        break
      case "pattern":
        out = '"' + e.params.pattern + '"패턴과 일치해야 합니다'
        break
      case "patternRequired":
        out =
          '"' +
          e.params.missingPattern +
          '"패턴과 일치하는 속성을 가져야 합니다'
        break
      case "propertyNames":
        out = "속성명이 올바르지 않습니다"
        break
      case "required":
        out = "" + e.params.missingProperty + " 속성은 필수입니다"
        break
      case "type":
        out = "" + e.params.type + "이여야 합니다"
        break
      case "unevaluatedItems":
        out = ""
        var n = e.params.len
        out += "항목이 " + n + "개 아이템을 초과하면 안됩니다"
        break
      case "unevaluatedProperties":
        out = "평가되지 않은 속성이 없어야합니다."
        break
      case "uniqueItems":
        out =
          "중복 아이템이 없어야 합니다 (아이템" +
          e.params.j +
          "과 아이템" +
          e.params.i +
          "가 동일합니다)"
        break
      default:
        out = '"' + e.keyword + '"키워드 검사를 통과해야 합니다'
    }
    e.message = out
  }
}
