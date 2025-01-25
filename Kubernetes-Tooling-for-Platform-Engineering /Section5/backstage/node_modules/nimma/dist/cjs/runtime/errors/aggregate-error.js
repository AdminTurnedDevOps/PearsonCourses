'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isObject = require('../codegen-functions/is-object.js');

// based on https://github.com/niksy/aggregate-error-ponyfill

function isIterable(value) {
  return isObject['default'](value) && typeof value[Symbol.iterator] === 'function';
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

exports['default'] = AggregateError;
