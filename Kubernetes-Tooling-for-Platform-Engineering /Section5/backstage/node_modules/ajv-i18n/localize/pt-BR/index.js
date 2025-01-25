"use strict"
module.exports = function localize_pt_BR(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = "não são permitidos itens adicionais (mais do que " + n + ")"
        break
      case "additionalProperties":
        out = "não são permitidas propriedades adicionais"
        break
      case "anyOf":
        out = 'os dados não correspondem a nenhum schema de "anyOf"'
        break
      case "const":
        out = "deve ser igual à constante"
        break
      case "contains":
        out = "deve conter um item válido"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += " deve ter propriedade"
        if (n != 1) {
          out += "s"
        }
        out +=
          " " +
          e.params.deps +
          " quando a propriedade " +
          e.params.property +
          " estiver presente"
        break
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'a tag "' + e.params.tag + '" deve ser uma string'
            break
          case "mapping":
            out = 'o valor da tag "' + e.params.tag + '" deve estar no oneOf'
            break
          default:
            out = 'deve passar a validação da keyword "' + e.keyword + '"'
        }
        break
      case "enum":
        out = "deve ser igual a um dos valores permitidos"
        break
      case "false schema":
        out = 'o schema booleano é "false"'
        break
      case "format":
        out = 'deve corresponder ao formato "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "deve ser " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "deve ser " + cond
        break
      case "if":
        out = 'deve corresponder ao schema "' + e.params.failingKeyword + '"'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "deve ser " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "não deve ter mais que " + n + " elemento"
        if (n != 1) {
          out += "s"
        }
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "não deve ser maior que " + n + " caracter"
        if (n != 1) {
          out += "es"
        }
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "não deve ter mais que " + n + " propriedade"
        if (n != 1) {
          out += "s"
        }
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "deve ser " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "não deve ter menos que " + n + " elemento"
        if (n != 1) {
          out += "s"
        }
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "não deve ser mais curta que " + n + " caracter"
        if (n != 1) {
          out += "es"
        }
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "não deve ter menos que " + n + " propriedade"
        if (n != 1) {
          out += "s"
        }
        break
      case "multipleOf":
        out = "deve ser múltiplo de " + e.params.multipleOf
        break
      case "not":
        out = 'não deve ser valido segundo o schema em "not"'
        break
      case "oneOf":
        out = 'deve corresponder exatamente com um schema em "oneOf"'
        break
      case "pattern":
        out = 'deve corresponder ao padrão "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'deve ter a propriedade correspondente ao padrão "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "o nome da propriedade é inválido"
        break
      case "required":
        out = "deve ter a propriedade obrigatória " + e.params.missingProperty
        break
      case "type":
        out = ""
        var t = e.params.type
        out += "deve ser "
        if (t == "number") {
          out += "um número"
        } else if (t == "integer") {
          out += "um número inteiro"
        } else if (t == "string") {
          out += "um texto"
        } else if (t == "boolean") {
          out += "um booleano"
        } else {
          out += t
        }
        break
      case "unevaluatedItems":
        out = ""
        var n = e.params.len
        out += "não pode possuir mais que " + n + " "
        if (n == 1) {
          out += "item"
        } else {
          out += "itens"
        }
        break
      case "unevaluatedProperties":
        out = "não pode possuir propridades não avaliadas"
        break
      case "uniqueItems":
        out =
          "não deve ter itens duplicados (os itens ## " +
          e.params.j +
          " e " +
          e.params.i +
          " são idênticos)"
        break
      default:
        out = 'deve passar a validação da keyword "' + e.keyword + '"'
    }
    e.message = out
  }
}
