'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtimeError = require('./errors/runtime-error.js');

function printPrimitive(value) {
  if (typeof value === 'string' || typeof value === 'number') {
    return JSON.stringify(value);
  }

  return 'unknown';
}

function printError(e) {
  if (e instanceof Error) {
    return `${e.constructor.name}(${printPrimitive(e.message)})`;
  }

  return printPrimitive(e);
}

function proxyCallbacks(callbacks, errors) {
  const _callbacks = {};

  for (const key of Object.keys(callbacks)) {
    const fn = callbacks[key];

    _callbacks[key] = (...args) => {
      try {
        fn(...args);
      } catch (e) {
        const message = `${fn.name || key} threw: ${printError(e)}`;
        errors.push(new runtimeError['default'](message, {
          cause: e
        }));
      }
    };
  }

  return _callbacks;
}

exports['default'] = proxyCallbacks;
