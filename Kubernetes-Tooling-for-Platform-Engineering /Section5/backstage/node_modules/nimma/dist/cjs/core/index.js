'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../codegen/baseline/index.js');
var index$1 = require('../runtime/index.js');
var determineFormat = require('./utils/determine-format.js');
var parseExpressions = require('./utils/parse-expressions.js');

const IMPORT_DECLARATIONS_REGEXP = /import\s*({[^}]+})\s*from\s*['"][^'"]+['"];?/;
class Nimma {
  #fallback;
  #compiledFn;

  constructor(expressions, {
    fallback = null,
    unsafe = true,
    output = 'auto',
    npmProvider = null,
    customShorthands = null
  } = {}) {
    this.#fallback = fallback;
    this.#compiledFn = null;
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
    if (this.#compiledFn !== null) {
      this.#compiledFn(input, callbacks);
      return;
    }

    const globals = '__nimma_globals__';
    const code = this.sourceCode.replace('export default function', `return function`).replace(IMPORT_DECLARATIONS_REGEXP, `const $1 = ${globals};`).replace(RegExp(IMPORT_DECLARATIONS_REGEXP.source, 'g'), '');
    this.#compiledFn = Function(globals, ...(this.#fallback === null ? [] : Array.from(this.#fallback.runtimeDeps.keys())), code)(index$1, ...(this.#fallback === null ? [] : Array.from(this.#fallback.runtimeDeps.values())));
    this.#compiledFn(input, callbacks);
  }

}

exports['default'] = Nimma;
