# Avro Schema Parser

An AsyncAPI schema parser for Avro 1.x schemas.

> **Note**
> Version >= `2.0.0` of this package is only supported by the `@asyncapi/parser` version >= `2.0.0`.

<!-- toc is generated with GitHub Actions do not remove toc markers -->

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Usage with remote references](#usage-with-remote-references)
  * [Usage with local references](#usage-with-local-references)
  * [Usage with Confluent Schema Registry](#usage-with-confluent-schema-registry)
    + [Create an API key](#create-an-api-key)
    + [Copy the key and the secret](#copy-the-key-and-the-secret)
    + [Use them on your AsyncAPI document](#use-them-on-your-asyncapi-document)
- [Features](#features)
  * [Validation of Avro schemas](#validation-of-avro-schemas)
  * [Support of required attributes](#support-of-required-attributes)
  * [Support for extra attributes on top of Avro specification](#support-for-extra-attributes-on-top-of-avro-specification)
    + [List of all supported extra attributes](#list-of-all-supported-extra-attributes)
  * [Support for names and namespaces](#support-for-names-and-namespaces)
- [Limitations](#limitations)
  * [Float and double-precision numbers](#float-and-double-precision-numbers)
  * [Hardcoded key and secret](#hardcoded-key-and-secret)
- [Contributors](#contributors)

<!-- tocstop -->

## Installation

```bash
npm install @asyncapi/avro-schema-parser
// OR
yarn add @asyncapi/avro-schema-parser
```

## Usage

```js
import { Parser } from '@asyncapi/parser';
import { AvroSchemaParser } from '@asyncapi/avro-schema-parser';

const parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser()); 

const asyncapiWithAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload: # The following is an Avro schema in YAML format (JSON format is also supported)
          type: record
          name: User
          namespace: com.company
          doc: User information
          fields:
            - name: displayName
              type: string
            - name: email
              type: string
            - name: age
              type: int
`

const { document } = await parser.parse(asyncapiWithAvro);
```

```js
const { Parser } = require('@asyncapi/parser');
const { AvroSchemaParser } = require('@asyncapi/raml-dt-schema-parser');

const parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser()); 

const asyncapiWithAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload: # The following is an Avro schema in YAML format (JSON format is also supported)
          type: record
          name: User
          namespace: com.company
          doc: User information
          fields:
            - name: displayName
              type: string
            - name: email
              type: string
            - name: age
              type: int
```

### Usage with remote references

```js
import { Parser } from '@asyncapi/parser';
import { AvroSchemaParser } from '@asyncapi/avro-schema-parser';

const parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser()); 

const asyncapiWithAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload:
          $ref: 'https://schemas.example.com/user'
`

const { document } = await parser.parse(asyncapiWithAvro);
```

```js
const { Parser } = require('@asyncapi/parser');
const { AvroSchemaParser } = require('@asyncapi/raml-dt-schema-parser');

const parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser()); 

const asyncapiWithAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload:
          $ref: 'https://schemas.example.com/user'
`

const { document } = await parser.parse(asyncapiWithAvro);
```

### Usage with local references

```js
import { Parser } from '@asyncapi/parser';
import { AvroSchemaParser } from '@asyncapi/avro-schema-parser';

const parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser()); 

const asyncapiWithAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload:
          $ref: 'local/path/to/file/user'
`

const { document } = await parser.parse(asyncapiWithAvro);
```

```js
const { Parser } = require('@asyncapi/parser');
const { AvroSchemaParser } = require('@asyncapi/raml-dt-schema-parser');

const parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser()); 

const asyncapiWithAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload:
          $ref: 'local/path/to/file/user'
`

const { document } = await parser.parse(asyncapiWithAvro);
```

### Usage with Confluent Schema Registry

#### Create an API key

![](./assets/create-key.png)

#### Copy the key and the secret

![](./assets/key-secret-details.png)

#### Use them on your AsyncAPI document

```js
import { Parser } from '@asyncapi/parser';
import { AvroSchemaParser } from '@asyncapi/avro-schema-parser';

const parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser()); 

const asyncapiWithAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload:
          $ref: 'https://LY422RBU2HN6JQ5T:+f8wz9a0iM06AX7xfwbzSM9YPw/JIkr22Cvl5EKT5Hb1d/nz5nOpbXV/vZC+Iz5c@example.europe-west3.gcp.confluent.cloud/subjects/test/versions/1/schema'
`

const { document } = await parser.parse(asyncapiWithAvro);
```

```js
const { Parser } = require('@asyncapi/parser');
const { AvroSchemaParser } = require('@asyncapi/raml-dt-schema-parser');

const parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser()); 

const asyncapiWithAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload:
          $ref: 'https://LY422RBU2HN6JQ5T:+f8wz9a0iM06AX7xfwbzSM9YPw/JIkr22Cvl5EKT5Hb1d/nz5nOpbXV/vZC+Iz5c@example.europe-west3.gcp.confluent.cloud/subjects/test/versions/1/schema'
`

const { document } = await parser.parse(asyncapiWithAvro);
```

## Features

### Validation of Avro schemas

Avro schemas included in parsed AsyncAPI documents are validated using [avsc](https://www.npmjs.com/package/avsc). The `parser.validate(...)` function returns all validation issues.

```js
import { Parser } from '@asyncapi/parser';
import { AvroSchemaParser } from '@asyncapi/avro-schema-parser';

const parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser()); 

const asyncapiWithInvalidAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload:
          type: notAValidAvroType
`;

const diagnostics = await parser.validate(doc);
// Custom schema issues are stored by the code "asyncapi-schemas-v2"
const avroDiagnostics = diagnostics.filter(d => d.code === 'asyncapi-schemas-v2');
console.log(avroDiagnostics);
```

```js
const { Parser } = require('@asyncapi/parser');
const { AvroSchemaParser } = require('@asyncapi/raml-dt-schema-parser');

const parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser()); 

const asyncapiWithInvalidAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload:
          type: notAValidAvroType
`;

const diagnostics = await parser.validate(doc);
// Custom schema issues are stored by the code "asyncapi-schemas-v2"
const avroDiagnostics = diagnostics.filter(d => d.code === 'asyncapi-schemas-v2');
console.log(avroDiagnostics);
```

> **Note**
> `parser.parse(...)` function also returns `diagnostics` data with all the validation issues.

### Support of required attributes

Required fields are fields with no default value and without the `"null"` union element.

### Support for extra attributes on top of Avro specification

Additional attributes not defined in the [Avro Specification](https://avro.apache.org/docs/current/spec.html) are permitted and are treated as a metadata by the specification. To improve human readability of generated AsyncAPI documentation and to leverage more features from the JSON schema we included support for the extra attributes that can be added into Avro document.

#### List of all supported extra attributes

- `example` - Can be used to define the example value from the business domain of given field. Value will be propagated into [examples attribute](https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.9.5) of JSON schema and therefore will be picked for the generated "Example of payload" when using some AsyncAPI documentation generator.

For Number instances:

- `multipleOf` - Can be used to define [the multipleOf value of a numeric instance](https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.2.1). The `multipleOf` MUST be a number, strictly greater than 0.
- `maximum` - Can be used to define [the maximum value of a numeric instance](https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.2.2).
- `exclusiveMaximum` - Can be used to define [the exclusiveMaximum value of a numeric instance](https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.2.3).
- `minimum` - Can be used to define [the minimum value of a numeric instance](https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.2.4).
- `exclusiveMinimum` - Can be used to define [the exclusiveMinimum value of a numeric instance](https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.2.5).

For String instances:
- `maxLength` - Can be used to define [the maxLength value of a string instance](https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.3.1). The value of this keyword MUST be a non-negative integer.
- `minLength` - Can be used to define [the minLength value of a string instance](https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.3.2). The value of this keyword MUST be a non-negative integer.
- `pattern` - Can be used to define [the pattern value of a string instance](https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.3.3).

For Array instances:
- `maxItems` - Can be used to define [the maxItems value of a string instance](https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.4.1). The value of this keyword MUST be a non-negative integer.
- `minItems` - Can be used to define [the minItems value of a string instance](https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.4.2). The value of this keyword MUST be a non-negative integer.
- `uniqueItems` - Can be used to define [the uniqueItems value of a string instance](https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.4.3). The value of this keyword MUST be a boolean.

### Support for names and namespaces

If, at the top level of the Avro schema, the 'name' attribute is defined, it will be copied to the corresponding JSON schema's 'x-parser-schema-id' attribute. If the Avro schema also has the 'namespace' attribute defined, then that schema's fully qualified name will be put into that attribute. The fully qualified name is defined by the namespace, followed by a dot, followed by the name.

If there are two schemas that resolve to the same fully qualified name, only the last one will be returned by the parser. Make sure names of your schemas are unique.

If no name attribute is present, the 'x-parser-schema-id' will have a generated unique id with a name like 'anonymous-schema-1' generated by the main parser. 'x-parser-schema-id' is one of the [custom extensions](https://github.com/asyncapi/parser-js/#custom-extensions) supported by the parser.

## Limitations

### Float and double-precision numbers

JSON numbers ([RFC 4627, section 2.4](http://tools.ietf.org/html/rfc4627)) don't define any limit to the scale and/or precision of numbers. That said, we can enforce limits on `int` and `long` but we can't enforce them on `float` and `double` because they can't accurately be represented on JSON Schema.

> Since we support extra attributes on field, you can set `minimum` and `maximum` attribute on float and double types to display number limits.

### Hardcoded key and secret

This is not a limitation of this package per se but of the [JSON Reference RFC](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03). So far, you can only hardcode the values for `key` and `secret` on the `$ref` URL.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.fmvilas.com/"><img src="https://avatars.githubusercontent.com/u/242119?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Fran Méndez</b></sub></a><br /><a href="https://github.com/asyncapi/avro-schema-parser/commits?author=fmvilas" title="Code">💻</a> <a href="#maintenance-fmvilas" title="Maintenance">🚧</a> <a href="https://github.com/asyncapi/avro-schema-parser/pulls?q=is%3Apr+reviewed-by%3Afmvilas" title="Reviewed Pull Requests">👀</a> <a href="#ideas-fmvilas" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.brainfart.dev/"><img src="https://avatars.githubusercontent.com/u/6995927?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lukasz Gornicki</b></sub></a><br /><a href="#maintenance-derberg" title="Maintenance">🚧</a> <a href="https://github.com/asyncapi/avro-schema-parser/pulls?q=is%3Apr+reviewed-by%3Aderberg" title="Reviewed Pull Requests">👀</a> <a href="#infra-derberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://blog.ineat-conseil.fr/"><img src="https://avatars.githubusercontent.com/u/5501911?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ludovic Dussart</b></sub></a><br /><a href="https://github.com/asyncapi/avro-schema-parser/commits?author=M3lkior" title="Code">💻</a> <a href="#maintenance-M3lkior" title="Maintenance">🚧</a> <a href="https://github.com/asyncapi/avro-schema-parser/pulls?q=is%3Apr+reviewed-by%3AM3lkior" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://dalelane.co.uk/blog"><img src="https://avatars.githubusercontent.com/u/1444788?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dale Lane</b></sub></a><br /><a href="https://github.com/asyncapi/avro-schema-parser/commits?author=dalelane" title="Code">💻</a> <a href="#maintenance-dalelane" title="Maintenance">🚧</a> <a href="https://github.com/asyncapi/avro-schema-parser/pulls?q=is%3Apr+reviewed-by%3Adalelane" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/kolb0401"><img src="https://avatars.githubusercontent.com/u/1172285?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonathan</b></sub></a><br /><a href="https://github.com/asyncapi/avro-schema-parser/commits?author=kolb0401" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ITman1"><img src="https://avatars.githubusercontent.com/u/1372054?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Radim Loskot</b></sub></a><br /><a href="https://github.com/asyncapi/avro-schema-parser/commits?author=ITman1" title="Code">💻</a></td>
    <td align="center"><a href="http://www.damaru.com/"><img src="https://avatars.githubusercontent.com/u/3926925?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michael Davis</b></sub></a><br /><a href="https://github.com/asyncapi/avro-schema-parser/commits?author=damaru-inc" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/germanschnyder"><img src="https://avatars.githubusercontent.com/u/1844525?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Germán Schnyder</b></sub></a><br /><a href="https://github.com/asyncapi/avro-schema-parser/commits?author=germanschnyder" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
