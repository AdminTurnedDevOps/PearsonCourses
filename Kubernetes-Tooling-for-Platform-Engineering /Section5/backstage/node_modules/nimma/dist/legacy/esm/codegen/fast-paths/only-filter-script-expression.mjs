import jsep from '../../parser/jsep.mjs';
import { unaryExpression, blockStatement, ifStatement, stringLiteral, returnStatement, binaryExpression, numericLiteral } from '../ast/builders.mjs';
import { rewriteESTree } from '../baseline/generators.mjs';
import { isScriptFilterExpression, isDeep } from '../guards.mjs';
import generateEmitCall from '../templates/emit-call.mjs';
import scope from '../templates/scope.mjs';

// covers:
const TOP_LEVEL_DEPTH_IF_STATEMENT = ifStatement(binaryExpression('!==', scope.depth, numericLiteral(0)), returnStatement());
var onlyFilterScriptExpression = ((nodes, tree, ctx) => {
  if (nodes.length !== 1 || !isScriptFilterExpression(nodes[0])) {
    return false;
  }

  const condition = unaryExpression('!', rewriteESTree(tree, jsep(nodes[0].value), 0), true);
  tree.pushAll([[blockStatement([...(isDeep(nodes[0]) ? [] : [TOP_LEVEL_DEPTH_IF_STATEMENT]), ifStatement(condition, returnStatement()), generateEmitCall(ctx.id, ctx.iterator.modifiers)]), 'tree-method'], [stringLiteral(ctx.id), 'traverse']]);

  if (!isDeep(nodes[0])) {
    var _tree$traversalZones$;

    (_tree$traversalZones$ = tree.traversalZones.create()) === null || _tree$traversalZones$ === void 0 ? void 0 : _tree$traversalZones$.resize().attach();
  }

  return true;
});

export { onlyFilterScriptExpression as default };
