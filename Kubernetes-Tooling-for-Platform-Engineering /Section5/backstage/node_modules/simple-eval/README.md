# simple-eval

Simple JavaScript expression evaluator.

## Install

```sh
yarn add simple-eval
```

or if npm is package manager of your choice

```sh
npm install simple-eval --save
```

## Usage

```js
import simpleEval from 'simple-eval';

simpleEval('2 + 4 * 10 + -4'); //  38
simpleEval('Math.floor(Math.PI * 10)'); // exception 
simpleEval('Math.floor(Math.PI * 10)', { Math }); // 31, works because we provided Math
simpleEval('foo.bar.baz ? 10 : Math.random()', {
  Math,
  foo: {
    bar: {
      baz: false,
    }
  }
}); // some random number, as returned by Math.random()
```

By default, `simple-eval` uses [`jsep`](https://www.npmjs.com/package/jsep),
but you're free to use any ESTree compliant parser such as [`acorn`](https://www.npmjs.com/package/acorn), [`@babel/parser`](https://www.npmjs.com/package/@babel/parser), or [`esprima`](https://www.npmjs.com/package/esprima).

## Caveats

Although a number of use cases is supported, do note that this library does not aim to be a drop-in replacement for `eval`.
By supporting a limited set of instructions, it's arguably safer than `eval`, albeit it's still not supposed to be used instead of proper sandbox.
In particular, all kind of declarations and assignments are prohibited.

## LICENSE

[MIT](https://github.com/P0lip/simple-eval/blob/master/LICENSE)
