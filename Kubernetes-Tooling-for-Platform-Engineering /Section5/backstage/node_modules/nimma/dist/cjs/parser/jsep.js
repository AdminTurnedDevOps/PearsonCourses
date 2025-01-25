'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var regex = require('@jsep-plugin/regex');
var ternary = require('@jsep-plugin/ternary');
var Jsep = require('jsep');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var regex__default = /*#__PURE__*/_interopDefaultLegacy(regex);
var ternary__default = /*#__PURE__*/_interopDefaultLegacy(ternary);
var Jsep__default = /*#__PURE__*/_interopDefaultLegacy(Jsep);

Jsep__default['default'].addIdentifierChar('@');
Jsep__default['default'].addUnaryOp('void');
Jsep__default['default'].addBinaryOp('in', 12);
Jsep__default['default'].addBinaryOp('~=', 20);
Jsep__default['default'].plugins.register(regex__default['default'], ternary__default['default']);
var jsep = (expr => Jsep__default['default'].parse(expr));

exports['default'] = jsep;
