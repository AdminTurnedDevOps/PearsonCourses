<div align="center">

# @react-hookz/deep-equal

[![NPM Version](https://flat.badgen.net/npm/v/@react-hookz/deep-equal)](https://www.npmjs.com/package/@react-hookz/deep-equal)
[![NPM Downloads](https://flat.badgen.net/npm/dm/@react-hookz/deep-equal)](https://www.npmjs.com/package/@react-hookz/deep-equal)
[![NPM Dependents](https://flat.badgen.net/npm/dependents/@react-hookz/deep-equal)](https://www.npmjs.com/package/@react-hookz/deep-equal)
[![Build](https://img.shields.io/github/actions/workflow/status/react-hookz/deep-equal/CI.yml?branch=master&style=flat-square)](https://github.com/react-hookz/deep-equal/actions)
[![Coverage](https://flat.badgen.net/codecov/c/github/react-hookz/deep-equal)](https://app.codecov.io/gh/react-hookz/deep-equal)
[![Types](https://flat.badgen.net/npm/types/@react-hookz/deep-equal)](https://www.npmjs.com/package/@react-hookz/deep-equal)
[![Tree Shaking](https://flat.badgen.net/bundlephobia/tree-shaking/@react-hookz/deep-equal)](https://bundlephobia.com/result?p=@react-hookz/deep-equal)

× **[DISCORD](https://discord.gg/Fjwphtu65f)**
× **[CHANGELOG](https://github.com/react-hookz/deep-equal/blob/master/CHANGELOG.md)** ×

</div>

---

Yet fastest deep comparator with ES6+ support.

## Install

This one is pretty simple, everyone knows what to do:

```shell
npm i @react-hookz/deep-equal
# or
yarn add @react-hookz/deep-equal
```

## Usage

#### Importing

This package provides three levels of compilation:

1. **Main**, the `/cjs` folder — CommonJS modules, with ES5 lang level.
2. **ESM**, the `/esm` folder — it is ES modules (browser compatible), with ES5 lang level.
3. **ESNext**, the `/esnext` folder — it is ES modules (browser compatible), with ESNext lang level.

So, if you need default `isEqual`, depending on your needs, you can import in three ways
(there are actually more, but these are the three most common):

```ts
// in case you need cjs modules
import { isEqual } from "@react-hookz/deep-equal";
// in case you need esm modules
import { isEqual } from "@react-hookz/deep-equal/esm";
// in case you want all the recent ES features
import { isEqual } from "@react-hookz/deep-equal/esnext";
```

#### Variants

This package provides 4 variants of comparator:

- **`isEqual`** - es6+ compatible, for cases when you expect almost any data on input.
- **`isEqualReact`** - es6+ compatible but with extra checks for `React` and `Preact` objects (they
  contain circular references).
- **`isEqualSimple`** - simplified version without support for `Map`, `Set`, `ArrayBuffer`,
  `TypedArray` and `DataView`.
- **`isEqualSimpleReact`** - same as `isEqualSimple` but with checks for `React` and `Preact`

## Performance

> **Note:** below tests are mage against certain dataset (can be found in benchmarks), that may or
> may not be representative for your case and your data.  
> It is better to perform benchmarks against your datasets.

**simple data (non-es6+)**
<pre>
# mixed (equal)
  @react-hookz/deep-equal x 2,328,007 ops/sec ±0.33% (94 runs sampled)
  @react-hookz/deep-equal (react) x 2,248,935 ops/sec ±1.05% (92 runs sampled)
  @react-hookz/deep-equal (simple) x 2,502,281 ops/sec ±0.39% (97 runs sampled)
  @react-hookz/deep-equal (simple react) x 2,292,288 ops/sec ±0.91% (93 runs sampled)
  dequal x 1,884,722 ops/sec ±0.57% (92 runs sampled)
  dequal (lite) x 1,875,235 ops/sec ±0.32% (95 runs sampled)
  fast-deep-equal x 1,732,963 ops/sec ±0.66% (94 runs sampled)
  react-fast-compare x 1,640,019 ops/sec ±0.22% (96 runs sampled)
 Fastest is @react-hookz/deep-equal (simple)

# mixed (unequal)
  @react-hookz/deep-equal x 3,333,499 ops/sec ±0.54% (91 runs sampled)
  @react-hookz/deep-equal (react) x 3,175,146 ops/sec ±0.59% (94 runs sampled)
  @react-hookz/deep-equal (simple) x 3,236,086 ops/sec ±0.37% (92 runs sampled)
  @react-hookz/deep-equal (simple react) x 3,187,855 ops/sec ±0.48% (96 runs sampled)
  dequal x 1,110,380 ops/sec ±1.26% (89 runs sampled)
  dequal (lite) x 1,135,251 ops/sec ±1.01% (94 runs sampled)
  fast-deep-equal x 2,238,446 ops/sec ±0.50% (97 runs sampled)
  react-fast-compare x 2,221,893 ops/sec ±0.20% (93 runs sampled)
 Fastest is @react-hookz/deep-equal
</pre>

**complex data (with es6+)**
<pre>
# mixed (equal)
  @react-hookz/deep-equal x 1,417,373 ops/sec ±0.54% (94 runs sampled)
  @react-hookz/deep-equal (react) x 1,350,950 ops/sec ±0.39% (89 runs sampled)
  dequal x 714,145 ops/sec ±0.43% (94 runs sampled)
  fast-deep-equal x 1,066,887 ops/sec ±0.20% (98 runs sampled)
 Fastest is @react-hookz/deep-equal

# mixed (unequal)
  @react-hookz/deep-equal x 2,096,641 ops/sec ±0.23% (98 runs sampled)
  @react-hookz/deep-equal (react) x 2,003,117 ops/sec ±0.56% (95 runs sampled)
  dequal x 570,606 ops/sec ±0.78% (93 runs sampled)
  fast-deep-equal x 2,149,295 ops/sec ±2.91% (80 runs sampled)
 Fastest is @react-hookz/deep-equal,fast-deep-equal
</pre>

Full benchmarks results can be found in the [`benchmark`](/benchmark) directory.

To run benchmarks simply clone this repo and make `yarn && yarn benchmark` in repo root.

## Related projects

- [@react-hookz/web](https://github.com/react-hookz/web) - React hooks done right, for browser and
  SSR.
