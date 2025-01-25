# expiry-map

![CI](https://github.com/SamVerschueren/expiry-map/workflows/CI/badge.svg) [![codedov](https://codecov.io/gh/SamVerschueren/expiry-map/branch/master/graph/badge.svg)](https://codecov.io/gh/SamVerschueren/expiry-map)

> A [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) implementation with expirable items

Memory is automatically released when an item expires by removing it from the `Map`.


## Install

```
$ npm install expiry-map
```


## Usage

```js
import ExpiryMap = require('expiry-map');

const map = new ExpiryMap(1000, [
	['unicorn', '🦄']
]);

map.get('unicorn');
//=> 🦄

map.set('rainbow', '🌈');

console.log(map.size);
//=> 2

// Wait for 1 second...
map.get('unicorn');
//=> undefined

console.log(map.size);
//=> 0
```


## API

### ExpiryMap(maxAge, [iterable])

#### maxAge

Type: `number`

Milliseconds until an item in the `Map` expires.

#### iterable

Type: `Object`

An `Array` or other `iterable` object whose elements are key-value pairs.

### Instance

Any of the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) methods.


## Related

- [expiry-set](https://github.com/SamVerschueren/expiry-set) - A `Set` implementation with expirable keys
- [map-age-cleaner](https://github.com/SamVerschueren/map-age-cleaner) - Automatically cleanup expired items in a Map


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
