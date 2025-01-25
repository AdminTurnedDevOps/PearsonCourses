import jsep from '../../parser/jsep.mjs';
import { logicalExpression, safeBinaryExpression, literal, memberExpression, binaryExpression, numericLiteral, sequenceExpression, assignmentExpression, conditionalExpression, callExpression, identifier, unaryExpression, booleanLiteral, regExpLiteral, stringLiteral, nullLiteral } from '../ast/builders.mjs';
import internalScope from '../templates/internal-scope.mjs';
import sandbox from '../templates/sandbox.mjs';
import scope from '../templates/scope.mjs';

function generateMemberExpression(iterator, {
  deep,
  value
}) {
  if (iterator.feedback.bailed) {
    return safeBinaryExpression('!==', scope.property, literal(value));
  }

  if (iterator.state.inverted) {
    return safeBinaryExpression('!==', iterator.state.pos === 0 ? scope.property : memberExpression(scope.path, binaryExpression('-', scope.depth, numericLiteral(Math.abs(iterator.state.pos))), true), literal(value));
  }

  if (deep) {
    var _iterator$feedback;

    const isLastNode = iterator.nextNode === null || iterator.nextNode === 'KeyExpression';
    (_iterator$feedback = iterator.feedback).mutatesPos || (_iterator$feedback.mutatesPos = !isLastNode);
    const right = sequenceExpression([assignmentExpression('=', internalScope.pos, isLastNode ? conditionalExpression(safeBinaryExpression('!==', scope.property, literal(value)), numericLiteral(-1), scope.depth) : callExpression(memberExpression(scope.path, identifier('indexOf')), [literal(value), iterator.state.pos === 0 ? internalScope.pos : binaryExpression('+', internalScope.pos, numericLiteral(1))])), binaryExpression('===', internalScope.pos, numericLiteral(-1))]);

    if (isLastNode) {
      return logicalExpression('||', binaryExpression('<', scope.depth, iterator.state.pos === 0 ? internalScope.pos : binaryExpression('+', internalScope.pos, numericLiteral(iterator.state.pos))), right);
    }

    return right;
  }

  let left;

  if (!iterator.feedback.fixed && iterator.state.absolutePos !== 0) {
    left = binaryExpression('<', scope.depth, iterator.state.pos === 0 ? internalScope.pos : binaryExpression('+', internalScope.pos, numericLiteral(iterator.state.pos)));
  }

  const right = safeBinaryExpression('!==', memberExpression(scope.path, iterator.state.pos === 0 ? numericLiteral(0) : iterator.feedback.fixed ? numericLiteral(iterator.state.pos) : binaryExpression('+', internalScope.pos, numericLiteral(iterator.state.pos)), true), literal(value));
  return left !== void 0 ? logicalExpression('||', left, right) : right;
}
function generateMultipleMemberExpression(iterator, node) {
  return node.value.slice(1).reduce((concat, member) => logicalExpression('&&', concat, generateMemberExpression(iterator, {
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
const IN_BOUNDS_IDENTIFIER = identifier('inBounds');
function generateSliceExpression(iterator, node, tree) {
  const member = iterator.state.inverted ? binaryExpression('-', scope.depth, numericLiteral(iterator.state.pos)) : iterator.state.pos === 0 ? numericLiteral(0) : iterator.feedback.fixed ? numericLiteral(iterator.state.pos) : binaryExpression('+', internalScope.pos, numericLiteral(iterator.state.pos));
  const path = iterator.feedback.bailed ? scope.property : memberExpression(scope.path, member, true);
  const isNumberBinaryExpression = binaryExpression('!==', unaryExpression('typeof', path), stringLiteral('number'));
  const hasNegativeIndex = node.value.some(value => Number.isFinite(value) && value < 0);

  if (hasNegativeIndex) {
    tree.addRuntimeDependency(IN_BOUNDS_IDENTIFIER.name);
    return binaryExpression('||', isNumberBinaryExpression, unaryExpression('!', callExpression(IN_BOUNDS_IDENTIFIER, [iterator.state.absolutePos === 0 ? remapSandbox(sandbox.value, iterator.state.absolutePos - 2) : remapSandbox(sandbox.value, iterator.state.absolutePos), memberExpression(scope.path, iterator.feedback.bailed ? binaryExpression('-', memberExpression(scope.path, identifier('length')), numericLiteral(1)) : member, true), ...node.value.map(value => numericLiteral(value))])));
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
    const expression = binaryExpression(operator, path, numericLiteral(Number(value)));
    return logicalExpression('||', merged, operator === '%' ? logicalExpression('&&', binaryExpression('!==', path, numericLiteral(node.value[0])), binaryExpression('!==', expression, numericLiteral(node.value[0]))) : expression);
  }, isNumberBinaryExpression);
}
function generateWildcardExpression(iterator) {
  if (iterator.feedback.bailed) {
    return booleanLiteral(false);
  } else if (iterator.nextNode === null && !iterator.feedback.fixed) {
    return sequenceExpression([assignmentExpression('=', internalScope.pos, conditionalExpression(binaryExpression('<', scope.depth, numericLiteral(iterator.state.pos)), numericLiteral(-1), scope.depth)), binaryExpression('===', internalScope.pos, numericLiteral(-1))]);
  } else {
    return null;
  }
}
function generateFilterScriptExpression(iterator, {
  deep,
  value
}, tree) {
  var _iterator$feedback2;

  const esTree = jsep(value);
  assertDefinedIdentifier(esTree);
  const node = unaryExpression('!', rewriteESTree(tree, esTree, iterator.state.fixed && iterator.state.pos > 0 && iterator.nextNode !== null ? iterator.state.pos + 1 : iterator.state.inverted && iterator.state.pos !== 0 ? iterator.state.pos - 1 : 0));
  if (iterator.feedback.bailed || !deep || iterator.state.inverted) return node;
  (_iterator$feedback2 = iterator.feedback).mutatesPos || (_iterator$feedback2.mutatesPos = iterator.nextNode !== null && iterator.nextNode !== 'KeyExpression');
  const assignment = sequenceExpression([assignmentExpression('=', internalScope.pos, conditionalExpression(node, numericLiteral(-1), scope.depth)), binaryExpression('===', internalScope.pos, numericLiteral(-1))]);
  if (iterator.state.pos === 0) return assignment;
  return logicalExpression('||', binaryExpression('<', scope.depth, iterator.state.pos === 0 ? internalScope.pos : binaryExpression('+', internalScope.pos, numericLiteral(iterator.state.pos))), assignment);
}
function rewriteESTree(tree, node, pos) {
  switch (node.type) {
    case 'LogicalExpression':
    case 'BinaryExpression':
      if (node.operator === 'in') {
        node.operator = '===';
        node.left = callExpression(memberExpression(node.right, identifier('includes')), [rewriteESTree(tree, node.left, pos)]);
        node.right = booleanLiteral(true);
      } else if (node.operator === '~=') {
        node.operator = '===';

        if (node.right.type !== 'Literal') {
          throw SyntaxError('Expected string');
        }

        node.left = callExpression(memberExpression(regExpLiteral(node.right.value, ''), identifier('test')), [rewriteESTree(tree, node.left, pos)]);
        node.right = booleanLiteral(true);
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

      if (node.callee.type === 'MemberExpression' && node.callee.object === sandbox.property && node.callee.property.name in String.prototype) {
        node.callee.object = callExpression(identifier('String'), [node.callee.object]);
      }

      assertDefinedIdentifier(node.callee);
      break;

    case 'Identifier':
      if (node.name.startsWith('@')) {
        return processAtIdentifier(tree, node.name, pos);
      }

      if (node.name === 'undefined') {
        return unaryExpression('void', numericLiteral(0));
      }

      if (node.name === 'index') {
        return sandbox.index;
      }

      break;
  }

  return node;
}

function processAtIdentifier(tree, name, pos) {
  switch (name) {
    case '@':
      return remapSandbox(sandbox.value, pos);

    case '@root':
      return remapSandbox(sandbox.root, pos);

    case '@path':
      return remapSandbox(sandbox.path, pos);

    case '@property':
      return remapSandbox(sandbox.property, pos);

    case '@parent':
      return remapSandbox(sandbox.parentValue, pos);

    case '@parentProperty':
      return remapSandbox(sandbox.parentProperty, pos);

    case '@string':
    case '@number':
    case '@boolean':
      return binaryExpression('===', unaryExpression('typeof', remapSandbox(sandbox.value, pos)), stringLiteral(name.slice(1)));

    case '@scalar':
      return logicalExpression('||', binaryExpression('===', remapSandbox(sandbox.value, pos), nullLiteral()), binaryExpression('!==', unaryExpression('typeof', remapSandbox(sandbox.value, pos)), stringLiteral('object')));

    case '@array':
      return callExpression(memberExpression(identifier('Array'), identifier('isArray')), [remapSandbox(sandbox.value, pos)]);

    case '@null':
      return binaryExpression('===', remapSandbox(sandbox.value, pos), nullLiteral());

    case '@object':
      return logicalExpression('&&', binaryExpression('!==', remapSandbox(sandbox.value, pos), nullLiteral()), binaryExpression('===', unaryExpression('typeof', remapSandbox(sandbox.value, pos)), stringLiteral('object')));

    case '@integer':
      return callExpression(memberExpression(identifier('Number'), identifier('isInteger')), [remapSandbox(sandbox.value, pos)]);

    default:
      if (name.startsWith('@@')) {
        const shorthandName = name.slice(2);
        tree.attachCustomShorthand(shorthandName);
        return callExpression(memberExpression(internalScope.shorthands, identifier(shorthandName)), [scope._]);
      }

      throw new SyntaxError(`Unsupported shorthand '${name}'`);
  }
}

const KNOWN_IDENTIFIERS = [scope._.name, 'index'];

function assertDefinedIdentifier(node) {
  if (node.type !== 'Identifier') return;
  if (KNOWN_IDENTIFIERS.includes(node.name)) return;
  throw ReferenceError(`'${node.name}' is not defined`);
}

function remapSandbox(node, pos) {
  if (node.type === 'MemberExpression' && pos !== 0) {
    return { ...node,
      object: callExpression(sandbox.at, [numericLiteral(pos)])
    };
  }

  return node;
}

export { generateFilterScriptExpression, generateMemberExpression, generateMultipleMemberExpression, generateSliceExpression, generateWildcardExpression, rewriteESTree };
