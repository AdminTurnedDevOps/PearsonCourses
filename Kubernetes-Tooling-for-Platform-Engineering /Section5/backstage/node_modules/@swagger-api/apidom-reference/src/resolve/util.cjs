"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.readFile = void 0;
var _ramda = require("ramda");
var plugins = _interopRequireWildcard(require("../util/plugins.cjs"));
var _ResolveError = _interopRequireDefault(require("../errors/ResolveError.cjs"));
var _UnmatchedResolverError = _interopRequireDefault(require("../errors/UnmatchedResolverError.cjs"));
/**
 * Reads the given file, using the configured resolver plugins.
 */
// eslint-disable-next-line import/prefer-default-export
const readFile = async (file, options) => {
  const optsBoundResolvers = options.resolve.resolvers.map(resolver => {
    const clonedResolver = Object.create(resolver);
    return Object.assign(clonedResolver, options.resolve.resolverOpts);
  });
  const resolvers = await plugins.filter('canRead', [file, options], optsBoundResolvers);

  // we couldn't find any resolver for this File
  if ((0, _ramda.isEmpty)(resolvers)) {
    throw new _UnmatchedResolverError.default(file.uri);
  }
  try {
    const {
      result
    } = await plugins.run('read', [file], resolvers);
    return result;
  } catch (error) {
    throw new _ResolveError.default(`Error while reading file "${file.uri}"`, {
      cause: error
    });
  }
};
exports.readFile = readFile;