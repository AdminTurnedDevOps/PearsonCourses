import { JSONPath } from 'jsonpath-plus';
import toPath from 'lodash.topath';
import Fallback from '../codegen/fallback.mjs';

var jsonpathPlus = new Fallback({
  'jsonpath-plus': [{
    imported: 'JSONPath',
    local: 'JSONPath',
    value: JSONPath
  }],
  'lodash.topath': [{
    imported: 'default',
    local: 'toPath',
    value: toPath
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

export { jsonpathPlus as default };
