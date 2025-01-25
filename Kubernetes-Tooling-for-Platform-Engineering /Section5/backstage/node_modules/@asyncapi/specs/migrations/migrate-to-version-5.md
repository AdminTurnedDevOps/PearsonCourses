# Migrating to version 5

In version 5, we now export two different types of schemas, one using `$id` feature in JSON Schema, and one without.

In v4, the library would export the schemas as:
```js
module.exports = {
  '2.0.0': require('./schemas/2.0.0.json'),
  ...
};
```

In v5, you need to access the schemas through `.schemas` instead.

```js
module.exports = {
    'schemas': {
        '2.0.0': require('./schemas/2.0.0.json'),
        ...
    },
    'schemasWithoutId': {
        '2.0.0': require('./schemas/2.0.0-without-$id.json'),
        ...
    }
};
```

And if you want the schemas without `$id`, use `schemasWithoutId`.