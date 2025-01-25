YAML Loader
===========

YAML loader for [webpack](https://webpack.github.io).


Installation
------------

```
npm install --save-dev yml-loader
```

Usage
-----

```js
// webpack.config.js

module.exports = {
  module: {
    loaders: [
      {
        test: /\.yml$/,
        loader: 'yml'
      }
    ]
  }
};
```

Multiple document loading
-------------------------

By adding a `multiDocument` option will make this possible.

```yaml
%YAML 1.2
---
doc: 1
---
doc: 2
...
```


Blacklisting keys
-----------------

When passed a `keysToRemove` query (`Array` of `String`s) to remove keys from the loader output.

Given input file:
```yaml
development:
  public_key: "this is needed on the client"
  private_key: "should be restricted to server"
prod:
  public_key: "also needed on the client"
  private_key: "missile launch codes ¯\_(ツ)_/¯"
```
And this loader config:
```js
// webpack.config.js under module.exports.module:
loaders: [
  {
    test: /\.ya?ml$/,
    loader: 'yml',
    query: {
      // debug: true, // enable to display removed keys
      keysToRemove: ['private_key', ],
    },
  },
],
```
Will output:
```js
{
  development: { public_key: 'this is needed on the client' },
  prod: { public_key: 'also needed on the client' }
}
```

License
-------
[MIT](LICENSE)
