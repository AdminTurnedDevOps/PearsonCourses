'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isObject = require('./is-object.js');

function get(input, path) {
  if (path.length === 0 || !isObject['default'](input)) return input;
  let value = input;

  for (const segment of path.slice(0, path.length - 1)) {
    value = value[segment];
    if (!isObject['default'](value)) return;
  }

  return value[path[path.length - 1]];
}

exports['default'] = get;
