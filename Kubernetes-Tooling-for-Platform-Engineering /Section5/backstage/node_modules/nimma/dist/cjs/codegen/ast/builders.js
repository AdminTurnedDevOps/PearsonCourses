'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/* eslint-disable sort-keys */
// since our usage is fairly narrow, we don't really need to install extra deps such ast-types or @babel/types.
// the set of builders I've prepared here should be sufficient for our needs
function program(body) {
  return {
    type: 'Program',
    body
  };
}
function blockStatement(body, directives) {
  return {
    type: 'BlockStatement',
    body,
    directives
  };
}
function expressionStatement(expression) {
  return {
    type: 'ExpressionStatement',
    expression
  };
}
function literal(value) {
  switch (typeof value) {
    case 'number':
      return numericLiteral(value);

    case 'string':
      return stringLiteral(value);

    case 'boolean':
      return booleanLiteral(value);
  }
}
function stringLiteral(value) {
  return {
    type: 'StringLiteral',
    value
  };
}
function booleanLiteral(value) {
  return {
    type: 'BooleanLiteral',
    value
  };
}
function numericLiteral(value) {
  return {
    type: 'NumericLiteral',
    value
  };
}
function nullLiteral() {
  return {
    type: 'NullLiteral',
    value: null
  };
}
function regExpLiteral(pattern, flags = '') {
  return {
    type: 'RegExpLiteral',
    pattern,
    flags
  };
}
function identifier(name) {
  return {
    type: 'Identifier',
    name
  };
}
function logicalExpression(operator, left, right) {
  return {
    type: 'LogicalExpression',
    operator,
    left,
    right
  };
}
function conditionalExpression(test, consequent, alternate) {
  return {
    type: 'ConditionalExpression',
    test,
    consequent,
    alternate
  };
}
function ifStatement(test, consequent, alternate) {
  return {
    type: 'IfStatement',
    test,
    consequent,
    alternate
  };
}
function binaryExpression(operator, left, right) {
  return {
    type: 'BinaryExpression',
    operator,
    left,
    right
  };
}
function safeBinaryExpression(operator, left, right) {
  let actualRight = right;

  if (right.type === 'NumericLiteral') {
    actualRight = stringLiteral(String(right.value));
  } else if (right.type === 'StringLiteral' && Number.isSafeInteger(Number(right.value))) {
    actualRight = stringLiteral(String(right.value));
  }

  return {
    type: 'BinaryExpression',
    operator,
    left: actualRight === right ? left : callExpression(identifier('String'), [left]),
    right: actualRight
  };
}
function unaryExpression(operator, argument, prefix = true) {
  return {
    type: 'UnaryExpression',
    operator,
    argument,
    prefix
  };
}
function memberExpression(object, property, computed = false, optional = null) {
  return {
    type: 'MemberExpression',
    object,
    property,
    computed,
    optional
  };
}
function assignmentExpression(operator, left, right) {
  return {
    type: 'AssignmentExpression',
    operator,
    left,
    right
  };
}
function callExpression(callee, _arguments) {
  return {
    type: 'CallExpression',
    callee,
    arguments: _arguments
  };
}
function functionDeclaration(id, params, body) {
  return {
    type: 'FunctionDeclaration',
    id,
    params,
    body
  };
}
function returnStatement(argument) {
  return {
    type: 'ReturnStatement',
    argument
  };
}
function sequenceExpression(expressions) {
  return {
    type: 'SequenceExpression',
    expressions
  };
}
function forOfStatement(left, right, body, _await) {
  return {
    type: 'ForOfStatement',
    left,
    right,
    body,
    await: _await
  };
}
function arrayExpression(elements) {
  return {
    type: 'ArrayExpression',
    elements
  };
}
function objectExpression(properties) {
  return {
    type: 'ObjectExpression',
    properties
  };
}
function objectMethod(kind, key, params, body, computed = false, generator = false, _async = false) {
  return {
    type: 'ObjectMethod',
    kind,
    key,
    params,
    body,
    computed,
    generator,
    async: _async
  };
}
function objectProperty(key, value, computed = false, shorthand = false, decorators = null) {
  return {
    type: 'ObjectProperty',
    key,
    value,
    computed,
    shorthand,
    decorators
  };
}
function variableDeclaration(kind, declarations) {
  return {
    type: 'VariableDeclaration',
    kind,
    declarations
  };
}
function variableDeclarator(id, init) {
  return {
    type: 'VariableDeclarator',
    id,
    init
  };
}
function newExpression(callee, _arguments) {
  return {
    type: 'NewExpression',
    callee,
    arguments: _arguments
  };
}
function importDeclaration(specifiers, source) {
  return {
    type: 'ImportDeclaration',
    specifiers,
    source
  };
}
function importSpecifier(local, imported) {
  return {
    type: 'ImportSpecifier',
    local,
    imported
  };
}
function exportDefaultDeclaration(declaration) {
  return {
    type: 'ExportDefaultDeclaration',
    declaration
  };
}
function arrowFunctionExpression(params, body, _async = false) {
  return {
    type: 'ArrowFunctionExpression',
    params,
    body,
    async: _async
  };
}
function tryStatement(block, handler = null, finalizer = null) {
  return {
    type: 'TryStatement',
    block,
    handler,
    finalizer
  };
}
function templateElement(value, tail = false) {
  return {
    type: 'TemplateElement',
    value,
    tail
  };
}
function templateLiteral(quasis, expressions) {
  return {
    type: 'TemplateLiteral',
    quasis,
    expressions
  };
}

exports.arrayExpression = arrayExpression;
exports.arrowFunctionExpression = arrowFunctionExpression;
exports.assignmentExpression = assignmentExpression;
exports.binaryExpression = binaryExpression;
exports.blockStatement = blockStatement;
exports.booleanLiteral = booleanLiteral;
exports.callExpression = callExpression;
exports.conditionalExpression = conditionalExpression;
exports.exportDefaultDeclaration = exportDefaultDeclaration;
exports.expressionStatement = expressionStatement;
exports.forOfStatement = forOfStatement;
exports.functionDeclaration = functionDeclaration;
exports.identifier = identifier;
exports.ifStatement = ifStatement;
exports.importDeclaration = importDeclaration;
exports.importSpecifier = importSpecifier;
exports.literal = literal;
exports.logicalExpression = logicalExpression;
exports.memberExpression = memberExpression;
exports.newExpression = newExpression;
exports.nullLiteral = nullLiteral;
exports.numericLiteral = numericLiteral;
exports.objectExpression = objectExpression;
exports.objectMethod = objectMethod;
exports.objectProperty = objectProperty;
exports.program = program;
exports.regExpLiteral = regExpLiteral;
exports.returnStatement = returnStatement;
exports.safeBinaryExpression = safeBinaryExpression;
exports.sequenceExpression = sequenceExpression;
exports.stringLiteral = stringLiteral;
exports.templateElement = templateElement;
exports.templateLiteral = templateLiteral;
exports.tryStatement = tryStatement;
exports.unaryExpression = unaryExpression;
exports.variableDeclaration = variableDeclaration;
exports.variableDeclarator = variableDeclarator;
