"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
require("./browser-patch.cjs");
var _webTreeSitter = _interopRequireDefault(require("web-tree-sitter"));
var _apidomError = require("@swagger-api/apidom-error");
var _treeSitterJson = _interopRequireDefault(require("../../wasm/tree-sitter-json.wasm"));
// @ts-ignore

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
    parserInitLock = _webTreeSitter.default.init().then(() => _webTreeSitter.default.Language.load(_treeSitterJson.default)).then(jsonLanguage => {
      const parserInstance = new _webTreeSitter.default();
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
    throw new _apidomError.ApiDOMError('Error while initializing web-tree-sitter and loading tree-sitter-json grammar.');
  }
  return parser.parse(source);
};
var _default = exports.default = analyze;