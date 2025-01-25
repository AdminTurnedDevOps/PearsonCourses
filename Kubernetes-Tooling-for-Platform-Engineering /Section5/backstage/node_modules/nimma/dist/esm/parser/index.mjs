import ParserError from '../runtime/errors/parser-error.mjs';
import * as parser from './parser.mjs';

const {
  parse
} = parser;
function parse$1 (input) {
  try {
    return parse(input);
  } catch (e) {
    throw new ParserError(e.message, input, {
      cause: e
    });
  }
}

export { parse$1 as default };
