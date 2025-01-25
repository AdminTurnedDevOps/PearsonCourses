'use strict';

var fs = require('fs-extra');
var path = require('path');
var backendPluginApi = require('@backstage/backend-plugin-api');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);

async function deserializeDirectoryContents(targetPath, files) {
  for (const file of files) {
    const filePath = backendPluginApi.resolveSafeChildPath(targetPath, file.path);
    await fs__default.default.ensureDir(path.dirname(filePath));
    await fs__default.default.writeFile(filePath, file.content);
  }
}

exports.deserializeDirectoryContents = deserializeDirectoryContents;
//# sourceMappingURL=deserializeDirectoryContents.cjs.js.map
