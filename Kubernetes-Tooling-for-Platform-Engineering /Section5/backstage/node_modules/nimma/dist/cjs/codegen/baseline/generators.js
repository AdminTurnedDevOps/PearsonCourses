'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsep = require('../../parser/jsep.js');
var builders = require('../ast/builders.js');
var internalScope = require('../templates/internal-scope.js');
var sandbox = require('../templates/sandbox.js');
var scope = require('../templates/scope.js');

function generateMemberExpression(iterator, {
  deep,
  value
}) {
  if (iterator.feedback.bailed) {
    return builders.safeBinaryExpression('!==', scope['default'].property, builders.literal(value));
  }

  if (iterator.state.inverted) {
    return builders.safeBinaryExpression('!==', iterator.state.pos === 0 ? scope['default'].property : builders.memberExpression(scope['default'].path, builders.binaryExpression('-', scope['default'].depth, builders.numericLiteral(Math.abs(iterator.state.pos))), true), builders.literal(value));
  }

  if (deep) {
    var _iterator$feedback;

    const isLastNode = iterator.nextNode === null || iterator.nextNode === 'KeyExpression';
    (_iterator$feedback = iterator.feedback).mutatesPos || (_iterator$feedback.mutatesPos = !isLastNode);
    const right = builders.sequenceExpression([builders.assignmentExpression('=', internalScope['default'].pos, isLastNode ? builders.conditionalExpression(builders.safeBinaryExpression('!==', scope['default'].property, builders.literal(value)), builders.numericLiteral(-1), scope['default'].depth) : builders.callExpression(builders.memberExpression(scope['default'].path, builders.identifier('indexOf')), [builders.literal(value), iterator.state.pos === 0 ? internalScope['default'].pos : builders.binaryExpression('+', internalScope['default'].pos, builders.numericLiteral(1))])), builders.binaryExpression('===', internalScope['default'].pos, builders.numericLiteral(-1))]);

    if (isLastNode) {
      return builders.logicalExpression('||', builders.binaryExpression('<', scope['default'].depth, iterator.state.pos === 0 ? internalScope['default'].pos : builders.binaryExpression('+', internalScope['default'].pos, builders.numericLiteral(iterator.state.pos))), right);
    }

    return right;
  }

  let left;

  if (!iterator.feedback.fixed && iterator.state.absolutePos !== 0) {
    left = builders.binaryExpression('<', scope['default'].depth, iterator.state.pos === 0 ? internalScope['default'].pos : builders.binaryExpression('+', internalScope['default'].pos, builders.numericLiteral(iterator.state.pos)));
  }

  const right = builders.safeBinaryExpression('!==', builders.memberExpression(scope['default'].path, iterator.state.pos === 0 ? builders.numericLiteral(0) : iterator.feedback.fixed ? builders.numericLiteral(iterator.state.pos) : builders.binaryExpression('+', internalScope['default'].pos, builders.numericLiteral(iterator.state.pos)), true), builders.literal(value));
  return left !== void 0 ? builders.logicalExpression('||', left, right) : right;
}
function generateMultipleMemberExpression(iterator, node) {
  return node.value.slice(1).reduce((concat, member) => builders.logicalExpression('&&', concat, generateMemberExpression(iterator, {
    type: 'MemberExpression',
    value: member,
    // eslint-disable-next-line sort-keys
    deep: node.deep
  })), generateMemberExpression(iterator, {
    type: 'MemberExpression',
    value: node.value[0],
    // eslint-disable-next-line sort-keys
    deep: node.deep
  }));
}
const IN_BOUNDS_IDENTIFIER = builders.identifier('inBounds');
function generateSliceExpression(iterator, node, tree) {
  const member = iterator.state.inverted ? builders.binaryExpression('-', scope['default'].depth, builders.numericLiteral(iterator.state.pos)) : iterator.state.pos === 0 ? builders.numericLiteral(0) : iterator.feedback.fixed ? builders.numericLiteral(iterator.state.pos) : builders.binaryExpression('+', internalScope['default'].pos, builders.numericLiteral(iterator.state.pos));
  const path = iterator.feedback.bailed ? scope['default'].property : builders.memberExpression(scope['default'].path, member, true);
  const isNumberBinaryExpression = builders.binaryExpression('!==', builders.unaryExpression('typeof', path), builders.stringLiteral('number'));
  const hasNegativeIndex = node.value.some(value => Number.isFinite(value) && value < 0);

  if (hasNegativeIndex) {
    tree.addRuntimeDependency(IN_BOUNDS_IDENTIFIER.name);
    return builders.binaryExpression('||', isNumberBinaryExpression, builders.unaryExpression('!', builders.callExpression(IN_BOUNDS_IDENTIFIER, [iterator.state.absolutePos === 0 ? remapSandbox(sandbox['default'].value, iterator.state.absolutePos - 2) : remapSandbox(sandbox['default'].value, iterator.state.absolutePos), builders.memberExpression(scope['default'].path, iterator.feedback.bailed ? builders.binaryExpression('-', builders.memberExpression(scope['default'].path, builders.identifier('length')), builders.numericLiteral(1)) : member, true), ...node.value.map(value => builders.numericLiteral(value))])));
  }

  return node.value.reduce((merged, value, i) => {
    if (i === 0 && value === 0) {
      return merged;
    }

    if (i === 1 && !Number.isFinite(value)) {
      return merged;
    }

    if (i === 2 && value === 1) {
      return merged;
    }

    const operator = i === 0 ? '<' : i === 1 ? '>=' : '%';
    const expression = builders.binaryExpression(operator, path, builders.numericLiteral(Number(value)));
    return builders.logicalExpression('||', merged, operator === '%' ? builders.logicalExpression('&&', builders.binaryExpression('!==', path, builders.numericLiteral(node.value[0])), builders.binaryExpression('!==', expression, builders.numericLiteral(node.value[0]))) : expression);
  }, isNumberBinaryExpression);
}
function generateWildcardExpression(iterator) {
  if (iterator.feedback.bailed) {
    return builders.booleanLiteral(false);
  } else if (iterator.nextNode === null && !iterator.feedback.fixed) {
    return builders.sequenceExpression([builders.assignmentExpression('=', internalScope['default'].pos, builders.conditionalExpression(builders.binaryExpression('<', scope['default'].depth, builders.numericLiteral(iterator.state.pos)), builders.numericLiteral(-1), scope['default'].depth)), builders.binaryExpression('===', internalScope['default'].pos, builders.numericLiteral(-1))]);
  } else {
    return null;
  }
}
function generateFilterScriptExpression(iterator, {
  deep,
  value
}, tree) {
  var _iterator$feedback2;

  const esTree = jsep['default'](value);
  assertDefinedIdentifier(esTree);
  const node = builders.unaryExpression('!', rewriteESTree(tree, esTree, iterator.state.fixed && iterator.state.pos > 0 && iterator.nextNode !== null ? iterator.state.pos + 1 : iterator.state.inverted && iterator.state.pos !== 0 ? iterator.state.pos - 1 : 0));
  if (iterator.feedback.bailed || !deep || iterator.state.inverted) return node;
  (_iterator$feedback2 = iterator.feedback).mutatesPos || (_iterator$feedback2.mutatesPos = iterator.nextNode !== null && iterator.nextNode !== 'KeyExpression');
  const assignment = builders.sequenceExpression([builders.assignmentExpression('=', internalScope['default'].pos, builders.conditionalExpression(node, builders.numericLiteral(-1), scope['default'].depth)), builders.binaryExpression('===', internalScope['default'].pos, builders.numericLiteral(-1))]);
  if (iterator.state.pos === 0) return assignment;
  return builders.logicalExpression('||', builders.binaryExpression('<', scope['default'].depth, iterator.state.pos === 0 ? internalScope['default'].pos : builders.binaryExpression('+', internalScope['default'].pos, builders.numericLiteral(iterator.state.pos))), assignment);
}
function rewriteESTree(tree, node, pos) {
  switch (node.type) {
    case 'LogicalExpression':
    case 'BinaryExpression':
      if (node.operator === 'in') {
        node.operator = '===';
        node.left = builders.callExpression(builders.memberExpression(node.right, builders.identifier('includes')), [rewriteESTree(tree, node.left, pos)]);
        node.right = builders.booleanLiteral(true);
      } else if (node.operator === '~=') {
        node.operator = '===';

        if (node.right.type !== 'Literal') {
          throw SyntaxError('Expected string');
        }

        node.left = builders.callExpression(builders.memberExpression(builders.regExpLiteral(node.right.value, ''), builders.identifier('test')), [rewriteESTree(tree, node.left, pos)]);
        node.right = builders.booleanLiteral(true);
      } else {
        node.left = rewriteESTree(tree, node.left, pos);
        node.right = rewriteESTree(tree, node.right, pos);
        assertDefinedIdentifier(node.left);
        assertDefinedIdentifier(node.right);
      }

      break;

    case 'UnaryExpression':
      node.argument = rewriteESTree(tree, node.argument, pos);
      assertDefinedIdentifier(node.argument);
      return node;

    case 'MemberExpression':
      node.object = rewriteESTree(tree, node.object, pos);
      assertDefinedIdentifier(node.object);
      node.property = rewriteESTree(tree, node.property, pos);

      if (node.computed) {
        assertDefinedIdentifier(node.property);
      }

      break;

    case 'CallExpression':
      if (node.callee.type === 'Identifier' && node.callee.name.startsWith('@')) {
        return processAtIdentifier(tree, node.callee.name, pos);
      }

      node.callee = rewriteESTree(tree, node.callee, pos);
      node.arguments = node.arguments.map(argument => rewriteESTree(tree, argument, pos));

      if (node.callee.type === 'MemberExpression' && node.callee.object === sandbox['default'].property && node.callee.property.name in String.prototype) {
        node.callee.object = builders.callExpression(builders.identifier('String'), [node.callee.object]);
      }

      assertDefinedIdentifier(node.callee);
      break;

    case 'Identifier':
      if (node.name.startsWith('@')) {
        return processAtIdentifier(tree, node.name, pos);
      }

      if (node.name === 'undefined') {
        return builders.unaryExpression('void', builders.numericLiteral(0));
      }

      if (node.name === 'index') {
        return sandbox['default'].index;
      }

      break;
  }

  return node;
}

function processAtIdentifier(tree, name, pos) {
  switch (name) {
    case '@':
      return remapSandbox(sandbox['default'].value, pos);

    case '@root':
      return remapSandbox(sandbox['default'].root, pos);

    case '@path':
      return remapSandbox(sandbox['default'].path, pos);

    case '@property':
      return remapSandbox(sandbox['default'].property, pos);

    case '@parent':
      return remapSandbox(sandbox['default'].parentValue, pos);

    case '@parentProperty':
      return remapSandbox(sandbox['default'].parentProperty, pos);

    case '@string':
    case '@number':
    case '@boolean':
      return builders.binaryExpression('===', builders.unaryExpression('typeof', remapSandbox(sandbox['default'].value, pos)), builders.stringLiteral(name.slice(1)));

    case '@scalar':
      return builders.logicalExpression('||', builders.binaryExpression('===', remapSandbox(sandbox['default'].value, pos), builders.nullLiteral()), builders.binaryExpression('!==', builders.unaryExpression('typeof', remapSandbox(sandbox['default'].value, pos)), builders.stringLiteral('object')));

    case '@array':
      return builders.callExpression(builders.memberExpression(builders.identifier('Array'), builders.identifier('isArray')), [remapSandbox(sandbox['default'].value, pos)]);

    case '@null':
      return builders.binaryExpression('===', remapSandbox(sandbox['default'].value, pos), builders.nullLiteral());

    case '@object':
      return builders.logicalExpression('&&', builders.binaryExpression('!==', remapSandbox(sandbox['default'].value, pos), builders.nullLiteral()), builders.binaryExpression('===', builders.unaryExpression('typeof', remapSandbox(sandbox['default'].value, pos)), builders.stringLiteral('object')));

    case '@integer':
      return builders.callExpression(builders.memberExpression(builders.identifier('Number'), builders.identifier('isInteger')), [remapSandbox(sandbox['default'].value, pos)]);

    default:
      if (name.startsWith('@@')) {
        const shorthandName = name.slice(2);
        tree.attachCustomShorthand(shorthandName);
        return builders.callExpression(builders.memberExpression(internalScope['default'].shorthands, builders.identifier(shorthandName)), [scope['default']._]);
      }

      throw new SyntaxError(`Unsupported shorthand '${name}'`);
  }
}

const KNOWN_IDENTIFIERS = [scope['default']._.name, 'index'];

function assertDefinedIdentifier(node) {
  if (node.type !== 'Identifier') return;
  if (KNOWN_IDENTIFIERS.includes(node.name)) return;
  throw ReferenceError(`'${node.name}' is not defined`);
}

function remapSandbox(node, pos) {
  if (node.type === 'MemberExpression' && pos !== 0) {
    return { ...node,
      object: builders.callExpression(sandbox['default'].at, [builders.numericLiteral(pos)])
    };
  }

  return node;
}

exports.generateFilterScriptExpression = generateFilterScriptExpression;
exports.generateMemberExpression = generateMemberExpression;
exports.generateMultipleMemberExpression = generateMultipleMemberExpression;
exports.generateSliceExpression = generateSliceExpression;
exports.generateWildcardExpression = generateWildcardExpression;
exports.rewriteESTree = rewriteESTree;
