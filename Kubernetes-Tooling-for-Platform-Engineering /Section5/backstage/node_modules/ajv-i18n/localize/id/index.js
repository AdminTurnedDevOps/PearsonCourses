"use strict"
module.exports = function localize_id(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += " tidak boleh memiliki lebih dari " + n + " item"
        break
      case "additionalProperties":
        out = "tidak boleh memiliki properti tambahan"
        break
      case "anyOf":
        out = 'harus cocok dengan beberapa skema pada "anyOf"'
        break
      case "const":
        out = "harus sama dengan konstan"
        break
      case "contains":
        out = "harus berisi item yang valid"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out +=
          " harus memiliki properti " +
          e.params.deps +
          " ketika properti " +
          e.params.property +
          " hadir"
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
            out = 'harus lulus validasi kata kunci "' + e.keyword + '"'
        }
        break
      case "enum":
        out = "harus sama dengan salah satu dari nilai yang telah ditentukan"
        break
      case "false schema":
        out = "skema boolean salah"
        break
      case "format":
        out = 'harus cocok dengan format "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "harus " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "harus " + cond
        break
      case "if":
        out = 'harus cocok dengan skema "' + e.params.failingKeyword + '"'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "harus " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += " tidak boleh memiliki lebih dari " + n + " item"
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += " tidak boleh lebih dari " + n + " karakter"
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += " tidak boleh memiliki lebih dari " + n + " properti"
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "harus " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += " tidak boleh kurang dari " + n + " item"
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += " tidak boleh lebih pendek dari " + n + " karakter"
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += " tidak boleh kurang dari " + n + " properti"
        break
      case "multipleOf":
        out = "harus merupakan kelipatan dari " + e.params.multipleOf
        break
      case "not":
        out = 'tidak boleh valid sesuai dengan skema pada "not"'
        break
      case "oneOf":
        out = 'harus sama persis dengan satu skema pada "oneOf"'
        break
      case "pattern":
        out = 'harus cocok dengan pola "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'harus memiliki pola pencocokan properti "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "nama properti tidak valid"
        break
      case "required":
        out = "harus memiliki properti " + e.params.missingProperty
        break
      case "type":
        out = "harus berupa " + e.params.type
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
          "tidak boleh memiliki item duplikat (item ## " +
          e.params.j +
          " dan " +
          e.params.i +
          " identik)"
        break
      default:
        out = 'harus lulus validasi kata kunci "' + e.keyword + '"'
    }
    e.message = out
  }
}
