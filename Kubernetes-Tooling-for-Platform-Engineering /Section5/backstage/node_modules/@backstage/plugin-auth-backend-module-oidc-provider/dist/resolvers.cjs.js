'use strict';

var pluginAuthNode = require('@backstage/plugin-auth-node');

exports.oidcSignInResolvers = void 0;
((oidcSignInResolvers2) => {
  oidcSignInResolvers2.emailLocalPartMatchingUserEntityName = pluginAuthNode.commonSignInResolvers.emailLocalPartMatchingUserEntityName;
  oidcSignInResolvers2.emailMatchingUserEntityProfileEmail = pluginAuthNode.commonSignInResolvers.emailMatchingUserEntityProfileEmail;
})(exports.oidcSignInResolvers || (exports.oidcSignInResolvers = {}));
//# sourceMappingURL=resolvers.cjs.js.map
