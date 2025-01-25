import "./browser-patch.mjs";
import Parser from 'web-tree-sitter';
import { ApiDOMError } from '@swagger-api/apidom-error';

// @ts-ignore
import treeSitterYaml from '../../wasm/tree-sitter-yaml.wasm';
let parser = null;
let parserInitLock = null;

/**
 * Lexical Analysis of source string using WebTreeSitter.
 * This is WebAssembly version of TreeSitters Lexical Analysis.
 *
 * Given JavaScript doesn't support true parallelism, this
 * code should be as lazy as possible and temporal safety should be fine.
 * @public
 */
const analyze = async source => {
  if (parser === null && parserInitLock === null) {
    // acquire lock
    parserInitLock = Parser.init().then(() => Parser.Language.load(treeSitterYaml)).then(jsonLanguage => {
      const parserInstance = new Parser();
      parserInstance.setLanguage(jsonLanguage);
      return parserInstance;
    }).finally(() => {
      // release lock
      parserInitLock = null;
    });
    parser = await parserInitLock;
  } else if (parser === null && parserInitLock !== null) {
    // await for lock to be released if there is one
    parser = await parserInitLock;
  } else if (parser === null) {
    throw new ApiDOMError('Error while initializing web-tree-sitter and loading tree-sitter-yaml grammar.');
  }
  return parser.parse(source);
};
export default analyze;