import { blockStatement, ifStatement, returnStatement, safeBinaryExpression, stringLiteral } from '../ast/builders.mjs';
import { isDeep, isMemberExpression } from '../guards.mjs';
import generateEmitCall from '../templates/emit-call.mjs';
import scope from '../templates/scope.mjs';

// covers:
var deepSingleMember = ((nodes, tree, ctx) => {
  if (nodes.length !== 1 || !isDeep(nodes[0]) || !isMemberExpression(nodes[0])) {
    return false;
  }

  tree.push(blockStatement([ifStatement(safeBinaryExpression('!==', scope.property, stringLiteral(nodes[0].value)), returnStatement()), generateEmitCall(ctx.id, ctx.iterator.modifiers)]), 'tree-method');
  tree.push(stringLiteral(ctx.id), 'traverse');
  return true;
});

export { deepSingleMember as default };
