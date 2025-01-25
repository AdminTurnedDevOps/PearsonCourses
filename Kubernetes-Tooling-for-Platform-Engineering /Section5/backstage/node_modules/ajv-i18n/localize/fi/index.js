"use strict"
module.exports = function localize_fi(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "saa sisältää enintään " + n
        if (n == 1) {
          out += ":n elementin"
        } else {
          out += " elementtiä"
        }
        break
      case "additionalProperties":
        out = "ei saa sisältää ylimääräisiä ominaisuuksia"
        break
      case "anyOf":
        out = 'täytyy vastata "anyOf" skeemaa'
        break
      case "const":
        out = "täytyy olla yhtä kuin vakio"
        break
      case "contains":
        out = "täytyy sisältää kelvollinen elementti"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "täytyy sisältää " + e.params.deps + " ominaisuu"
        if (n == 1) {
          out += "s"
        } else {
          out += "det"
        }
        out += " kun " + e.params.property + "-ominaisuus on läsnä"
        break
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'tunniste "' + e.params.tag + '" täytyy olla merkkijono'
            break
          case "mapping":
            out =
              'tunnisteen "' + e.params.tag + '" arvon muoto pitää olla oneOf'
            break
          default:
            out = 'täytyy läpäistä "' + e.keyword + '" avainsanatarkistus'
        }
        break
      case "enum":
        out = "täytyy olla yhtä kuin jokin sallituista arvoista"
        break
      case "false schema":
        out = "boolean skeema on väärä"
        break
      case "format":
        out = 'täytyy vastata muotoa "' + e.params.format + '"'
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "täytyy olla " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "täytyy olla " + cond
        break
      case "if":
        out = 'täytyy vastata "' + e.params.failingKeyword + '" skeemaa'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "täytyy olla " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "tulee sisältää enintään " + n + " "
        if (n == 1) {
          out += "elementti"
        } else {
          out += "elementtiä"
        }
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "ei saa olla pidempi kuin " + n + " merkki"
        if (n != 1) {
          out += "ä"
        }
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "tulee sisältää enintään " + n + " "
        if (n == 1) {
          out += "ominaisuus"
        } else {
          out += "ominaisuutta"
        }
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "täytyy olla " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "tulee sisältää vähintään " + n + " "
        if (n == 1) {
          out += "elementti"
        } else {
          out += "elementtiä"
        }
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "ei saa olla lyhyempi kuin " + n + " merkki"
        if (n != 1) {
          out += "ä"
        }
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += "tulee sisältää vähintään " + n + " "
        if (n == 1) {
          out += "ominaisuus"
        } else {
          out += "ominaisuutta"
        }
        break
      case "multipleOf":
        out = "täytyy olla moninkertainen: " + e.params.multipleOf
        break
      case "not":
        out = 'ei saa olla hyväksytty skeeman "not" mukaan'
        break
      case "oneOf":
        out =
          'täytyy vastata täsmälleen yhtä "oneOf" -kohdassa määriteltyä skeemaa'
        break
      case "pattern":
        out = 'täytyy vastata muotoa "' + e.params.pattern + '"'
        break
      case "patternRequired":
        out =
          'täytyy sisältää ominaisuus joka vastaa kaavaa "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "ominaisuuden nimi on virheellinen"
        break
      case "required":
        out = "täytyy sisältää vaadittu ominaisuus " + e.params.missingProperty
        break
      case "type":
        out = ""
        var t = e.params.type
        out += "täytyy olla "
        if (t == "number") {
          out += "numero"
        } else if (t == "integer") {
          out += "kokonaisluku"
        } else if (t == "string") {
          out += "merkkijono"
        } else if (t == "boolean") {
          out += "boolean"
        } else {
          out += t
        }
        break
      case "unevaluatedItems":
        out = ""
        var n = e.params.len
        out += "ei saa olla enemmän kuin " + n + " elementti"
        if (n != 1) {
          out += "ä"
        }
        break
      case "unevaluatedProperties":
        out = "ei saa sisältää arvioimattomia ominaisuuksia"
        break
      case "uniqueItems":
        out =
          "ei saa sisältää duplikaatteja (elementit ## " +
          e.params.j +
          " ja " +
          e.params.i +
          " ovat identtiset)"
        break
      default:
        out = 'täytyy läpäistä "' + e.keyword + '" avainsanatarkistus'
    }
    e.message = out
  }
}
