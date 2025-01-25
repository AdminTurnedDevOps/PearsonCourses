# nimma

[![npm](https://img.shields.io/npm/v/nimma)](https://www.npmjs.com/package/nimma)
[![MinZipped Size](https://img.shields.io/bundlephobia/minzip/nimma)](https://bundlephobia.com/package/nimma)
[![Dependencies](https://img.shields.io/librariesio/release/npm/nimma)](https://libraries.io/npm/nimma)
[![Coverage](https://img.shields.io/codecov/c/github/p0lip/nimma)](https://app.codecov.io/gh/P0lip/nimma/)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=P0lip_nimma&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=P0lip_nimma)

> JSON Path expressions? I mog _nimma_, aba naja. :trollface:

## Install

- [Skypack](https://www.skypack.dev/view/nimma) - recommended for [Deno](https://deno.land/) and browsers. Works with Node.js as well if you supply a custom module loader.

- Package manager

  ```sh
  yarn add nimma
  ```

  or if npm is the package manager of your choice

  ```sh
  npm install nimma --save
  ```

## Features

- Very good JSONPath support - besides a few tiny exceptions, the whole spec is covered,
- Supports the majority of JSONPath-plus additions,
- Support for containments (`in`) and regex (`~=`) operators, as taken from [draft-ietf-jsonpath-base-01](https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base),
- Increased security - only a strict set of operations are supported in Filter Expressions - no global references, or assignments are permitted.

## Usage

```js
import Nimma from 'https://cdn.skypack.dev/nimma';

const n = new Nimma([
  '$.info',
  '$.info.contact',
  '$.info^',
  '$.info^~',
  '$.servers[*].url',
  '$.servers[0:2]',
  '$.servers[:5]',
  "$.bar['children']",
  "$.bar['0']",
  "$.bar['children.bar']",
  '$.channels[*][publish,subscribe][?(@.schemaFormat === void 0)].payload',
  "$..[?( @property === 'get' || @property === 'put' || @property === 'post' )]",
  "$..paths..[?( @property === 'get' || @property === 'put' || @property === 'post' )]",
  `$.examples.*`,
  '$[1:-5:-2]',
  '$..foo..[?( @property >= 900 )]..foo',
]);

// you can perform the query...
n.query(document, {
  ['$.info']({ value, path }) {
    //
  },
  // and so on for each specified path
});

// ... or write the generated code. It's advisable to write the code to further re-use.
await cache.writeFile('./nimma-code.mjs', n.sourceCode); // once
```

Here's how the sourceCode would look like for the above path expressions

```js
import { Scope, isObject, inBounds } from 'nimma/runtime';
const tree = {
  '$.info': function (scope, fn) {
    const value = scope.sandbox.root;
    if (isObject(value)) {
      scope.fork(['info'])?.emit(fn, 0, false);
    }
  },
  '$.info.contact': function (scope, fn) {
    const value = scope.sandbox.root?.['info'];
    if (isObject(value)) {
      scope.fork(['info', 'contact'])?.emit(fn, 0, false);
    }
  },
  '$.info^': function (scope, fn) {
    const value = scope.sandbox.root;
    if (isObject(value)) {
      scope.fork(['info'])?.emit(fn, 1, false);
    }
  },
  '$.info^~': function (scope, fn) {
    const value = scope.sandbox.root;
    if (isObject(value)) {
      scope.fork(['info'])?.emit(fn, 1, true);
    }
  },
  '$.servers[*].url': function (scope, fn) {
    if (scope.depth !== 2) return;
    if (scope.path[0] !== 'servers') return;
    if (scope.path[2] !== 'url') return;
    scope.emit(fn, 0, false);
  },
  '$.servers[0:2]': function (scope, fn) {
    if (scope.depth !== 1) return;
    if (scope.path[0] !== 'servers') return;
    if (typeof scope.path[1] !== 'number' || scope.path[1] >= 2) return;
    scope.emit(fn, 0, false);
  },
  '$.servers[:5]': function (scope, fn) {
    if (scope.depth !== 1) return;
    if (scope.path[0] !== 'servers') return;
    if (typeof scope.path[1] !== 'number' || scope.path[1] >= 5) return;
    scope.emit(fn, 0, false);
  },
  "$.bar['children']": function (scope, fn) {
    const value = scope.sandbox.root?.['bar'];
    if (isObject(value)) {
      scope.fork(['bar', 'children'])?.emit(fn, 0, false);
    }
  },
  "$.bar['0']": function (scope, fn) {
    const value = scope.sandbox.root?.['bar'];
    if (isObject(value)) {
      scope.fork(['bar', '0'])?.emit(fn, 0, false);
    }
  },
  "$.bar['children.bar']": function (scope, fn) {
    const value = scope.sandbox.root?.['bar'];
    if (isObject(value)) {
      scope.fork(['bar', 'children.bar'])?.emit(fn, 0, false);
    }
  },
  '$.channels[*][publish,subscribe][?(@.schemaFormat === void 0)].payload':
    function (scope, fn) {
      if (scope.depth !== 4) return;
      if (scope.path[0] !== 'channels') return;
      if (scope.path[2] !== 'publish' && scope.path[2] !== 'subscribe') return;
      if (!(scope.sandbox.at(3).value.schemaFormat === void 0)) return;
      if (scope.path[4] !== 'payload') return;
      scope.emit(fn, 0, false);
    },
  "$..[?( @property === 'get' || @property === 'put' || @property === 'post' )]":
    function (scope, fn) {
      if (
        !(
          scope.sandbox.property === 'get' ||
          scope.sandbox.property === 'put' ||
          scope.sandbox.property === 'post'
        )
      )
        return;
      scope.emit(fn, 0, false);
    },
  "$..paths..[?( @property === 'get' || @property === 'put' || @property === 'post' )]":
    function (scope, fn) {
      if (scope.depth < 1) return;
      let pos = 0;
      if (((pos = scope.path.indexOf('paths', pos)), pos === -1)) return;
      if (
        scope.depth < pos + 1 ||
        ((pos = !(
          scope.sandbox.property === 'get' ||
          scope.sandbox.property === 'put' ||
          scope.sandbox.property === 'post'
        )
          ? -1
          : scope.depth),
        pos === -1)
      )
        return;
      if (scope.depth !== pos) return;
      scope.emit(fn, 0, false);
    },
  '$.examples.*': function (scope, fn) {
    if (scope.depth !== 1) return;
    if (scope.path[0] !== 'examples') return;
    scope.emit(fn, 0, false);
  },
  '$[1:-5:-2]': function (scope, fn) {
    if (scope.depth !== 0) return;
    if (
      typeof scope.path[0] !== 'number' ||
      !inBounds(scope.sandbox.parentValue, scope.path[0], 1, -5, -2)
    )
      return;
    scope.emit(fn, 0, false);
  },
  '$..foo..[?( @property >= 900 )]..foo': function (scope, fn) {
    scope.bail(
      '$..foo..[?( @property >= 900 )]..foo',
      scope => scope.emit(fn, 0, false),
      [
        {
          fn: scope => scope.property !== 'foo',
          deep: true,
        },
        {
          fn: scope => !(scope.sandbox.property >= 900),
          deep: true,
        },
        {
          fn: scope => scope.property !== 'foo',
          deep: true,
        },
      ],
    );
  },
};
export default function (input, callbacks) {
  const scope = new Scope(input);
  const _tree = scope.registerTree(tree);
  const _callbacks = scope.proxyCallbacks(callbacks, {});
  try {
    _tree['$.info'](scope, _callbacks['$.info']);
    _tree['$.info.contact'](scope, _callbacks['$.info.contact']);
    _tree['$.info^'](scope, _callbacks['$.info^']);
    _tree['$.info^~'](scope, _callbacks['$.info^~']);
    _tree["$.bar['children']"](scope, _callbacks["$.bar['children']"]);
    _tree["$.bar['0']"](scope, _callbacks["$.bar['0']"]);
    _tree["$.bar['children.bar']"](scope, _callbacks["$.bar['children.bar']"]);
    _tree['$..foo..[?( @property >= 900 )]..foo'](
      scope,
      _callbacks['$..foo..[?( @property >= 900 )]..foo'],
    );
    scope.traverse(() => {
      _tree['$.servers[*].url'](scope, _callbacks['$.servers[*].url']);
      _tree['$.servers[0:2]'](scope, _callbacks['$.servers[0:2]']);
      _tree['$.servers[:5]'](scope, _callbacks['$.servers[:5]']);
      _tree[
        '$.channels[*][publish,subscribe][?(@.schemaFormat === void 0)].payload'
      ](
        scope,
        _callbacks[
          '$.channels[*][publish,subscribe][?(@.schemaFormat === void 0)].payload'
        ],
      );
      _tree[
        "$..[?( @property === 'get' || @property === 'put' || @property === 'post' )]"
      ](
        scope,
        _callbacks[
          "$..[?( @property === 'get' || @property === 'put' || @property === 'post' )]"
        ],
      );
      _tree[
        "$..paths..[?( @property === 'get' || @property === 'put' || @property === 'post' )]"
      ](
        scope,
        _callbacks[
          "$..paths..[?( @property === 'get' || @property === 'put' || @property === 'post' )]"
        ],
      );
      _tree['$.examples.*'](scope, _callbacks['$.examples.*']);
      _tree['$[1:-5:-2]'](scope, _callbacks['$[1:-5:-2]']);
    });
  } finally {
    scope.destroy();
  }
}
```

Since it's a valid ES Module, you can easily load it again and there's no need for `new Nimma`.

### Supported opts

- output: ES2018 | ES2021 | auto
- fallback
- unsafe

## Comparison vs jsonpath-plus and alikes

Nimma, although being yet-another-json-path query engine, it's considerably different from its JS counterparts.
Nimma takes dozens/hundreds/thousands of JSONPath expressions and attempt to form a proper JS code,
while packages like jsonpath-plus or jsonpath take a JSONPath expression and loop over its segments during the query.
They are meant to be executed on a single expression, whereas Nimma, for the most time, doesn't really care whether you supply it with 10s or 100s of paths.

Futhermore, Nimma, despite remaining close to the ~spec~, well, "spec", does make certain minor assumptions - the most notable being here that the order of query doesn't matter.
In order words, Nimma guarantees that all matching values will be returned, but doesn't assure any order.
This may be a deal breaker for some, but I haven't spotted such people in my life.
In reality, this would only matter if you used negative boundaries in Slice Expressions.
In addition to that, it also doesn't accumulate the results - this duties lies on the consumer.
These are tradeoffs that are likely to be negligible for the vast percentage of cases, yet they may play a role for some.

Unlike the aforementioned libraries, Nimma forbids any arbitrary code execution.
This is mostly thanks to a forked version of [jsep](https://github.com/EricSmekens/jsep) Nimma is equipped with, as well as a set of additional enforcements.
Due to that, it's not possible to reference any object or function, even if it exists in the given environment.
For instance, `$[?(Array.isArray(@)]` will throw an exception, same as `$[(?Object.prototype = {})]`, etc.
As a result, it's generally safer to execute these expressions, however there's no security guarantee here by any means,
and therefore it's still advisable to run Nimma in an isolated environment if JSONPath expressions cannot be trusted.

Since Nimma serves a different purpose, a use of other libraries is not ruled out.
It certainly doesn't aim to compete with any of them.
In fact, Nimma relies on `jsonpath-plus` under rare circumstances (mostly when "^" or "~" is not placed at the end of the expression).

### How does it actually work?

Nimma consists of 3 major components. These are:

- parser
- codegen (iterator/feedback + baseline)
- runtime (scope + sandbox + traverse)

Parser takes any JSON Path expression and generates an AST that's consumed by the codegen in the next step.

Codegen is a two-step process:

- first, we have a quick pass of the tree to collect some feedback about it that will be used by the actual code generators
- baseline processes the AST & the feedback gathered by the Iterator, and generates a decent ESTree-compliant AST representing that we dump later only
  - there's also a concept of "fast paths" implemented that are basically stubs for some common use cases to generate an even more efficient code

## LICENSE

[Apache License 2.0](https://github.com/P0lip/nimma/blob/master/LICENSE)
