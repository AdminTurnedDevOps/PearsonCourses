# @swagger-api/apidom-parser-adapter-yaml-1-2

`@swagger-api/apidom-parser-adapter-yaml-1-2` is a parser adapter for the [YAML 1.2 format](https://yaml.org/spec/1.2/spec.html).

[CST](https://tree-sitter.github.io/tree-sitter/using-parsers#syntax-nodes) produced by lexical analysis is [syntactically analyzed](https://github.com/swagger-api/apidom/blob/main/packages/apidom-parser-adapter-yaml-1-2/src/syntactic-analysis) and
ApiDOM structure using [base ApiDOM namespace](https://github.com/swagger-api/apidom/tree/main/packages/apidom#base-namespace) is produced.

## Installation

After [prerequisites](https://github.com/swagger-api/apidom/blob/main/README.md#prerequisites) for installing this package are satisfied, you can install it
via [npm CLI](https://docs.npmjs.com/cli) by running the following command:

```sh
 $ npm install @swagger-api/apidom-parser-adapter-yaml-1-2
```

## Parse phases

The parse stage takes YAML string and produces ApiDOM structure using [base ApiDOM namespace](https://github.com/swagger-api/apidom/tree/main/packages/apidom#base-namespace).
There are two phases of parsing: **Lexical Analysis** and **Syntactic Analysis**.

### Lexical Analysis

Lexical Analysis will take a YAML string and turn it into a stream of tokens.
[tree-sitter](https://www.npmjs.com/package/tree-sitter) / [web-tree-sitter](https://www.npmjs.com/package/web-tree-sitter) is used as an underlying lexical analyzer.

### Syntactic Analysis

Syntactic Analysis will take a stream of tokens and turn it into an ApiDOM representation.
[CST](https://tree-sitter.github.io/tree-sitter/using-parsers#syntax-nodes) produced by lexical analysis is [syntactically analyzed](https://github.com/swagger-api/apidom/blob/main/packages/apidom-parser-adapter-yaml-1-2/src/syntactic-analysis)
and ApiDOM structure using [base ApiDOM namespace](https://github.com/swagger-api/apidom/tree/main/packages/apidom#base-namespace) is produced.

## Parser adapter API

This parser adapter is fully compatible with parser adapter interface required by [@swagger-api/apidom-parser](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser#mounting-parser-adapters)
and implements all required properties.

### mediaTypes

Defines list of media types that this parser adapter recognizes.

```js
['text/yaml', 'application/yaml']
```

### detect

[Detection](https://github.com/swagger-api/apidom/blob/main/packages/apidom-parser-adapter-yaml-1-2/src/adapter.ts#L3) of this parser adapter
always returns `false`. The reason is that it's almost impossible to detect if a source string is YAML without actually parsing it.
Don't rely on this function, rather use `mediaType` instead and please read [Word on detect vs mediaTypes](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser#word-on-detect-vs-mediatypes).

### namespace

This adapter exposes an instance of [base ApiDOM namespace](https://github.com/swagger-api/apidom/tree/main/packages/apidom#base-namespace).

### parse

`parse` function consumes various options as a second argument. Here is a list of these options:

Option | Type | Default | Description
--- | --- | --- | ---
<a name="sourceMap"></a>`sourceMap` | `Boolean` | `false` | Indicate whether to generate source maps.

All unrecognized arbitrary options will be ignored.

## Usage

This parser adapter can be used directly or indirectly via [@swagger-api/apidom-parser](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser).

### Direct usage

During direct usage you don't need to provide `mediaType` as the `parse` function is already pre-bound
with [supported media types](#mediatypes).

```js
import { parse, detect } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

// always detecting false in this parser adapter
await detect('prop: value'); // => false
await detect('test'); // => false

// parsing
const parseResult = await parse('prop: value', { sourceMap: true });
```

### Indirect usage

```js
import ApiDOMParser from '@swagger-api/apidom-parser';
import * as yamlParserAdapter from '@swagger-api/apidom-parser-adapter-yaml-1-2';

const parser = new ApiDOMParser();

parser.use(yamlParserAdapter);

const parseResult = await parser.parse('prop: value', { mediaType: yamlParserAdapter.mediaTypes.latest('yaml') });
```
