import isObject from '../codegen-functions/is-object.mjs';

// based on https://github.com/niksy/aggregate-error-ponyfill

function isIterable(value) {
  return isObject(value) && typeof value[Symbol.iterator] === 'function';
}

var AggregateError = globalThis.AggregateError ?? class AggregateError extends Error {
  constructor(errors, message = '') {
    super(message);

    if (!Array.isArray(errors) && !isIterable(errors)) {
      throw new TypeError(`${errors} is not an iterable`);
    }

    this.errors = [...errors];
  }

};

export { AggregateError as default };
