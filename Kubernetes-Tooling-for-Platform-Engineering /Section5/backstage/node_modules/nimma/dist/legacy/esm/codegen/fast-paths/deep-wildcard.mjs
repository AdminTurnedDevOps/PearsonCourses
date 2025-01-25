import { blockStatement, stringLiteral } from '../ast/builders.mjs';
import { isWildcardExpression, isDeep } from '../guards.mjs';
import generateEmitCall from '../templates/emit-call.mjs';

// covers:
var deepWildcard = ((nodes, tree, ctx) => {
  if (nodes.length !== 1 || !isWildcardExpression(nodes[0]) || !isDeep(nodes[0])) {
    return false;
  }

  tree.push(blockStatement([generateEmitCall(ctx.id, ctx.iterator.modifiers)]), 'tree-method');
  tree.push(stringLiteral(ctx.id), 'traverse');
  return true;
});

export { deepWildcard as default };
