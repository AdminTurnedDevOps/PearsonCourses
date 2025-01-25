import { Ast as AST, Parser } from 'apg-lite';
import Grammar from "../path-templating.mjs";
import slashCallback from "./callbacks/slash.mjs";
import pathTemplateCallback from "./callbacks/path-template.mjs";
import pathCallback from "./callbacks/path.mjs";
import pathLiteralCallback from "./callbacks/path-literal.mjs";
import queryCallback from "./callbacks/query.mjs";
import queryMarkerCallback from "./callbacks/query-marker.mjs";
import fragmentCallback from "./callbacks/fragment.mjs";
import fragmentMarkerCallback from "./callbacks/fragment-marker.mjs";
import templateExpressionCallback from "./callbacks/template-expression.mjs";
import templateExpressionParamNameCallback from "./callbacks/template-expression-param-name.mjs";
const grammar = new Grammar();
const parse = pathTemplate => {
  const parser = new Parser();
  parser.ast = new AST();
  parser.ast.callbacks['path-template'] = pathTemplateCallback;
  parser.ast.callbacks['path'] = pathCallback;
  parser.ast.callbacks['query'] = queryCallback;
  parser.ast.callbacks['query-marker'] = queryMarkerCallback;
  parser.ast.callbacks['fragment'] = fragmentCallback;
  parser.ast.callbacks['fragment-marker'] = fragmentMarkerCallback;
  parser.ast.callbacks['slash'] = slashCallback;
  parser.ast.callbacks['path-literal'] = pathLiteralCallback;
  parser.ast.callbacks['template-expression'] = templateExpressionCallback;
  parser.ast.callbacks['template-expression-param-name'] = templateExpressionParamNameCallback;
  const result = parser.parse(grammar, 'path-template', pathTemplate);
  return {
    result,
    ast: parser.ast
  };
};
export default parse;