'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var causeError = require('./cause-error.js');

class RuntimeError extends causeError['default'] {}

exports['default'] = RuntimeError;
