'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var allParents = require('./all-parents.js');
var deepSingleMember = require('./deep-single-member.js');
var deepWildcard = require('./deep-wildcard.js');
var fixed = require('./fixed.js');
var onlyFilterScriptExpression = require('./only-filter-script-expression.js');
var root = require('./root.js');
var topLevelWildcard = require('./top-level-wildcard.js');

var fastPaths = [root['default'], onlyFilterScriptExpression['default'], deepSingleMember['default'], deepWildcard['default'], topLevelWildcard['default'], fixed['default'], allParents['default']];

exports['default'] = fastPaths;
