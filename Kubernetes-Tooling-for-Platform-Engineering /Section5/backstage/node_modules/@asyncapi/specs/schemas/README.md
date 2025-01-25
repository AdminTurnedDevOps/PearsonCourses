# AsyncAPI JSON Schema definitions

All the JSON Schema documents for validating AsyncAPI documents are located here in this repository. 

## Download and usage
Files are served via `https://asyncapi.com/definitions/<asyncapi-version>.json`, for example, https://asyncapi.com/definitions/2.4.0.json. 

In that way, documents are served with the proper `Content-Type` response header. It also allows us to measure AsyncAPI user adoption of those files ([More info in this GitHub Issue](https://github.com/asyncapi/website/issues/780)).
We encourage you to **only** download the files from our website instead of from GitHub.

### JSON Schema Store

[JSON Schema Store](schemastore.org) is a universal JSON schema store, where schemas for popular JSON documents can be found.  
AsyncAPI JSON Schema documents are also available in the store, meaning you can use their [plugins for most IDEs](https://www.schemastore.org/json/#editors), adding linting and validation automatically for all your AsyncAPI documents.