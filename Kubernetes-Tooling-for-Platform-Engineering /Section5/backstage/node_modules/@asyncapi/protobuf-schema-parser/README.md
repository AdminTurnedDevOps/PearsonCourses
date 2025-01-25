# ProtoBuff Data Types Schema Parser

A schema parser for Protocol Buffers data types.
For ProtoBuff 2 and 3 schemas.

There is no explicit distinction between ProtoBuff 2 and 3. You dont have to expect any errors if your `schemaFormat`
is `application/vnd.google.protobuf;version=2` defined, but your schema is proto3.

Version >= `2.0.0` of package is only supported by `@asyncapi/parser` version >= `2.0.0`.

This package is browser-compatible.

## Installation

```
npm install @asyncapi/protobuf-schema-parser
// OR
yarn add @asyncapi/protobuf-schema-parser
```

## Usage

```ts
import {Parser} from '@asyncapi/parser';
import {ProtoSchemaParser} from '@asyncapi/protobuf-schema-parser'

const parser = new Parser();
parser.registerSchemaParser(ProtoSchemaParser());

const asyncapiWithProto = `
asyncapi: 2.0.0
info:
  title: Example with ProtoBuff
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.google.protobuf;version=3'
        payload: |
            message Point {
                required int32 x = 1;
                required int32 y = 2;
                optional string label = 3;
            }

            message Line {
                required Point start = 1;
                required Point end = 2;
                optional string label = 3;
            }
`

const {document} = await parser.parse(asyncapiWithProto);
```

```js
const {Parser} = require('@asyncapi/parser');
const {ProtoSchemaParser} = require('@asyncapi/protobuf-schema-parser');

const parser = new Parser();
parser.registerSchemaParser(ProtoSchemaParser());

const asyncapiWithProto = `
asyncapi: 2.0.0
info:
  title: Example with ProtoBuff
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.google.protobuf;version=3'
        payload: |
            message Point {
                required int32 x = 1;
                required int32 y = 2;
                optional string label = 3;
            }

            message Line {
                required Point start = 1;
                required Point end = 2;
                optional string label = 3;
            }
`

const {document} = await parser.parse(asyncapiWithProto);
```

Place your protoBuff schema as string in `payload` to get it parsed.

References are NOT supported:

- no support for `$ref`
- no support for [`import`](https://protobuf.dev/programming-guides/proto3/#importing-definitions), except the default
  google types:
    - google/protobuf/*
    - google/type/*

## Comments

Each field of a message may have a comment witch will be reflected as json schema `description`.
Furthermore, the comment can contain the following annotations:

```
message Point {
    /*
     * The cordinate on the x axis.
     * @Default 99
     * @Min 0
     * @Max 100 
     */
    required int32 x = 1;
    
    /*
     * The cordinate on the y axis.
     * @Default 12
     * @Min 0
     * @Max 100 
     */
    required int32 y = 2;
    optional string label = 3;
}
```

### Per field annotation

| annotation         	 | description 	                                                                                                                        |
|----------------------|:-------------------------------------------------------------------------------------------------------------------------------------|
| @Example  	          | json schema examples keyword. Can exists multiple times. If used with an complex type, an single lines json object hast to be used.	 |
| @Min or @Minimum     | json schema [numeric validator](https://json-schema.org/understanding-json-schema/reference/numeric#range)	                          |
| @Max or @Maximum     | json schema [numeric validator](https://json-schema.org/understanding-json-schema/reference/numeric#range)                           |
| @Pattern             | json scheme [string validator](https://json-schema.org/understanding-json-schema/reference/string#regexp)	                           |
| @ExclusiveMinimum    | json schema [numeric validator](https://json-schema.org/understanding-json-schema/reference/numeric#range)                           |
| @ExclusiveMaximum    | json schema [numeric validator](https://json-schema.org/understanding-json-schema/reference/numeric#range)	                          |
| @MultipleOf          | json schema [numeric validator](https://json-schema.org/understanding-json-schema/reference/numeric#multiples)   	                   |
| @MinLength           | json scheme [string validator](https://json-schema.org/understanding-json-schema/reference/string#length)                            |
| @MaxLength           | json scheme [string validator](https://json-schema.org/understanding-json-schema/reference/string#length)                            |
| @MinItems            | json scheme [array validator](https://json-schema.org/understanding-json-schema/reference/array#length)	                             |
| @MaxItems            | json scheme [array validator](https://json-schema.org/understanding-json-schema/reference/array#length)		                            |
| @Default             | json schema [default value](https://opis.io/json-schema/1.x/default-value.html)	                                                     |

### Per message annotation

| annotation | description 	                                                                                            |
|------------|:---------------------------------------------------------------------------------------------------------|
| @RootNode  | If there are multiple types without an parent you can give a hint to the root node with this annotation. |

### Head annotation

| annotation | description 	                                             |
|------------|:----------------------------------------------------------|
| @Option    | In head of your file you can place options for the parser |


### Head annotation "Option"

The `@Option` have to follow by space separated options key and another space separated value 

```
// @Option primitiveTypesWithLimits false

message Point {

}
```

Possible options are:


| option                   | description  	                                                                                             | def  |
|--------------------------|:-----------------------------------------------------------------------------------------------------------|:-----|
| primitiveTypesWithLimits | If you dont like to get default Min and Max limits for primitive types, you can set this option to `false` | true |



