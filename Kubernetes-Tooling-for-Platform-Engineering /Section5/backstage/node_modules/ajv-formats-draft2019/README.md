# ajv-formats-draft2019

An AJV plugin adding support for draft2019 formats missing from AJV.

Currently, `iri`, `iri-reference`, `idn-email`, `idn-hostname`, and `duration`
formats are supported. `duration` was added in draft 2019. The `uuid` format was
added in draft2019, but is already supported by the `ajv-formats` package.

[![Node.js CI](https://github.com/luzlab/ajv-formats-draft2019/actions/workflows/node.js.yml/badge.svg)](https://github.com/luzlab/ajv-formats-draft2019/actions/workflows/node.js.yml)

## Using international formats with pre-draft2019 JSON schemas

The `idn-email` and `idn-hostname` formats are implemented per RFC 1123, however
earlier JSON schemas specify RFC 1034. This is probably just fine, but you have
been warned...

## Installation

```sh
npm install --save ajv-formats-draft2019
```

## Usage

The default export is an `apply` function that patches an existing instance of
`ajv`.

```js
const Ajv = require('ajv');
const apply = require('ajv-formats-draft2019');
const ajv = new Ajv();
apply(ajv); // returns ajv instance, allowing chaining

let schema = {
  type: 'string',
  format: 'idn-email',
};
ajv.validate(schema, 'квіточка@пошта.укр'); // returns true
```

The `apply` function also accepts a second optional parameter to specify which
formats to add to the `ajv` instance.

```js
const Ajv = require('ajv');
const apply = require('ajv-formats-draft2019');
const ajv = new Ajv();

// Install only the idn-email and iri formats
apply(ajv, { formats: ['idn-email', 'iri'] });
```

The module also provides an alternate entrypoint `ajv-formats-draft2019/formats`
that works with the `ajv` constructor to add the formats to new instances.

```js
const Ajv = require('ajv');
const formats = require('ajv-formats-draft2019/formats');
const ajv = new Ajv({ formats });

let schema = {
  type: 'string',
  format: 'idn-email',
};
ajv.validate(schema, 'квіточка@пошта.укр'); // returns true
```

Using the `ajv-formats-draft2019/formats` entry point also allows cherry picking
formats. Note the approach below only works for formats that don't contain a
hypen `-` in the name. This approach may yield smaller packed bundles since it
allows tree-shaking to remove unwanted validators and related dependencies.

```js
const Ajv = require('ajv');
const { duration, iri } = require('ajv-formats-draft2019/formats');
const ajv = new Ajv({ formats: { duration, iri } });
```

## International formats

The library also provides an `idn` export to load only the international formats
(ie. `iri`, `iri-reference`, `idn-hostname` and `idn-email`).

```js
const Ajv = require('ajv');
const formats = require('ajv-formats-draft2019/idn');
const ajv = new Ajv({ formats });
```

## Formats

### iri

The string is parsed with 'uri-js' and the scheme is checked against the list of
known IANA schemes. If it's a 'mailto' schemes, all of the `to:` addresses are
validated, otherwise we check there IRI includes a path and is an absolute
reference.

### iri-reference

All valid IRIs are valid. Fragments must have a valid path and of type
"relative", "same-document" or "uri". If there is a scheme, it must be valid.

Validating a IRI references is challenging since the syntax is so permissive.
Basically, any URL-safe string is a valid IRI syntactically. I struggled to find
[negative test cases](https://github.com/luzlab/ajv-formats/blob/master/index.test.js#L240)
when writing the unit tests for IRI-references. Consider:

- `google.com` is NOT a valid IRI because it does not include a scheme.
- `file.txt` is a valid IRI-reference
- `/this:that` is a valid IRI-reference
- `this:that` is a NOT a valid IRI-reference

### idn-email

[`smtp-address-parser`](https://www.npmjs.com/package/smtp-address-parser) is
used to check the validity of the email.

### idn-hostname

The hostname is converted to ascii with punycode and checked for a valid tld.

### duration

The string is checked against a regex.

## Releases

### `v1.6.1`

- Updated `schemes` dependency, adding support for `modbus+tcp` and `mqtt` in URIs.

### `v1.6.0`

- Fix tests to work with AJV v7+ and how `ajv` is exported, rather than changes
  to this library.

### `v1.5.0`

- Upgrade dependencies

### `v1.4.4`

- The last release that's compatible with Node 8.
- Fixed a bug when validated `mailto:` IRIs.
