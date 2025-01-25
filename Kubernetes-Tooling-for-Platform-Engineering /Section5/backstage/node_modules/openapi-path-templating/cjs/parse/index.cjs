"use strict";

exports.__esModule = true;
exports.default = void 0;
var _apgLite = require("../apg-lite.cjs");
var _pathTemplating = _interopRequireDefault(require("../path-templating.cjs"));
var _slash = _interopRequireDefault(require("./callbacks/slash.cjs"));
var _pathTemplate = _interopRequireDefault(require("./callbacks/path-template.cjs"));
var _path = _interopRequireDefault(require("./callbacks/path.cjs"));
var _pathLiteral = _interopRequireDefault(require("./callbacks/path-literal.cjs"));
var _query = _interopRequireDefault(require("./callbacks/query.cjs"));
var _queryMarker = _interopRequireDefault(require("./callbacks/query-marker.cjs"));
var _fragment = _interopRequireDefault(require("./callbacks/fragment.cjs"));
var _fragmentMarker = _interopRequireDefault(require("./callbacks/fragment-marker.cjs"));
var _templateExpression = _interopRequireDefault(require("./callbacks/template-expression.cjs"));
var _templateExpressionParamName = _interopRequireDefault(require("./callbacks/template-expression-param-name.cjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const grammar = new _pathTemplating.default();
const parse = pathTemplate => {
  const parser = new _apgLite.Parser();
  parser.ast = new _apgLite.Ast();
  parser.ast.callbacks['path-template'] = _pathTemplate.default;
  parser.ast.callbacks['path'] = _path.default;
  parser.ast.callbacks['query'] = _query.default;
  parser.ast.callbacks['query-marker'] = _queryMarker.default;
  parser.ast.callbacks['fragment'] = _fragment.default;
  parser.ast.callbacks['fragment-marker'] = _fragmentMarker.default;
  parser.ast.callbacks['slash'] = _slash.default;
  parser.ast.callbacks['path-literal'] = _pathLiteral.default;
  parser.ast.callbacks['template-expression'] = _templateExpression.default;
  parser.ast.callbacks['template-expression-param-name'] = _templateExpressionParamName.default;
  const result = parser.parse(grammar, 'path-template', pathTemplate);
  return {
    result,
    ast: parser.ast
  };
};
var _default = exports.default = parse;