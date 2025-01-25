import { blockStatement, stringLiteral, ifStatement, returnStatement, binaryExpression, numericLiteral } from '../ast/builders.mjs';
import { isWildcardExpression, isDeep } from '../guards.mjs';
import generateEmitCall from '../templates/emit-call.mjs';
import scope from '../templates/scope.mjs';

// Covers:
const IS_NOT_ZERO_DEPTH_IF_STATEMENT = ifStatement(binaryExpression('!==', scope.depth, numericLiteral(0)), returnStatement());
var topLevelWildcard = ((nodes, tree, ctx) => {
  var _tree$traversalZones$;

  if (nodes.length !== 1 || !isWildcardExpression(nodes[0]) || isDeep(nodes[0])) {
    return false;
  }

  tree.push(blockStatement([IS_NOT_ZERO_DEPTH_IF_STATEMENT, generateEmitCall(ctx.id, ctx.iterator.modifiers)]), 'tree-method');
  tree.push(stringLiteral(ctx.id), 'traverse');
  (_tree$traversalZones$ = tree.traversalZones.create()) === null || _tree$traversalZones$ === void 0 ? void 0 : _tree$traversalZones$.resize().attach();
  return true;
});

export { topLevelWildcard as default };
