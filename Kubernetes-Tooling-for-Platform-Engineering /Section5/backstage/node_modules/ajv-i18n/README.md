# ajv-i18n

Internationalised error messages for [Ajv](https://github.com/ajv-validator/ajv) - superfast JSON validator for JSON Schema and JSON Type Definition.

[![Build Status](https://travis-ci.org/ajv-validator/ajv-i18n.svg?branch=master)](https://travis-ci.org/ajv-validator/ajv-i18n)
[![npm](https://img.shields.io/npm/v/ajv-i18n.svg)](https://www.npmjs.com/package/ajv-i18n)
[![Coverage Status](https://coveralls.io/repos/github/ajv-validator/ajv-i18n/badge.svg?branch=master)](https://coveralls.io/github/ajv-validator/ajv-i18n?branch=master)
[![Gitter](https://img.shields.io/gitter/room/ajv-validator/ajv.svg)](https://gitter.im/ajv-validator/ajv)

## Supported locales

|locale|language |contributor|draft-04|draft-06<sup>1</sup>|draft-07<sup>2</sup>|draft<br>2019-09<sup>3</sup><br>/2020-12<sup>4</sup>|JTD<sup>5</sup>
|------|:-------:|:---------:|:------:|:------:|:------:|:------:|:------:|
|🇬🇧 en|English  | |✓|✓|✓|✓|✓|
|AR ar|Arabic   |[Mahmoud-Mardeni](https://github.com/Mahmoud-Mardeni)|✓|✓|✓|-|-|
|CA ca|Catalan   |[alexandreec](https://github.com/alexandreec)|✓|✓|✓|-|*|
|🇨🇿 cs|Czech    |[kiskovacs](https://github.com/kiskovacs)<br>[NAM0007](https://github.com/NAM0007)|✓<br>&nbsp;|✓<br>&nbsp;|<br>✓|-|*|
|🇩🇪 de|German   |[jmtoball](https://github.com/jmtoball)<br>[gflohr](https://github.com/gflohr)|✓<br>&nbsp;|✓<br>&nbsp;|<br>✓|✓<br>&nbsp;|✓<br>&nbsp;|
|🇪🇸 es|Spanish  |[jpablom](https://github.com/jpablom)|✓|✓|✓|-|*|
|🇫🇮 fi|Finnish  |[saulipurhonen](https://github.com/saulipurhonen)|✓|✓|✓|✓|✓|
|🇫🇷 fr|French   |[monlouisj](https://github.com/monlouisj)<br>[Telokis](https://github.com/Telokis)|✓<br>&nbsp;|✓<br>&nbsp;|<br>✓|-|*|
|🇭🇺 hu|Hungarian|[szilveszter9](https://github.com/szilveszter9)|✓|-|-|-|*|
|🇮🇩 id|Indonesian|[ekoeryanto](https://github.com/ekoeryanto)|✓|✓|✓|-|*|
|🇮🇹 it|Italian  |[jasoniangreen](https://github.com/jasoniangreen)<br>[lucacorti](https://github.com/lucacorti)|✓<br>&nbsp;|<br>✓|<br>✓|<br>✓|<br>✓|
|🇯🇵 ja|Japanese |[gilgongo](https://github.com/gilgongo)|✓|-|-|-|*|
|🇰🇷 ko|Korean |[MinByeongDon](https://github.com/MinByeongDon)|✓|✓|✓|✓|✓|
|🇳🇴 nb|Norwegian bokmål|[mtramm](https://github.com/mtramm)|✓|✓|-|-|*|
|🇳🇱 nl|Dutch    |[pimlie](https://github.com/pimlie)<br>[niekvb](https://github.com/niekvb)|✓|✓|✓|<br>✓|<br>✓|
|🇵🇱 pl|Polish   |[danielzurawski](https://github.com/danielzurawski)|✓|-|-|-|*|
|🇧🇷 pt-BR|Português - Brasil|[marcosrava](https://github.com/marcosrava)<br>[ggondim](https://github.com/ggondim)|✓|✓|✓|<br>✓|<br>✓|
|🇷🇺 ru|Russian  | |✓|✓|✓|✓|✓|
|🇸🇰 sk|Slovak   |[kiskovacs](https://github.com/kiskovacs)|✓|✓|-|-|*|
|🇸🇪 sv|Swedish  |[limmen](https://github.com/Limmen)|✓|✓|-|-|*|
|🇹🇭 th|Thai     |[encX](https://github.com/encX)|✓|✓|✓|✓|✓|
|🇨🇳 zh|Chinese  |[jinzhubaofu](https://github.com/jinzhubaofu)<br>[leuction](https://github.com/leuction)|✓<br>&nbsp;|<br>✓|<br>✓|<br>✓|<br>✓|
|🇹🇼 zh-TW|Chinese - Taiwan|[minipai](https://github.com/minipai)|✓|✓|✓|✓|✓|


<sup>1</sup> added boolean schema, keywords `const`, `contains`, `propertyNames`

<sup>2</sup> added keywords `if`/`then`/`else`

<sup>3</sup> added messages for keywords `unevaluatedProperties`, `unevaluatedItems`, `dependentRequired`

<sup>4</sup> keyword `items` messages

<sup>5</sup> JSON Type Definition

\* `discriminator` form messages are not translated

Please contribute locales that you need to use if they are missing or incomplete.

## Install

Using npm:

```
npm install ajv-i18n
```

## Usage

In node:

```javascript
const Ajv = require("ajv") // version >= 8.0.0
const localize = require("ajv-i18n")
// or for JSON Type Definition
// const localize = require("ajv-i18n/localize/jtd")

const ajv = Ajv({allErrors: true, messages: false})
const validate = ajv.compile(schema)
const valid = validate(data)

if (!valid) {
  // ru for Russian
  localize.ru(validate.errors)
  // string with all errors and data paths
  console.log(ajv.errorsText(validate.errors, {separator: '\n'}))
}
```

To require only necessary locales (e.g., with browserify):

```javascript
const localize_ru = require('ajv-i18n/localize/ru')
// or for JSON Type Definition
// const localize_ru = require('ajv-i18n/localize/ru/jtd')
```

or

```javascript
const localize = {
  en: require('ajv-i18n/localize/en'),
  ru: require('ajv-i18n/localize/ru'),
}
```

See [Ajv docs](https://github.com/ajv-validator/ajv) for more information.

## Tests

```
npm install
git submodule update --init
npm test
```

## Contributing

Functions that localize error messages are generated using doT template [localize.jst](https://github.com/ajv-validator/ajv-i18n/tree/master/localize/localize.jst), [JSON Schema messages](https://github.com/ajv-validator/ajv-i18n/tree/master/messages/index.js) and [JSON Type Definition messages](https://github.com/ajv-validator/ajv-i18n/tree/master/messages/jtd.js). Templates are pre-compiled, so doT is not a run-time dependency.

`npm run build` - compiles functions to [localize](https://github.com/ajv-validator/ajv/tree/master/localize) folder.

## Contributors of locales

[![danielzurawski](https://avatars3.githubusercontent.com/u/1625711?v=3&s=40)](https://github.com/danielzurawski "danielzurawski")
[![szilveszter9](https://avatars0.githubusercontent.com/u/7540866?v=3&s=40)](https://github.com/szilveszter9 "szilveszter9")
[![jmtoball](https://avatars0.githubusercontent.com/u/219950?v=3&s=40)](https://github.com/jmtoball "jmtoball")
[![gilgongo](https://avatars2.githubusercontent.com/u/4561747?v=3&s=40)](https://github.com/gilgongo "gilgongo")
[![jasoniangreen](https://avatars3.githubusercontent.com/u/3481367?v=3&s=40)](https://github.com/jasoniangreen "jasoniangreen")
[![jpablom](https://avatars0.githubusercontent.com/u/3935083?v=3&s=40)](https://github.com/jpablom "jpablom")
[![limmen](https://avatars2.githubusercontent.com/u/8254791?v=3&s=40)](https://github.com/Limmen "Limmen")
[![jinzhubaofu](https://avatars2.githubusercontent.com/u/811195?v=3&s=40)](https://github.com/jinzhubaofu "jinzhubaofu")
[![kiskovacs](https://avatars1.githubusercontent.com/u/2733311?v=3&s=40)](https://github.com/kiskovacs "kiskovacs")
[![mahmoud-mardeni](https://avatars2.githubusercontent.com/u/19661270?s=40&v=3)](https://github.com/Mahmoud-Mardeni "mahmoud-mardeni")
[![monlouisj](https://avatars0.githubusercontent.com/u/5998380?v=3&s=40)](https://github.com/monlouisj "monlouisj")
[![marcosrava](https://avatars2.githubusercontent.com/u/243790?v=3&s=40)](https://github.com/marcosrava "marcosrava")
[![mtramm](https://avatars3.githubusercontent.com/u/3519541?v=3&s=40)](https://github.com/mtramm "mtramm")
[![Mahmoud-Mardeni](https://avatars3.githubusercontent.com/u/19661270?v=3&s=40)](https://github.com/Mahmoud-Mardeni "Mahmoud-Mardeni")
[![leuction](https://avatars3.githubusercontent.com/u/8056270?v=3&s=40)](https://github.com/leuction "leuction")
[![lucacorti](https://avatars2.githubusercontent.com/u/1076999?v=3&s=40)](https://github.com/lucacorti "lucacorti")
[![minipai](https://avatars2.githubusercontent.com/u/239570?s=40&v=4)](https://github.com/minipai "minipai")
[![encX](https://avatars3.githubusercontent.com/u/5965883?v=3&s=40)](https://github.com/encX "encX")
[<img src="https://avatars3.githubusercontent.com/u/1067403?s=40&v=4" alt="pimlie" width="40px"/>](https://github.com/pimlie "pimlie")
[![MinByeongDon](https://avatars2.githubusercontent.com/u/6141807?s=40&v=4)](https://github.com/MinByeongDon "MinByeongDon")
[![gflohr](https://avatars0.githubusercontent.com/u/7126580?s=40&v=4)](https://github.com/gflohr "gflohr")
[![ekoeryanto](https://avatars2.githubusercontent.com/u/36023898?s=40&v=4)](https://github.com/ekoeryanto "ekoeryanto")
[![Telokis](https://avatars3.githubusercontent.com/u/6382729?s=40&v=4)](https://github.com/Telokis "Telokis")
[<img src="https://avatars3.githubusercontent.com/u/15526814?s=40&v=4" alt="alexandreec" width="40px">](https://github.com/alexandreec "alexandreec")
[![ggondim](https://avatars2.githubusercontent.com/u/2074685?s=40&v=4)](https://github.com/ggondim "ggondim")
[![niekvb](https://avatars3.githubusercontent.com/u/37668320?s=40&v=4)](https://github.com/niekvb "niekvb")
[![NAM0007](https://avatars1.githubusercontent.com/u/47188486?s=40&v=4)](https://github.com/NAM0007 "NAM0007")
[![saulipurhonen](https://avatars.githubusercontent.com/u/48789543?s=40&v=4)](https://github.com/saulipurhonen "saulipurhonen")

## Enterprise support

ajv-i18n package is a part of [Tidelift enterprise subscription](https://tidelift.com/subscription/pkg/npm-ajv-i18n?utm_source=npm-ajv-i18n&utm_medium=referral&utm_campaign=enterprise&utm_term=repo) - it provides a centralised commercial support to open-source software users, in addition to the support provided by software maintainers.

## Security contact

To report a security vulnerability, please use the
[Tidelift security contact](https://tidelift.com/security).
Tidelift will coordinate the fix and disclosure. Please do NOT report security vulnerability via GitHub issues.

## License

[MIT](https://github.com/ajv-validator/ajv-i18n/blob/master/LICENSE)
