"use strict"
module.exports = function localize_pt_BR(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'a tag "' + e.params.tag + '" deve ser uma string'
            break
          case "mapping":
            out = 'o valor da tag "' + e.params.tag + '" deve estar no mapping'
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
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
            out += n
        }
        break
      case "enum":
        out = "deve ser igual a um dos valores permitidos"
        break
      case "properties":
        switch (e.params.error) {
          case "additional":
            out = "não deve ter propriedades adicionais"
            break
          case "missing":
            out =
              "deve ter a propriedade obrigatória " + e.params.missingProperty
            break
          default:
            out = ""
            var t = e.params.type
            var n = e.params.nullable ? "/null" : ""
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
            out += n
        }
        break
      case "type":
      case "elements":
      case "values":
        out = ""
        var t = e.params.type
        var n = e.params.nullable ? "/null" : ""
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
        out += n
        break
      case "union":
        out = 'os dados não correspondem a nenhum schema de "union"'
        break
      default:
        out = 'deve passar a validação da keyword "' + e.keyword + '"'
    }
    e.message = out
  }
}
