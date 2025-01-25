# Migrating to version 6

In version 6 and onwards, all pre-release AsyncAPI specification versions will be released as a regular feature request, before the AsyncAPI specification itself is released.

The pre-release version will be released as if it was not a pre-release, for example for AsyncAPI 3.0, it will be released as normal:
```js
module.exports = {
    'schemas': {
        ...
        '3.0.0': require('./schemas/3.0.0.json'),
    },
    'schemasWithoutId': {
        ...
        '3.0.0': require('./schemas/3.0.0-without-$id.json'),
    }
};
```

However, while it's still a pre-release, the underlying schemas CAN contain breaking changes from version to version, up until [the AsyncAPI specification is released](https://github.com/asyncapi/spec/releases). This means that one AsyncAPI document using v3 in the pre-release stage might be valid in `6.0.0`, but invalid in the `6.1.0`. This ONLY applies to pre-release schemas, and NOT regular ones that are set in stone.

If you want to make sure you don't use a schema not released yet, you have to whitelist which versions you allow in your tool.