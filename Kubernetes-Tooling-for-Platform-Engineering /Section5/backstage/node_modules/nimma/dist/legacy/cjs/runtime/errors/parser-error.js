'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var causeError = require('./cause-error.js');

class ParserError extends causeError['default'] {
  constructor(message, expression, extra) {
    super(message, extra);
    this.input = expression;
  }

}

exports['default'] = ParserError;
