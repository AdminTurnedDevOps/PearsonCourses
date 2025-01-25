"use strict"
module.exports = function localize_fr(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "ne doit pas contenir plus de " + n + " élémént"
        if (n != 1) {
          out += "s"
        }
        break
      case "additionalProperties":
        out = "ne doit pas contenir de propriétés additionnelles"
        break
      case "anyOf":
        out = 'doit correspondre à un schéma de "anyOf"'
        break
      case "const":
        out = "doit être égal à la constante"
        break
      case "contains":
        out = "doit contenir un élément valide"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out +=
          "doit avoir la propriété " +
          e.params.deps +
          " quand la propriété " +
          e.params.property +
          " est présente"
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
            out = 'doit être valide selon le critère "' + e.keyword + '"'
        }
        break
      case "enum":
        out = "doit être égal à une des valeurs prédéfinies"
        break
      case "false schema":
        out = 'le schema est "false"'
        break
      case "format":
        out = 'doit correspondre au format "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "doit être " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "doit être " + cond
        break
      case "if":
        out = 'doit correspondre au schéma "' + e.params.failingKeyword + '"'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "doit être " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "ne doit pas contenir plus de " + n + " élément"
        if (n != 1) {
          out += "s"
        }
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "ne doit pas dépasser " + n + " caractère"
        if (n != 1) {
          out += "s"
        }
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "ne doit pas contenir plus de " + n + " propriété"
        if (n != 1) {
          out += "s"
        }
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "doit être " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "ne doit pas contenir moins de " + n + " élément"
        if (n != 1) {
          out += "s"
        }
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "ne doit pas faire moins de " + n + " caractère"
        if (n != 1) {
          out += "s"
        }
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "ne doit pas contenir moins de " + n + " propriété"
        if (n != 1) {
          out += "s"
        }
        break
      case "multipleOf":
        out = "doit être un multiple de " + e.params.multipleOf
        break
      case "not":
        out = 'est invalide selon le schéma "not"'
        break
      case "oneOf":
        out = 'doit correspondre à exactement un schéma de "oneOf"'
        break
      case "pattern":
        out = 'doit correspondre au format "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'la propriété doit correspondre au format "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "le nom de propriété est invalide"
        break
      case "required":
        out = "requiert la propriété " + e.params.missingProperty
        break
      case "type":
        out = "doit être de type " + e.params.type
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
          "ne doit pas contenir de doublons (les éléments ## " +
          e.params.j +
          " et " +
          e.params.i +
          " sont identiques)"
        break
      default:
        out = 'doit être valide selon le critère "' + e.keyword + '"'
    }
    e.message = out
  }
}
