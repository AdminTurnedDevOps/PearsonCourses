'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var authenticator = require('./authenticator.cjs.js');
var module$1 = require('./module.cjs.js');
var resolvers = require('./resolvers.cjs.js');



exports.oidcAuthenticator = authenticator.oidcAuthenticator;
exports.default = module$1.authModuleOidcProvider;
Object.defineProperty(exports, "oidcSignInResolvers", {
	enumerable: true,
	get: function () { return resolvers.oidcSignInResolvers; }
});
//# sourceMappingURL=index.cjs.js.map
