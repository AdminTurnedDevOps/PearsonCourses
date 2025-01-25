'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getOutputFormat() {
  try {
    Function('a', 'a?.b')({});
    return 'ES2021';
  } catch {
    return 'ES2018';
  }
}

exports['default'] = getOutputFormat;
