import { expressionStatement, callExpression, stringLiteral, numericLiteral, booleanLiteral } from '../ast/builders.mjs';
import scope from './scope.mjs';

function generateEmitCall(id, {
  parents,
  keyed
}) {
  // can emit check
  // todo: add check
  return expressionStatement(callExpression(scope.emit, [stringLiteral(id), numericLiteral(parents), booleanLiteral(keyed)]));
}

export { generateEmitCall as default };
