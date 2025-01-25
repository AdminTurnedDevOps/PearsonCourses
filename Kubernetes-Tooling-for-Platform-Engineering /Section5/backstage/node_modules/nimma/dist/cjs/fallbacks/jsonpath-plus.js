'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsonpathPlus$1 = require('jsonpath-plus');
var toPath = require('lodash.topath');
var fallback = require('../codegen/fallback.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var toPath__default = /*#__PURE__*/_interopDefaultLegacy(toPath);

var jsonpathPlus = new fallback['default']({
  'jsonpath-plus': [{
    imported: 'JSONPath',
    local: 'JSONPath',
    value: jsonpathPlus$1.JSONPath
  }],
  'lodash.topath': [{
    imported: 'default',
    local: 'toPath',
    value: toPath__default['default']
  }]
}, // this part is tested, but cannot be covered because we never get to execute the actual fn
// what we do is we get the source code of it and construct a new fn based on that code

/* c8 ignore start */
function (input, path, fn) {
  this.JSONPath({
    callback: result => {
      fn({
        path: this.toPath(result.path.slice(1)),
        value: result.value
      });
    },
    json: input,
    path,
    resultType: 'all'
  });
});

exports['default'] = jsonpathPlus;
