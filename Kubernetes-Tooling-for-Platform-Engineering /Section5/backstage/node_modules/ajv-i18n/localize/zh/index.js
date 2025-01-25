"use strict"
module.exports = function localize_zh(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "不允许超过" + n + "个元素"
        break
      case "additionalProperties":
        out = "不允许有额外的属性"
        break
      case "anyOf":
        out = "数据应为 anyOf 所指定的其中一个"
        break
      case "const":
        out = "应当等于常量"
        break
      case "contains":
        out = "应当包含一个有效项"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "应当拥有属性" + e.params.property + "的依赖属性" + e.params.deps
        break
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = '标签 "' + e.params.tag + '" 的类型必须为字符串'
            break
          case "mapping":
            out = '标签 "' + e.params.tag + '" 的值必须在 oneOf 之中'
            break
          default:
            out = '应当通过 "' + e.keyword + ' 关键词校验"'
        }
        break
      case "enum":
        out = "应当是预设定的枚举值之一"
        break
      case "false schema":
        out = "布尔模式出错"
        break
      case "format":
        out = '应当匹配格式 "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "应当是 " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "应当是 " + cond
        break
      case "if":
        out = '应当匹配模式 "' + e.params.failingKeyword + '" '
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "应当为 " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "不应多于 " + n + " 个项"
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "不应多于 " + n + " 个字符"
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "不应有多于 " + n + " 个属性"
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "应当为 " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "不应少于 " + n + " 个项"
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "不应少于 " + n + " 个字符"
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "不应有少于 " + n + " 个属性"
        break
      case "multipleOf":
        out = "应当是 " + e.params.multipleOf + " 的整数倍"
        break
      case "not":
        out = '不应当匹配 "not" schema'
        break
      case "oneOf":
        out = '只能匹配一个 "oneOf" 中的 schema'
        break
      case "pattern":
        out = '应当匹配模式 "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out = "应当有属性匹配模式 " + e.params.missingPattern
        break
      case "propertyNames":
        out = "属性名 无效"
        break
      case "required":
        out = "应当有必需属性 " + e.params.missingProperty
        break
      case "type":
        out = "应当是 " + e.params.type + " 类型"
        break
      case "unevaluatedItems":
        out = ""
        var n = e.params.len
        out += " 不允许有超过 " + n + " 个元素"
        break
      case "unevaluatedProperties":
        out = "不允许存在未求值的属性"
        break
      case "uniqueItems":
        out =
          "不应当含有重复项 (第 " +
          e.params.j +
          " 项与第 " +
          e.params.i +
          " 项是重复的)"
        break
      default:
        out = '应当通过 "' + e.keyword + ' 关键词校验"'
    }
    e.message = out
  }
}
