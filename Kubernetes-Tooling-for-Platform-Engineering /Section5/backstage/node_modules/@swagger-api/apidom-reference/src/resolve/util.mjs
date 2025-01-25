import { isEmpty } from 'ramda';
import * as plugins from "../util/plugins.mjs";
import ResolveError from "../errors/ResolveError.mjs";
import UnmatchedResolverError from "../errors/UnmatchedResolverError.mjs";
/**
 * Reads the given file, using the configured resolver plugins.
 */
// eslint-disable-next-line import/prefer-default-export
export const readFile = async (file, options) => {
  const optsBoundResolvers = options.resolve.resolvers.map(resolver => {
    const clonedResolver = Object.create(resolver);
    return Object.assign(clonedResolver, options.resolve.resolverOpts);
  });
  const resolvers = await plugins.filter('canRead', [file, options], optsBoundResolvers);

  // we couldn't find any resolver for this File
  if (isEmpty(resolvers)) {
    throw new UnmatchedResolverError(file.uri);
  }
  try {
    const {
      result
    } = await plugins.run('read', [file], resolvers);
    return result;
  } catch (error) {
    throw new ResolveError(`Error while reading file "${file.uri}"`, {
      cause: error
    });
  }
};