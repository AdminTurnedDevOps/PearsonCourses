# Migrating to version 3

In version 3, we wanted to improve how you make changes to the JSON schema documents and improve maintainability. This was done through splitting the schemas into smaller files and then on release bundle them together to form what is called a Compound Schema Document.

To read more about bundling in JSON Schema, [we refer to the official documentation](https://json-schema.org/understanding-json-schema/structuring.html#bundling).

## Change of `$id`s

Previously, each definition would be defined as:

```json
{
  ...
  "definitions": {
    "Reference": { ... },
    "ReferenceObject": { ... },
    "info": { ... },
    ...
  }
}
```

With the new naming approach, those definitions would be called:

```json
{
  ...
  "definitions": {
    "http://asyncapi.com/definitions/2.2.0/Reference.json": { ... },
    "http://asyncapi.com/definitions/2.2.0/ReferenceObject.json": { ... },
    "http://asyncapi.com/definitions/2.2.0/info.json": { ... },
    ...
  }
}
```

All definitions follow the same change from `<name>` to `http://asyncapi.com/definitions/<version>/<name>.json`.
## References
Because the `$id`s changes, so must the references and this might be a problem for some implementations if they do not follow JSON Schema behavior where they can auto map loaded schemas to references.

```json
{
  ...
  "patternProperties": {
      "^x-[\\w\\d\\.\\x2d_]+$": {
          "$ref": "http://asyncapi.com/definitions/2.3.0/specificationExtension.json"
      }
  },
  "definitions": {
    "http://asyncapi.com/definitions/2.2.0/specificationExtension.json": { ... },
    ...
  }
}
```

## Bundled schemas
Because the provided schemas are now bundled together some validation tools **might** find this a problem, for example [Ajv](#ajv-example).

### Ajv example
Because the AsyncAPI JSON Schema documents are written with a [specific meta schema](https://github.com/asyncapi/spec-json-schemas/blob/5d6ea0361a5b30707afa67a2df28e2805095c10f/schemas/2.3.0.json#L3). That meta schema, is already loaded by [Ajv](https://ajv.js.org), and when you try to load the bundled AsyncAPI JSON Schema, it now contains that same meta schema. Ajv does not like to load duplicate schemas and simply throw an error when you try to, and there are no way to tell it to ignore it. Therefore for Ajv you **must** remove it before using it.

Example code:
```js
const Ajv = require('ajv');
const asyncapi = require('@asyncapi/specs');
const ajv = new Ajv({
  jsonPointers: true,
  allErrors: true,
  schemaId: 'auto',
  logger: false
});
const asyncapiSchema = asyncapi['2.0.0'];
// Remove the meta schemas because it is already present within Ajv, and it's not possible to add duplicate schemas.
delete asyncapiSchema.definitions['http://json-schema.org/draft-07/schema'];
//delete asyncapiSchema.definitions['http://json-schema.org/draft-04/schema']; <-- This is needed if you use AsyncAPI > v2 
ajv.addSchema(asyncapiSchema, version);
validate = ajv.getSchema(version);
const validAsyncAPI = validate(...);
```

[Here is how we migrated our JS parser](https://github.com/asyncapi/parser-js/pull/423). 