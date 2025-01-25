import { identifier } from '../ast/builders.mjs';

var internalScope = {
  pos: identifier('pos'),
  shorthands: identifier('shorthands'),
  tree: identifier('tree')
};

export { internalScope as default };
