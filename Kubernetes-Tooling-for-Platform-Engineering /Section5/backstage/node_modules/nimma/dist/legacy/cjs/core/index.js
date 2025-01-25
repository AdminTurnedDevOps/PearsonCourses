'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');
var index = require('../codegen/baseline/index.js');
var index$1 = require('../runtime/index.js');
var determineFormat = require('./utils/determine-format.js');
var parseExpressions = require('./utils/parse-expressions.js');

const IMPORT_DECLARATIONS_REGEXP = /import\s*({[^}]+})\s*from\s*['"][^'"]+['"];?/;

var _fallback = /*#__PURE__*/new WeakMap();

var _compiledFn = /*#__PURE__*/new WeakMap();

class Nimma {
  constructor(expressions, {
    fallback = null,
    unsafe = true,
    output = 'auto',
    npmProvider = null,
    customShorthands = null
  } = {}) {
    _fallback.set(this, {
      writable: true,
      value: void 0
    });

    _compiledFn.set(this, {
      writable: true,
      value: void 0
    });

    _rollupPluginBabelHelpers.classPrivateFieldSet(this, _fallback, fallback);

    _rollupPluginBabelHelpers.classPrivateFieldSet(this, _compiledFn, null);

    const {
      erroredExpressions,
      mappedExpressions
    } = parseExpressions['default'](expressions, unsafe, fallback !== null);
    this.tree = index['default'](mappedExpressions, {
      customShorthands,
      format: output === 'auto' ? determineFormat['default']() : output,
      npmProvider
    });

    if (erroredExpressions.length > 0) {
      this.tree.attachFallbackExpressions(fallback, erroredExpressions);
    }

    this.sourceCode = String(this.tree);
  }

  query(input, callbacks) {
    if (_rollupPluginBabelHelpers.classPrivateFieldGet(this, _compiledFn) !== null) {
      _rollupPluginBabelHelpers.classPrivateFieldGet(this, _compiledFn).call(this, input, callbacks);

      return;
    }

    const globals = '__nimma_globals__';
    const code = this.sourceCode.replace('export default function', `return function`).replace(IMPORT_DECLARATIONS_REGEXP, `const $1 = ${globals};`).replace(RegExp(IMPORT_DECLARATIONS_REGEXP.source, 'g'), '');

    _rollupPluginBabelHelpers.classPrivateFieldSet(this, _compiledFn, Function(globals, ...(_rollupPluginBabelHelpers.classPrivateFieldGet(this, _fallback) === null ? [] : Array.from(_rollupPluginBabelHelpers.classPrivateFieldGet(this, _fallback).runtimeDeps.keys())), code)(index$1, ...(_rollupPluginBabelHelpers.classPrivateFieldGet(this, _fallback) === null ? [] : Array.from(_rollupPluginBabelHelpers.classPrivateFieldGet(this, _fallback).runtimeDeps.values()))));

    _rollupPluginBabelHelpers.classPrivateFieldGet(this, _compiledFn).call(this, input, callbacks);
  }

}

exports['default'] = Nimma;
