'use strict';

var tar = require('tar');
var concatStream = require('concat-stream');
var util = require('util');
var stream = require('stream');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var tar__default = /*#__PURE__*/_interopDefaultCompat(tar);
var concatStream__default = /*#__PURE__*/_interopDefaultCompat(concatStream);

const pipeline = util.promisify(stream.pipeline);
const serializeWorkspace = async (opts) => {
  return new Promise(async (resolve) => {
    await pipeline(
      tar__default.default.create({ cwd: opts.path }, [""]),
      concatStream__default.default((buffer) => {
        return resolve({ contents: buffer });
      })
    );
  });
};
const restoreWorkspace = async (opts) => {
  const { buffer, path } = opts;
  if (buffer) {
    await pipeline(
      stream.Readable.from(buffer),
      tar__default.default.extract({
        C: path
      })
    );
  }
};

exports.restoreWorkspace = restoreWorkspace;
exports.serializeWorkspace = serializeWorkspace;
//# sourceMappingURL=serializer.cjs.js.map
