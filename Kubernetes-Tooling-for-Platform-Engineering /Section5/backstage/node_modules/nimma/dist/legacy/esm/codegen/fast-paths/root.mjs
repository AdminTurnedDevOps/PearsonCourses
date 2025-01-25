import generateEmitCall from '../templates/emit-call.mjs';

// covers: $
const EMIT_ROOT_CALL_EXPRESSION = generateEmitCall('$', {
  keyed: false,
  parents: 0
});
var root = ((nodes, tree) => {
  if (nodes.length > 0) {
    return false;
  }

  tree.push(EMIT_ROOT_CALL_EXPRESSION, 'body');
  return true;
});

export { root as default };
