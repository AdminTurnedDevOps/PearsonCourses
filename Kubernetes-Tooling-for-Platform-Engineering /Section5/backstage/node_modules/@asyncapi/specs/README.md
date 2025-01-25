![npm](https://img.shields.io/npm/v/@asyncapi/specs?style=for-the-badge) ![npm](https://img.shields.io/npm/dt/@asyncapi/specs?style=for-the-badge)

## Overview

This is a mono repository, which provides all the JSON Schema documents for validating AsyncAPI documents.

### Two types of schemas

This repository contains [JSON Schema](https://json-schema.org) files for all the versions of AsyncAPI specification. There are two types of JSON Schema files, with and without **$id** feature. We need two versions of schemas because of the differences it tooling implementation of JSON Schema `$ref` and `$id` keywords. Some implementations treat `$id` by default as prefix reference for `$ref` and require it, therefore it is needed to properly correlate `$ref` and `$id` values. Unfortunately other tools do not understand `$id` values and fail dereferencing. This is why we need two different versions of schemas, with and without the `$id`.

### Releases and pre-releases

This repository contains JSON Schema files for official AsyncAPI releases and also for release candidates. Before you decide to use a specific JSON Schema file in production, make sure a corresponding [official release of AsyncAPI specification](https://github.com/asyncapi/spec/releases) is produced, not a release candidate.

JSON Schema which describes a version of AsyncAPI specification that is not yet officially released is considered an unstable pre-release that can change anytime and is not considered to be a breaking-change.

If you want to make sure you only use stable schemas, you have to make sure that you use only certain schema versions, not all by default.

### JSON Schema vs AsyncAPI specification

These JSON Schema files do not reflect 1:1 the specification and shouldn't be treated as specification itself but rather as a tool (e.g., for validation).

These JSON Schema files shouldn't be used as the only tool for validating AsyncAPI documents because some rules described in the AsyncAPI specification can't be described with JSON Schema.

### Libraries

In addition, this repo provides JavaScript and Go modules that make it easier to access JSON Schema files through code. These packages provide access only to schemas with version larger or equal 2.0.0.

## Custom Validation Needs

If you decide to validate AsyncAPI documents only with the JSON Schema files provided in this repo, your AsyncAPI documents will not be properly validated.
It's recommended to use [AsyncAPI JavaScript Parser](https://github.com/asyncapi/parser-js) that uses the AsyncAPI JSON Schema files for validation but also implements additional custom validations.
 
The following additional custom validations need to be provided for documents prior to `3.0.0`:

* Variables provided in the `url` property have a corresponding variable object defined and its example is correct.
* `operationId`s are not duplicated in the document.
* `messageId`s are not duplicated in the document.
* Server security is declared properly and the name has a corresponding `securitySchemes` definition in `components` with the same name.
* Server `securitySchemes` is an empty array when the security type requires it.
* Parameters specified in the channel name have corresponding parameters object defined.
* Channel names do not contain URL parameters.
* All servers listed for a channel in the `servers` property are declared in the top-level `servers` object.
* Tags specified in any object have no duplicates. Check must be done for: the top-level object, operations (publish and subscribe), operation traits, channels, messages, and message traits.
 
At the moment, the AsyncAPI JavaScript parser does not cover all validation cases yet.
All test cases and parsers coverage can be found [here](https://asyncapi.github.io/tck/)

## Installation

### NodeJS

```bash
npm install @asyncapi/specs
// OR by Yarn
yarn add @asyncapi/specs
```

### Go

```bash
go get github.com/asyncapi/spec-json-schemas/v2
```

## Usage

### NodeJS

Grab a specific AsyncAPI version:

```js
const asyncapi = require('@asyncapi/specs');

console.log(asyncapi.schemas['2.0.0'])
console.log(asyncapi.schemasWithoutId['2.0.0'])
// Do something with the schema.
```

Get a list of supported versions:

```js
const versions = require('@asyncapi/specs').schemas;

console.log(versions);
// Outputs object:
//
// {
//   '2.0.0': [Object],
//   '2.1.0': [Object],
//   ...
// }
console.log(Object.keys(versions));
// Outputs array:
//
// [
//   '2.0.0',
//   '2.1.0',
//   ...
// ]
```

> **Note**
> The main export of the package provides only supported versions of AsyncAPI (newer or equal to `2.0.0`). To use older ones (e.g. `1.2.0`) please import an absolute path like `@asyncapi/specs/schemas/1.2.0`;

### Go

Grab a specific AsyncAPI version:

```go
import "github.com/asyncapi/spec_json_schemas/v4"

func Do() {
    schema, err := spec_json_schemas.Get("1.1.0")
    if err != nil {
        panic(err)
    }

    // Do something with the schema
}
```

## Migration guidelines

If you are currently using version 2, check out [migration guideline to version 3](./migrations/migrate-to-version-3.md).
If you are currently using version 3, check out [migration guideline to version 4](./migrations/migrate-to-version-4.md).
If you are currently using version 4, check out [migration guideline to version 5](./migrations/migrate-to-version-5.md).
If you are currently using version 5, check out [migration guideline to version 6](./migrations/migrate-to-version-6.md).

## Repository structure

This is the current project structure explained:

- [./definitions](./definitions) - contain all the individual schemas that will automatically be bundled together to provide the schemas in [./schemas](./schemas).
- [./examples](./examples) - contain most individual definition examples that will automatically be bundled together to provide example for each definition in the schemas in [./schemas](./schemas).
- [./tools/bundler](./tools/bundler) - is the tool that bundles all the individual schemas together.
- [./schemas](./schemas) - contain all automatically bundled and complete schemas for each AsyncAPI version. These schemas should **NOT** be manually changed as they are automatically generated. Any changes should be done in [./definitions](./definitions).
- [./extensions](./extensions) - contains all the schemas of the extensions that will automatically be bundled to provide informations about extensions.


## Schema Bundling

Changes should not be done manually to the schemas in [./schemas](./schemas), but instead, be done in their individual definitions located in [./definitions](./definitions).

These definitions are automatically bundled together on new releases through the npm script `prepublishOnly`, which ensures the project is built. This is where the [bundler](./tools/bundler) is called. 

For example, for [2.2.0](./definitions/2.2.0), the [bundler](./tools/bundler/index.js) starts with the [asyncapi.json](definitions/2.2.0/asyncapi.json) file and recursively goes through all references (`$ref`) to create the [appropriate bundled version](./schemas/2.2.0.json).

## Creating a new version

### 1a Automated:

```bash
npm run startNewVersion --new-version=x.x.x
```

Where `x.x.x` is the new version you want to create.

### 1a Manual

The manual process of creating a new version is to:
1. Duplicate the latest version (`y.y.y`) under definitions (so we have the correct base to make changes from). 
1. Rename the folder to the new version (`x.x.x`).
1. Duplicate the latest version (`y.y.y`) under examples (so we have the correct base to make changes from).
1. Rename the folder to the new version (`x.x.x`).
1. Search and replace in the new duplicated folder for `y.y.y` and replace it with `x.x.x`.

### 2 Further steps

1. Edit the [index.js](./index.js) file adding a new line with the new version. I.e.:
   ```js
   '2.6.0': require('./schemas/2.6.0.json'),
   '2.6.0-without-$id': require('./schemas/2.6.0-without-$id.json'),
   ```
1. Edit the [index.d.ts](./index.d.ts) file adding a new line with the types for the new version. I.e.:
   ```js
   '2.6.0': JSONSchema7;
   '2.6.0-without-$id': JSONSchema7;
   ```
1. Edit the [schemas/all.schema-store.json](./schemas/all.schema-store.json) file adding a new entry under the `oneOf` keyword with the new version. Remember about adding `-without-$id` suffix which points to alternative generated schema without $ids. I.e.:

    ```json
    {
       "allOf":[
          {
             "properties":{
                "asyncapi":{
                   "const":"2.6.0"
                }
             }
          },
          {
             "$ref":"http://asyncapi.com/schema-store/2.6.0-without-$id.json"
          }
       ]
    }
    ```

## Handling breaking changes
Whenever a Breaking Change is introduced, the following steps should be taken in Go package:

1. Edit `go.mod` file, and increase the version package suffix in the module name. For example, if the current version is `v2.0.0`, and you are releasing `v3.0.0`, the module name should be `github.com/asyncapi/spec-json-schemas/v3`.

## SchemaStore compatibility testing

AsyncAPI JSON Schema is referenced in [SchemaStore](https://www.schemastore.org/json/). In many IDEs, like VSCode, some extensions integrate with SchemaStore, like [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml). This way we enable autocompletion, validation and tooltips that help write AsyncAPI documents.

Whenever you make changes in AsyncAPI JSON Schema, you should always manually verify that the schema is still supported by [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) and that it will be able to fetch and dereference it.

- Make sure you have VSCode and YAML extension
- Once you make changes in schemas, bundle them with `npm run bundle`
- Edit [this sample AsyncAPI document](./test/fixtures/asyncapi.yml). Add a new field, hover over some property to see if tooltip still shows up. This sample document contains the following line that assures YAML uses your local schema and not the one from SchemaStore. Make sure it points to the schema bundle that you generated and that contains your changes:
   ```yaml
   # yaml-language-server: $schema=YOUR-PROJECTS-DIRECTORY/spec-json-schemas/schemas/2.6.0-without-$id.json
   ```
   
## Extensions

Extensions are a way to [extend AsyncAPI specification](https://www.asyncapi.com/docs/concepts/asyncapi-document/extending-specification) with fields that are not yet defined inside the specification. To add JSON schema of the extension in this repository, you need to first make sure it is added to the [extension-catalog](https://github.com/asyncapi/extensions-catalog) repository.
### How to add schema of the extension

1. All the extensions must be present in [./extensions](./extensions) folder.
2. A proper folder structure must be followed to add the extensions.
3. A new folder just as [x extension](./extensions/x) must be added with proper `versioning` and `schema file`.
4. All the schemas must be added in a file named `schema.json` just as one is defined for [x extension](./extensions/x/0.1.0/schema.json).

5. Extension schema should not be referenced directly in the definition of the object it extends. For example if you add an extension for `info`, your extension's schema should not be referenced from `info.json` but [infoExtensions.json](./definitions/3.0.0/infoExtensions.json). If the object that you extend doesn't have a corresponding `*Extensions.json` file, you need to create one.

