'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var parserError = require('../runtime/errors/parser-error.js');
var parser = require('./parser.js');

const {
  parse
} = parser;
function parse$1 (input) {
  try {
    return parse(input);
  } catch (e) {
    throw new parserError['default'](e.message, input, {
      cause: e
    });
  }
}

exports['default'] = parse$1;
