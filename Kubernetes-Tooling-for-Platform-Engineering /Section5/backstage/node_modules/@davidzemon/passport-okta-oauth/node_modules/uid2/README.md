# uid2

[![NPM version](https://badge.fury.io/js/uid2.svg)](http://badge.fury.io/js/uid2)

Generate unique ids. Pass in a `length` and it returns a `string`.


## Installation

    npm install uid2

## Examples

Without a callback it is synchronous:

```js
const uid = require('uid2');

const id = uid(10);
// id => "hbswt489ts"
```

With a callback it is asynchronous:

```js
const uid = require('uid2');

uid(10, function (err, id) {
  if (err) throw err;
  // id => "hbswt489ts"
});
```

Imported via `uid2/promises` it returns a `Promise`:

```js
const uid = require('uid2/promises');

async function foo() {
  const id = await uid(10);
  // id => "hbswt489ts"
}
```

## License

MIT
