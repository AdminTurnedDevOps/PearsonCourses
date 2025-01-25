'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsep = require('jsep');
var reduce = require('./reduce.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var jsep__default = /*#__PURE__*/_interopDefaultLegacy(jsep);

function parse(expr) {
  try {
    return jsep__default['default'](expr);
  } catch (ex) {
    throw SyntaxError(ex.message);
  }
}

var index = (expr, ctx) => {
  const tree = typeof expr === 'object' ? expr : parse(expr);
  return reduce['default'](tree, Object.freeze(ctx));
};

exports.default = index;
