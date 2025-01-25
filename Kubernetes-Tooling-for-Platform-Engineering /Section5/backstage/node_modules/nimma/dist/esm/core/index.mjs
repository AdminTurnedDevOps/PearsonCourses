import baseline from '../codegen/baseline/index.mjs';
import * as index from '../runtime/index.mjs';
import getOutputFormat from './utils/determine-format.mjs';
import parseExpressions from './utils/parse-expressions.mjs';

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
    if (this.#compiledFn !== null) {
      this.#compiledFn(input, callbacks);
      return;
    }

    const globals = '__nimma_globals__';
    const code = this.sourceCode.replace('export default function', `return function`).replace(IMPORT_DECLARATIONS_REGEXP, `const $1 = ${globals};`).replace(RegExp(IMPORT_DECLARATIONS_REGEXP.source, 'g'), '');
    this.#compiledFn = Function(globals, ...(this.#fallback === null ? [] : Array.from(this.#fallback.runtimeDeps.keys())), code)(index, ...(this.#fallback === null ? [] : Array.from(this.#fallback.runtimeDeps.values())));
    this.#compiledFn(input, callbacks);
  }

}

export { Nimma as default };
