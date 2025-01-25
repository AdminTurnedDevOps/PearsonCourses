import { blockStatement, stringLiteral, identifier, ifStatement, returnStatement, unaryExpression, callExpression } from '../ast/builders.mjs';
import generateEmitCall from '../templates/emit-call.mjs';
import sandbox from '../templates/sandbox.mjs';

// covers:
const IS_OBJECT_IDENTIFIER = identifier('isObject');
const IS_NOT_OBJECT_IF_STATEMENT = ifStatement(unaryExpression('!', callExpression(IS_OBJECT_IDENTIFIER, [sandbox.value])), returnStatement());
const EMIT_ROOT_CALL_EXPRESSION = generateEmitCall('$..', {
  keyed: false,
  parents: 0
});
var allParents = ((nodes, tree, ctx) => {
  if (nodes.length !== 1 || nodes[0].type !== 'AllParentExpression') {
    return false;
  }

  tree.addRuntimeDependency(IS_OBJECT_IDENTIFIER.name);
  tree.push(blockStatement([IS_NOT_OBJECT_IF_STATEMENT, generateEmitCall(ctx.id, ctx.iterator.modifiers)]), 'tree-method');
  tree.push(stringLiteral(ctx.id), 'traverse');
  tree.push(EMIT_ROOT_CALL_EXPRESSION, 'body');
  return true;
});

export { allParents as default };
