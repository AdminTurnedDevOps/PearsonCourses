import { expressionStatement, callExpression, memberExpression, stringLiteral } from '../ast/builders.mjs';
import fnParams from './fn-params.mjs';
import internalScope from './internal-scope.mjs';

function treeMethodCall(id) {
  const property = stringLiteral(id);
  return expressionStatement(callExpression(memberExpression(internalScope.tree, property, true), fnParams));
}

export { treeMethodCall as default };
