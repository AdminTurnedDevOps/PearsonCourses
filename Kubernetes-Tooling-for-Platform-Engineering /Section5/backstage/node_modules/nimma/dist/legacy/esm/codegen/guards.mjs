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

export { isDeep, isMemberExpression, isModifierExpression, isScriptFilterExpression, isWildcardExpression };
