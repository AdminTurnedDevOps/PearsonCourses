import allParents from './all-parents.mjs';
import deepSingleMember from './deep-single-member.mjs';
import deepWildcard from './deep-wildcard.mjs';
import fixed from './fixed.mjs';
import onlyFilterScriptExpression from './only-filter-script-expression.mjs';
import root from './root.mjs';
import topLevelWildcard from './top-level-wildcard.mjs';

var fastPaths = [root, onlyFilterScriptExpression, deepSingleMember, deepWildcard, topLevelWildcard, fixed, allParents];

export { fastPaths as default };
