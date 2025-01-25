import jsep from 'jsep'; // any ESTree compliant parser could be used. I picked this one, cause it's one of the smallest for what we need
import reduce from './reduce.mjs';

function parse(expr) {
  try {
    return jsep(expr);
  } catch (ex) {
    throw SyntaxError(ex.message);
  }
}

export default (expr, ctx) => {
  const tree = typeof expr === 'object' ? expr : parse(expr);
  return reduce(tree, Object.freeze(ctx));
};
