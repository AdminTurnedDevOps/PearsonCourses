"use strict"
module.exports = function localize_th(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "ต้องมีสมาชิกไม่เกิน " + n + " ตัว"
        break
      case "additionalProperties":
        out = "ต้องไม่มี property อื่นๆ นอกเหนีอจากที่กำหนดไว้"
        break
      case "anyOf":
        out = 'ต้องตรงกับหนึ่งใน schema ที่กำหนดไว้ใน "anyOf"'
        break
      case "const":
        out = "ต้องเท่ากับค่าคงที่"
        break
      case "contains":
        out = "ต้องมีสมาชิกที่ผ่านเงื่อนไขอยู่"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out +=
          "เมื่อมี property " +
          e.params.property +
          " แล้วจะต้องมี property " +
          e.params.deps +
          " ด้วย"
        break
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'tag "' + e.params.tag + '" ต้องเป็น string'
            break
          case "mapping":
            out = 'ต้องมีค่าของ tag "' + e.params.tag + '" ใน oneOf'
            break
          default:
            out = 'ต้องผ่านคีย์เวิร์ด "' + e.keyword + '"'
        }
        break
      case "enum":
        out = "ต้องตรงกับหนึ่งในค่าที่กำหนดไว้"
        break
      case "false schema":
        out = "schema เป็น false"
        break
      case "format":
        out = 'ต้องเป็นรูปแบบ "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "ต้อง " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "ต้อง " + cond
        break
      case "if":
        out = 'ต้องตรงกับ schema "' + e.params.failingKeyword + '"'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "ต้อง " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "ต้องมีสมาชิกไม่เกิน " + n
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "ต้องยาวไม่เกิน " + n + " ตัวอักษร"
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "ต้องมี property ไม่เกิน " + n + " ตัว"
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "ต้อง " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "ควรมีสมาชิกไม่น้อยกว่า " + n
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "ต้องมีอย่างน้อย " + n + " ตัวอักษร"
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "ต้องมี property อย่างน้อย " + n + " ตัว"
        break
      case "multipleOf":
        out = "ต้องเป็นเลขที่หาร " + e.params.multipleOf + " ลงตัว"
        break
      case "not":
        out = 'ต้องไม่ผ่าน schema ที่กำหนดไว้ใน "not"'
        break
      case "oneOf":
        out = 'ต้องตรงกับ schema ตัวเดียวใน "oneOf" เท่านั้น'
        break
      case "pattern":
        out = 'ต้องตรงตาม pattern "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'ต้องมี property ที่มีชื่อตรงตาม pattern "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "ชื่อ property ไม่ถูกต้อง"
        break
      case "required":
        out = "ต้องมี property " + e.params.missingProperty + " ด้วย"
        break
      case "type":
        out = "ต้องเป็น " + e.params.type
        break
      case "unevaluatedItems":
        out = ""
        var n = e.params.len
        out += "ต้องมีไม่เกิน " + n + " ตัว"
        break
      case "unevaluatedProperties":
        out = "ต้องไม่มี property ที่ยังไม่ได้ผ่านการตรวจสอบเงื่อนไขใดๆ"
        break
      case "uniqueItems":
        out =
          "ต้องมีสมาชิกไม่ซ้ำักัน (ลำดับที่ " +
          e.params.j +
          " กับ " +
          e.params.i +
          " ซ้ำกัน)"
        break
      default:
        out = 'ต้องผ่านคีย์เวิร์ด "' + e.keyword + '"'
    }
    e.message = out
  }
}
