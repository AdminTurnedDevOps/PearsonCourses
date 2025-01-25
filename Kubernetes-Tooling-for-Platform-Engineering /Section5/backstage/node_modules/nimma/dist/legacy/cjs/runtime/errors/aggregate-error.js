'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isObject = require('../codegen-functions/is-object.js');

var _globalThis$Aggregate;

function isIterable(value) {
  return isObject['default'](value) && typeof value[Symbol.iterator] === 'function';
}

var AggregateError = (_globalThis$Aggregate = globalThis.AggregateError) !== null && _globalThis$Aggregate !== void 0 ? _globalThis$Aggregate : class AggregateError extends Error {
  constructor(errors, message = '') {
    super(message);

    if (!Array.isArray(errors) && !isIterable(errors)) {
      throw new TypeError(`${errors} is not an iterable`);
    }

    this.errors = [...errors];
  }

};

exports['default'] = AggregateError;
