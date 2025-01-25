'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isMemberExpression(node) {
  return node.type === 'MemberExpression';
}
function isScriptFilterExpression(node) {
  return node.type === 'ScriptFilterExpression';
}
function isModifierExpression(node) {
  return node.type === 'KeyExpression' || node.type === 'ParentExpression';
}
function isWildcardExpression(node) {
  return node.type === 'WildcardExpression';
}
function isDeep(node) {
  return node.deep;
}

exports.isDeep = isDeep;
exports.isMemberExpression = isMemberExpression;
exports.isModifierExpression = isModifierExpression;
exports.isScriptFilterExpression = isScriptFilterExpression;
exports.isWildcardExpression = isWildcardExpression;
