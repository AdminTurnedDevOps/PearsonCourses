# `@n1ru4l/push-pull-async-iterable-iterator`

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![npm version](https://img.shields.io/npm/v/@n1ru4l/push-pull-async-iterable-iterator)](https://www.npmjs.com/package/@n1ru4l/push-pull-async-iterable-iterator)
[![npm downloads](https://img.shields.io/npm/dm/@n1ru4l/push-pull-async-iterable-iterator)](https://www.npmjs.com/package/@n1ru4l/push-pull-async-iterable-iterator)
[![Dependents](https://img.shields.io/librariesio/dependents/npm/@n1ru4l/push-pull-async-iterable-iterator)](https://www.npmjs.com/browse/depended/@n1ru4l/push-pull-async-iterable-iterator)
[![Build Status](https://img.shields.io/github/workflow/status/n1ru4l/push-pull-async-iterable-iterator/CI)](https://github.com/n1ru4l/push-pull-async-iterable-iterator/actions)

Create an AsyncIterableIterator from anything (on any modern platform) while handling back-pressure!

```bash
yarn install -E @n1ru4l/push-pull-async-iterable-iterator
```

**Standalone Usage**

```ts
import { makePushPullAsyncIterableIterator } from "@n1ru4l/push-pull-async-iterable-iterator";

const {
  pushValue,
  asyncIterableIterator
} = makePushPullAsyncIterableIterator();
pushValue(1);
pushValue(2);
pushValue(3);

// prints 1, 2, 3
for await (const value of asyncIterableIterator) {
  console.log(value);
}
```

**Check if something is an AsyncIterable**

```ts
import { isAsyncIterable } from "@n1ru4l/push-pull-async-iterable-iterator";

if (isAsyncIterable(something)) {
  for await (const value of something) {
    console.log(value);
  }
}
```

_Note:_ On Safari iOS [`Symbol.asyncIterator` is not available](https://caniuse.com/mdn-javascript_builtins_symbol_asynciterator), therefore all async iterators used must be build using [AsyncGenerators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of#Iterating_over_async_generators).
If a AsyncIterable that is NO AsyncGenerator is passed to `isAsyncIterable` on the Safari iOS environment, it will return the value `false`.

**Wrap a Sink**

```ts
import { makeAsyncIterableIteratorFromSink } from "@n1ru4l/push-pull-async-iterable-iterator";
// let's use some GraphQL client :)
import { createClient } from "graphql-ws/lib/use/ws";

const client = createClient({
  url: "ws://localhost:3000/graphql"
});

const asyncIterableIterator = makeAsyncIterableIteratorFromSink(sink => {
  const dispose = client.subscribe(
    {
      query: "{ hello }"
    },
    {
      next: sink.next,
      error: sink.error,
      complete: sink.complete
    }
  );
  return () => dispose();
});

for await (const value of asyncIterableIterator) {
  console.log(value);
}
```

**Apply an AsyncIterableIterator to a sink**

```tsx
import Observable from "zen-observable";
import {
  makePushPullAsyncIterableIterator,
  applyAsyncIterableIteratorToSink
} from "@n1ru4l/push-pull-async-iterable-iterator";

const { asyncIterableIterator } = makePushPullAsyncIterableIterator();

const observable = new Observable(sink => {
  const dispose = applyAsyncIterableIteratorToSink(asyncIterableIterator, sink);
  // dispose will be called when the observable subscription got destroyed
  // the dispose call will ensure that the async iterator is completed.
  return () => dispose();
});

const subscription = observable.subscribe({
  next: console.log,
  complete: () => console.log("done."),
  error: () => console.log("error.")
});

const interval = setInterval(() => {
  iterator.push("hi");
}, 1000);

setTimeout(() => {
  subscription.unsubscribe();
  clearInterval(interval);
}, 5000);
```

**Put it all together**

```tsx
import { Observable, RequestParameters, Variables } from "relay-runtime";
import { createClient } from "graphql-ws/lib/use/ws";
import {
  makeAsyncIterableFromSink,
  applyAsyncIterableIteratorToSink
} from "@n1ru4l/push-pull-async-iterable-iterator";
import { createApplyLiveQueryPatch } from "@n1ru4l/graphql-live-query-patch";

const client = createClient({
  url: "ws://localhost:3000/graphql"
});

export const execute = (request: RequestParameters, variables: Variables) => {
  if (!request.text) {
    throw new Error("Missing document.");
  }
  const query = request.text;

  return Observable.create<GraphQLResponse>(sink => {
    // Create our asyncIterator from a Sink
    const executionResultIterator = makeAsyncIterableFromSink(wsSink => {
      const dispose = client.subscribe({ query }, wsSink);
      return () => dispose();
    });

    const applyLiveQueryPatch = createApplyLiveQueryPatch();

    // apply some middleware to our asyncIterator
    const compositeIterator = applyLiveQueryPatch(executionResultIterator);

    // Apply our async iterable to the relay sink
    // unfortunately relay cannot consume an async iterable right now.
    const dispose = applyAsyncIterableIteratorToSink(compositeIterator, sink);
    // dispose will be called by relay when the observable is disposed
    // the dispose call will ensure that the async iterator is completed.
    return () => dispose();
  });
};
```

## Operators

This package also ships a few utilities that make your life easier!

### `map`

Map a source

```ts
import { map } from "@n1ru4l/push-pull-async-iterable-iterator";

async function* source() {
  yield 1;
  yield 2;
  yield 3;
}

const square = map((value: number): number => value * value);

for await (const value of square(source())) {
  console.log(value);
}
// logs 1, 4, 9
```

### `filter`

Filter a source

```ts
import { filter } from "@n1ru4l/push-pull-async-iterable-iterator";

async function* source() {
  yield 1;
  yield 2;
  yield 3;
}

const biggerThan1 = filter((value: number): number => value > 1);

for await (const value of biggerThan1(source())) {
  console.log(value);
}
// logs 2, 3
```

## Other helpers

### `withHandlers`

Attach a return and throw handler to a source.

```ts
import { withReturn } from "@n1ru4l/push-pull-async-iterable-iterator";

async function* source() {
  yield 1;
  yield 2;
  yield 3;
}

const sourceInstance = source();

const newSourceWithHandlers = withHandlers(
  sourceInstance,
  () => sourceInstance.return(),
  err => sourceInstance.throw(err)
);

for await (const value of stream) {
  // ...
}
```
