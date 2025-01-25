import { forOfStatement, arrayExpression, stringLiteral, variableDeclaration, variableDeclarator, identifier, blockStatement, callExpression, memberExpression } from '../ast/builders.mjs';
import scope from './scope.mjs';

function generateFallbackExpressions(fallback, expressions) {
  const path = identifier('path');
  return forOfStatement(variableDeclaration('const', [variableDeclarator(path)]), arrayExpression(expressions.map(stringLiteral)), blockStatement([callExpression(fallback, [identifier('input'), path, memberExpression(scope.callbacks, path, true)])]));
}

export { generateFallbackExpressions as default };
