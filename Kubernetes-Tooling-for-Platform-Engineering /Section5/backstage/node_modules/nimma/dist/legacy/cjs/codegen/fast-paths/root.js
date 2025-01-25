'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var emitCall = require('../templates/emit-call.js');

// covers: $
const EMIT_ROOT_CALL_EXPRESSION = emitCall['default']('$', {
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

exports['default'] = root;
