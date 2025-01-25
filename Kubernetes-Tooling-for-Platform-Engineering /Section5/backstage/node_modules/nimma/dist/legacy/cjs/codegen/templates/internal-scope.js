'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');

var internalScope = {
  pos: builders.identifier('pos'),
  shorthands: builders.identifier('shorthands'),
  tree: builders.identifier('tree')
};

exports['default'] = internalScope;
