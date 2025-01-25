# re2-wasm [![NPM version][npm-img]][npm-url]

[npm-img]: https://img.shields.io/npm/v/re2-wasm.svg
[npm-url]: https://npmjs.org/package/re2-wasm

**This is not an officially supported Google product.**

This README is modified from the node-re2 README, licensed under The "New" BSD License

This project provides bindings for [RE2](https://github.com/google/re2):
fast, safe alternative to backtracking regular expression engines written by [Russ Cox](http://swtch.com/~rsc/).
To learn more about RE2, start with an overview
[Regular Expression Matching in the Wild](http://swtch.com/~rsc/regexp/regexp3.html). More resources can be found
at his [Implementing Regular Expressions](http://swtch.com/~rsc/regexp/) page.

`RE2`'s regular expression language is almost a superset of what is provided by `RegExp`
(see [Syntax](https://github.com/google/re2/wiki/Syntax)),
but it lacks two features: backreferences and lookahead assertions. See below for more details.

`RE2` object emulates standard `RegExp` making it a practical drop-in replacement in most cases.
`RE2` is extended to provide `String`-based regular expression methods as well. To help to convert
`RegExp` objects to `RE2` its constructor can take `RegExp` directly honoring all properties.

## Why use re2-wasm?

The built-in Node.js regular expression engine can run in exponential time with a special combination:
 - A vulnerable regular expression
 - "Evil input"

This can lead to what is known as a [Regular Expression Denial of Service (ReDoS)](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS).
To tell if your regular expressions are vulnerable, you might try the one of these projects:
 - [rxxr2](http://www.cs.bham.ac.uk/~hxt/research/rxxr2/)
 - [safe-regex](https://github.com/substack/safe-regex)

However, neither project is perfect.

re2-wasm can protect your Node.js application from ReDoS.
re2-wasm makes vulnerable regular expression patterns safe by evaluating them in `RE2` instead of the built-in Node.js regex engine.

## Standard features

`RE2` object can be created just like `RegExp`:

* [`new RE2(pattern[, flags])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

Supported properties:

* [`re2.lastIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)
* [`re2.global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
* [`re2.ignoreCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase)
* [`re2.multiline`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline)
* [`re2.unicode`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode)
  * `RE2` engine always works in the Unicode mode. See details below.
* [`re2.sticky`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky)
* [`re2.source`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source)
* [`re2.flags`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags)

Supported methods:

* [`re2.exec(str)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)
* [`re2.test(str)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
* [`re2.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/toString)

The following well-known symbol-based methods are supported (see [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)):

* [`re2[Symbol.match](str)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/match)
* [`re2[Symbol.search](str)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/search)
* [`re2[Symbol.replace](str, newSubStr|function)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/replace)
* [`re2[Symbol.split](str[, limit])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/split)

It allows to use `RE2` instances on strings directly, just like `RegExp` instances:

```js
var re = new RE2("1", 'u');
"213".match(re);        // [ '1', index: 1, input: '213' ]
"213".search(re);       // 1
"213".replace(re, "+"); // 2+3
"213".split(re);        // [ '2', '3' ]
```

[Named groups](https://tc39.github.io/proposal-regexp-named-groups/) are supported.

## Extensions

### Shortcut construction

`RE2` object can be created from a regular expression:

```js
var re1 = new RE2(/ab*/igu); // from a RegExp object
var re2 = new RE2(re1);     // from another RE2 object
```

### `String` methods

Standard `String` defines four more methods that can use regular expressions. `RE2` provides them as methods
exchanging positions of a string, and a regular expression:

* `re2.match(str)`
  * See [`str.match(regexp)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
* `re2.replace(str, newSubStr|function)`
  * See [`str.replace(regexp, newSubStr|function)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
* `re2.search(str)`
  * See [`str.search(regexp)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search)
* `re2.split(str[, limit])`
  * See [`str.split(regexp[, limit])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)

### Property: `internalSource`

Starting 1.8.0 property `source` emulates the same property of `RegExp`, meaning that it can be used to create an identical `RE2` or `RegExp` instance. Sometimes, for troubleshooting purposes, a user wants to inspect a `RE2` translated source. It is available as a read-only property called `internalSource`.

### Unicode Mode

The `RE2` engine only works in Unicode mode, so the `RE2` class must always be constructed with the `u` flag to enable unicode mode.

## How to install

Installation:

```
npm install --save re2-wasm
```

## How to use

It is used just like a `RegExp` object.

```js
var { RE2 } = require("re2-wasm");

// with default flags
var re = new RE2("a(b*)", 'u');
var result = re.exec("abbc");
console.log(result[0]); // "abb"
console.log(result[1]); // "bb"

result = re.exec("aBbC");
console.log(result[0]); // "a"
console.log(result[1]); // ""

// with explicit flags
re = new RE2("a(b*)", "iu");
result = re.exec("aBbC");
console.log(result[0]); // "aBb"
console.log(result[1]); // "Bb"

// from regular expression object
var regexp = new RegExp("a(b*)", "iu");
re = new RE2(regexp);
result = re.exec("aBbC");
console.log(result[0]); // "aBb"
console.log(result[1]); // "Bb"

// from regular expression literal
re = new RE2(/a(b*)/iu);
result = re.exec("aBbC");
console.log(result[0]); // "aBb"
console.log(result[1]); // "Bb"

// from another RE2 object
var rex = new RE2(re);
result = rex.exec("aBbC");
console.log(result[0]); // "aBb"
console.log(result[1]); // "Bb"

// shortcut
result = new RE2("ab*", 'u').exec("abba");
```

## Limitations (things RE2 does not support)

`RE2` consciously avoids any regular expression features that require worst-case exponential time to evaluate.
These features are essentially those that describe a Context-Free Language (CFL) rather than a Regular Expression,
and are extensions to the traditional regular expression language because some people don't know when enough is enough.

The most noteworthy missing features are backreferences and lookahead assertions.
If your application uses these features, you should continue to use `RegExp`.
But since these features are fundamentally vulnerable to
[ReDoS](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS),
you should strongly consider replacing them.

`RE2` will throw a `SyntaxError` if you try to declare a regular expression using these features.
If you are evaluating an externally-provided regular expression, wrap your `RE2` declarations in a try-catch block. It allows to use `RegExp`, when `RE2` misses a feature:

```js
var re = /(a)+(b)*/u;
try {
  re = new RE2(re);
  // use RE2 as a drop-in replacement
} catch (e) {
  // suppress an error, and use
  // the original RegExp
}
var result = re.exec(sample);
```

In addition to these missing features, `RE2` also behaves somewhat differently from the built-in regular expression engine in corner cases.

### Backreferences

`RE2` doesn't support backreferences, which are numbered references to previously
matched groups, like so: `\1`, `\2`, and so on. Example of backrefrences:

```js
/(cat|dog)\1/.test("catcat"); // true
/(cat|dog)\1/.test("dogdog"); // true
/(cat|dog)\1/.test("catdog"); // false
/(cat|dog)\1/.test("dogcat"); // false
```

### Lookahead assertions

`RE2` doesn't support lookahead assertions, which are ways to allow a matching dependent on subsequent contents.

```js
/abc(?=def)/; // match abc only if it is followed by def
/abc(?!def)/; // match abc only if it is not followed by def
```

### Mismatched behavior

`RE2` and the built-in regex engines disagree a bit. Before you switch to `RE2`, verify that your regular expressions continue to work as expected. They should do so in the vast majority of cases.

Here is an example of a case where they may not:

```js
var { RE2 }  = require("re2-wasm");

var pattern = '(?:(a)|(b)|(c))+';

var built_in = new RegExp(pattern);
var re2 = new RE2(pattern, 'u');

var input = 'abc';

var bi_res = built_in.exec(input);
var re2_res = re2.exec(input);

console.log('bi_res: ' + bi_res);    // prints: bi_res: abc,,,c
console.log('re2_res : ' + re2_res); // prints: re2_res : abc,a,b,c
```

### Unicode

`RE2` only works in the Unicode mode. The `u` flag must be passed to the `RE2` constructor.

## License

Apache 2.0
