import { variableDeclaration, variableDeclarator, literal, memberExpression, callExpression, arrayExpression, identifier, blockStatement, expressionStatement, assignmentExpression, ifStatement, returnStatement, unaryExpression, binaryExpression, nullLiteral } from '../ast/builders.mjs';
import { isMemberExpression, isDeep } from '../guards.mjs';
import generateEmitCall from '../templates/emit-call.mjs';
import sandbox from '../templates/sandbox.mjs';
import scope from '../templates/scope.mjs';
import treeMethodCall from '../templates/tree-method-call.mjs';

// Examples
const VALUE_IDENTIFIER = identifier('value');
const IS_OBJECT_IDENTIFIER = identifier('isObject');
const GET_IDENTIFIER = identifier('get');
const IS_NOT_OBJECT_IF_STATEMENT = ifStatement(unaryExpression('!', callExpression(IS_OBJECT_IDENTIFIER, [VALUE_IDENTIFIER])), returnStatement());
const IS_NULL_SCOPE_IF_STATEMENT = ifStatement(binaryExpression('===', scope._, nullLiteral()), returnStatement());

function toLiteral(node) {
  return literal(node.value);
}

var fixed = ((nodes, tree, ctx) => {
  if (!nodes.every(isMemberExpression) || nodes.some(isDeep)) {
    return false;
  }

  const valueVariableDeclaration = variableDeclaration('const', [variableDeclarator(VALUE_IDENTIFIER, nodes.slice(0, -1).reduce((object, node) => {
    if (tree.format === 'ES2018') {
      object.arguments[1].elements.push(literal(node.value));
      return object;
    }

    return memberExpression(object, literal(node.value), true, true);
  }, tree.format === 'ES2018' && nodes.length > 0 ? callExpression(identifier('get'), [sandbox.root, arrayExpression([])]) : sandbox.root))]);
  tree.addRuntimeDependency(IS_OBJECT_IDENTIFIER.name);

  if (tree.format === 'ES2018') {
    tree.addRuntimeDependency(GET_IDENTIFIER.name);
  }

  tree.pushAll([[blockStatement([valueVariableDeclaration, IS_NOT_OBJECT_IF_STATEMENT, expressionStatement(assignmentExpression('=', scope._, callExpression(scope.fork, [arrayExpression(nodes.map(toLiteral))]))), IS_NULL_SCOPE_IF_STATEMENT, generateEmitCall(ctx.id, ctx.iterator.modifiers)]), 'tree-method'], [treeMethodCall(ctx.id), 'body']]);
  return true;
});

export { fixed as default };
