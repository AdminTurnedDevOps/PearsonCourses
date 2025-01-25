import { classPrivateFieldSet as _classPrivateFieldSet, classPrivateFieldGet as _classPrivateFieldGet } from '../_virtual/_rollupPluginBabelHelpers.js';
import baseline from '../codegen/baseline/index.mjs';
import * as index from '../runtime/index.mjs';
import getOutputFormat from './utils/determine-format.mjs';
import parseExpressions from './utils/parse-expressions.mjs';

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

    _classPrivateFieldSet(this, _fallback, fallback);

    _classPrivateFieldSet(this, _compiledFn, null);

    const {
      erroredExpressions,
      mappedExpressions
    } = parseExpressions(expressions, unsafe, fallback !== null);
    this.tree = baseline(mappedExpressions, {
      customShorthands,
      format: output === 'auto' ? getOutputFormat() : output,
      npmProvider
    });

    if (erroredExpressions.length > 0) {
      this.tree.attachFallbackExpressions(fallback, erroredExpressions);
    }

    this.sourceCode = String(this.tree);
  }

  query(input, callbacks) {
    if (_classPrivateFieldGet(this, _compiledFn) !== null) {
      _classPrivateFieldGet(this, _compiledFn).call(this, input, callbacks);

      return;
    }

    const globals = '__nimma_globals__';
    const code = this.sourceCode.replace('export default function', `return function`).replace(IMPORT_DECLARATIONS_REGEXP, `const $1 = ${globals};`).replace(RegExp(IMPORT_DECLARATIONS_REGEXP.source, 'g'), '');

    _classPrivateFieldSet(this, _compiledFn, Function(globals, ...(_classPrivateFieldGet(this, _fallback) === null ? [] : Array.from(_classPrivateFieldGet(this, _fallback).runtimeDeps.keys())), code)(index, ...(_classPrivateFieldGet(this, _fallback) === null ? [] : Array.from(_classPrivateFieldGet(this, _fallback).runtimeDeps.values()))));

    _classPrivateFieldGet(this, _compiledFn).call(this, input, callbacks);
  }

}

export { Nimma as default };
