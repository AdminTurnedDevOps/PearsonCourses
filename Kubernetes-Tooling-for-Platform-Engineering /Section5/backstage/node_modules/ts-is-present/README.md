# ts-is-present

The `ts-is-present` package provides common functions to let you filter out the `null` or `undefined`
values from arrays in your code AND end up with the types that you expect.

## Super short explanation

Install: `npm install --save ts-is-present`

``` typescript
import { isPresent, isDefined, isFilled } from 'ts-is-present';

arrayWithUndefinedAndNullValues.filter(isPresent)
arrayWithUndefinedValues.filter(isDefined)
arrayWithNullValues.filter(isFilled)
```

In a nutshell:

 - `isPresent`: Removes `undefined` and `null` values via a `filter`.
 - `isDefined`: Removes `undefined` values via a `filter`.
 - `isFilled`: Removes `null` values via a `filter`.
 - `hasPresentKey`: Removes everything that is not an object with the expected key present via a `filter`.
 - `hasValueAtKey`: The same as `hasPresentKey` but with an additional check for a particular value. 

## Short explanation

The following code feels like it should type check, but it does not:

![Failing code](https://i.imgur.com/d8EBtg6.png)

It fails because the TypeScript type checker can't intuit that the lambda function eliminates the undefined values:

![Reasons for failing code](https://i.imgur.com/32biELe.png)

This library provides the three `isPresent`, `isDefined` and `isFilled` functions to solve this issue in the way that you would
expect the `filter` function to work:

![Working code](https://i.imgur.com/WqgHTrU.png)

Use this library to dramatically simplify your TypeScript code and get the full power of your types.

## Use `isPresent` to drop all `Nothing` values

The `isDefined` and `isFilled` functions are only useful if you want `null` or `undefined` results to remain respectively
after you have performed some filtering operations. However, `isPresent` any values that represent nothing
from your results (`null`, `undefined` or `void`), like so:

``` typescript
import { isPresent } from 'ts-is-present';

type TestData = {
  data: string;
};

function getVoid(): void {
  return undefined;
}

const results: Array<TestData | undefined | null | void> = [
  { data: 'hello' },
  undefined,
  { data: 'world' },
  getVoid(),
  null,
  { data: 'wow' },

];

const definedResults: Array<TestData> = results.filter(isPresent);
```

As you can see, `isPresent` can drop `undefined`, `null` and `void` values from an array (where `void` values are
really just `undefined` in disguise). This makes it broadly applicable.

## Use `hasPresentKey` and `hasValueAtKey` to filter objects

If you want to find all of the objects in an array that have a particular field present, you can use `hasPresentKey`. For example:

``` typescript
const filesWithUrl = files.filter(hasPresentKey("url"));
 files[0].url // TS will know that this is present
```

If you want to find all of the objects with a particular field set to a particular value you can use `hasValueAtKey`:

``` typescript
type File = { type: "image", imageUrl: string } | { type: "pdf", pdfUrl: string };
const files: File[] = <some data here>;

const filesWithUrl = files.filter(hasValueKey("type", "image" as const));
files[0].type // TS will now know that this is "image"
```

These functions are useful in filtering out objects from arrays.

## Deeper Explanation

An example of the fundamental problem can be [found in the TypeScript bug tracker](https://github.com/microsoft/TypeScript/issues/16069) 
but we will try and explain it again simply here.

Firstly, TypeScript can not look at the following 
lambda function `x => x !== undefined` and derive the type `(t: T | undefined): t is T`. 
Instead, the best it can do is to derive the type: `(t: any): boolean`.

Secondly, TypeScript has two type definitions for the `filter` function. They are:

``` typescript
// Definition 1
filter<S extends T>(callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
    
// Definition 2
filter(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
```

If we look at those types carefully they differ in an interesting way. 

The second definition expects a callback function where the return type of that callback is `unknown`; 
this will be treated as a truthy value when the filtering is performed. Most importantly, in this 
function, if you give it an `Array<T>` then you will get back an `Array<T>`; even if the lambda 
that you provided "proves" that the type could be restricted further.

The first definition, however, expects that the return type of the callback will be `value is S` 
where the generic definition of `S extends T` applies. This means that, if you give this version of 
filter an `Array<T>` and a function that can tell if a particular `T` is actually of the more restrictive 
type `S` then it will give you back an `Array<S>`. This is the critical feature of the `filter` type definitions
that lets the functions defined in this library refine the types inside a filter.

In short, when you write the following code the second `filter` definition is used:

``` typescript
results.filter(x => x !== undefined)
```

However, when you use this library the first `filter` definition is used:

``` typescript
results.filter(isDefined)
```

That is why this library helps you derive the types you expect.

## Contributors

 - [Jack Tomaszewski](https://github.com/jtomaszewski)
 - [Robert Massaioli](https://github.com/robertmassaioli) (Maintainer) 