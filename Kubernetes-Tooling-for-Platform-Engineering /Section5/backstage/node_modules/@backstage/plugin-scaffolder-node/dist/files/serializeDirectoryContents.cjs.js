'use strict';

var fs = require('fs');
var globby = require('globby');
var limiterFactory = require('p-limit');
var backendPluginApi = require('@backstage/backend-plugin-api');
var errors = require('@backstage/errors');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var globby__default = /*#__PURE__*/_interopDefaultCompat(globby);
var limiterFactory__default = /*#__PURE__*/_interopDefaultCompat(limiterFactory);

const DEFAULT_GLOB_PATTERNS = ["./**", "!.git"];
const isExecutable = (fileMode) => {
  if (!fileMode) {
    return false;
  }
  const executeBitMask = 73;
  const res = fileMode & executeBitMask;
  return res > 0;
};
async function asyncFilter(array, callback) {
  const filterMap = await Promise.all(array.map(callback));
  return array.filter((_value, index) => filterMap[index]);
}
async function serializeDirectoryContents(sourcePath, options) {
  const paths = await globby__default.default(options?.globPatterns ?? DEFAULT_GLOB_PATTERNS, {
    cwd: sourcePath,
    dot: true,
    gitignore: options?.gitignore,
    followSymbolicLinks: false,
    // In order to pick up 'broken' symlinks, we oxymoronically request files AND folders yet we filter out folders
    // This is because broken symlinks aren't classed as files so we need to glob everything
    onlyFiles: false,
    objectMode: true,
    stats: true
  });
  const limiter = limiterFactory__default.default(10);
  const valid = await asyncFilter(paths, async ({ dirent, path }) => {
    if (dirent.isDirectory()) return false;
    if (!dirent.isSymbolicLink()) return true;
    const safePath = backendPluginApi.resolveSafeChildPath(sourcePath, path);
    try {
      await fs.promises.stat(safePath);
      return false;
    } catch (e) {
      return errors.isError(e) && e.code === "ENOENT";
    }
  });
  return Promise.all(
    valid.map(async ({ dirent, path, stats }) => ({
      path,
      content: await limiter(async () => {
        const absFilePath = backendPluginApi.resolveSafeChildPath(sourcePath, path);
        if (dirent.isSymbolicLink()) {
          return fs.promises.readlink(absFilePath, "buffer");
        }
        return fs.promises.readFile(absFilePath);
      }),
      executable: isExecutable(stats?.mode),
      symlink: dirent.isSymbolicLink()
    }))
  );
}

exports.isExecutable = isExecutable;
exports.serializeDirectoryContents = serializeDirectoryContents;
//# sourceMappingURL=serializeDirectoryContents.cjs.js.map
