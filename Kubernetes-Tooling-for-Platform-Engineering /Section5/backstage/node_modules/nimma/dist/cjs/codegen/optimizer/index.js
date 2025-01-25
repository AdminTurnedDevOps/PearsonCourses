'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var internalScope = require('../templates/internal-scope.js');
var scope = require('../templates/scope.js');

function dropNode(branch, i) {
  branch.splice(i, 1);
  return i - 1;
}

function leftOrRight(node, left, right) {
  if (left === null) {
    return right;
  } else if (right === null) {
    return left;
  }

  node.left = left;
  node.right = right;
  return node;
}

function reduceBinaryExpression(node) {
  if (node.operator === '<' && node.left === scope['default'].depth) {
    return null;
  }

  return leftOrRight(node, eliminate(node.left), eliminate(node.right));
}

function eliminate(node) {
  switch (node.type) {
    case 'AssignmentExpression':
      if (node.left !== internalScope['default'].pos) {
        return node;
      }

      return eliminate(node.right);

    case 'ConditionalExpression':
      if (node.consequent.type === 'NumericLiteral' && node.consequent.value === -1) {
        return eliminate(node.test);
      }

      return node;

    case 'SequenceExpression':
      return eliminate(node.expressions[0]);

    case 'LogicalExpression':
      return leftOrRight(node, eliminate(node.left), eliminate(node.right));

    case 'BinaryExpression':
      return reduceBinaryExpression(node);

    case 'IfStatement':
      return eliminate(node.test);

    case 'Identifier':
      if (node === internalScope['default'].pos) {
        return null;
      }

      return node;

    case 'MemberExpression':
      node.property = eliminate(node.property);
      return node;

    default:
      return node;
  }
}

function optimizer(branch, iterator) {
  if (iterator.feedback.mutatesPos) return;
  let i = Math.max(0, Math.min(1, iterator.length));

  for (; i < branch.length; i++) {
    const node = branch[i];

    if (node.type === 'VariableDeclaration' && node.kind === 'let' && node.declarations[0].id === internalScope['default'].pos) {
      i = dropNode(branch, i);
      continue;
    }

    const test = eliminate(node);

    if (test === null || test === scope['default'].depth) {
      i = dropNode(branch, i);
    } else {
      node.test = test;
    }
  }
}

exports['default'] = optimizer;
