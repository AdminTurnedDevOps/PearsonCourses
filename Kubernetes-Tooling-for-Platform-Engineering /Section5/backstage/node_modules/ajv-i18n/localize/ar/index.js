"use strict"
module.exports = function localize_ar(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += " يجب أن لا يحوي أكثر من " + n + " عنصر"
        break
      case "additionalProperties":
        out = "يجب أن لا يحوي خصائص إضافية"
        break
      case "anyOf":
        out = 'يجب أن يوافق أحد المخططات الموجودة في "anyOf"'
        break
      case "const":
        out = "يجب أن يكون ثابتاً"
        break
      case "contains":
        out = "يجب أن يحوي عنصرا صحيح"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out +=
          " يجب أن يحوي الخصائص " +
          e.params.deps +
          " عندما تكون الخاصية " +
          e.params.property +
          " موجودة"
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
            out = 'يجب أن تمرر كلمة التحقق المفتاحية "' + e.keyword + '"'
        }
        break
      case "enum":
        out = "قيمة هذا الحقل يجب أن تكون مساوية لأحد القيم المعرفة مسبقاً"
        break
      case "false schema":
        out = "المخطط المنطقي غير صحيح"
        break
      case "format":
        out = 'يجب أن يوافق الصيغة "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += " يجب أن يكون " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += " يجب أن يكون " + cond
        break
      case "if":
        out = 'يجب أن توافق المخطط "' + e.params.failingKeyword + '"'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += " يجب أن يكون " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += " يجب أن لا يحوي أكثر من " + n + " عنصر"
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += " يجب أن لا يحوي أكثر من " + n + " محرف"
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += " يجب أن لا يحوي أكثر من " + n + " خصائص"
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += " يجب أن يكون " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += " يجب أن لا يحوي أقل من " + n + " عنصر"
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += " يجب أن لا يحوي أقل من " + n + " محرف"
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += " يجب أن لا يحوي أقل من " + n + " خصائص"
        break
      case "multipleOf":
        out = " يجب أن يحوي أكثر من " + e.params.multipleOf
        break
      case "not":
        out = 'يجب أن يكون غير صحيح وفقاً للمخطط "not"'
        break
      case "oneOf":
        out = 'يجب أن يوافق مخطط واحد فقط موجود في "oneOf"'
        break
      case "pattern":
        out = 'يجب أن يوافق النمط "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out = 'يجب أن يحوي خاصية توافق النمط "' + e.params.missingPattern + '"'
        break
      case "propertyNames":
        out = "اسم الخاصية غير صالح"
        break
      case "required":
        out = "هذا الحقل إلزامي"
        break
      case "type":
        out = "قيمة هذا الحقل غير صالحة"
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
          "يجب أن لا يحوي عناصر مكررة (العنصر ## " +
          e.params.j +
          " و " +
          e.params.i +
          " متطابقة)"
        break
      default:
        out = 'يجب أن تمرر كلمة التحقق المفتاحية "' + e.keyword + '"'
    }
    e.message = out
  }
}
