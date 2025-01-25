"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayedOpenIDConnectAuth = void 0;
class DelayedOpenIDConnectAuth {
    constructor() {
        this.delegate = undefined;
    }
    isAuthProvider(user) {
        if (!user.authProvider) {
            return false;
        }
        return user.authProvider.name === 'oidc';
    }
    /**
     * Setup the authentication header for oidc authed clients
     * @param user user info
     * @param opts request options
     * @param overrideClient for testing, a preconfigured oidc client
     */
    async applyAuthentication(user, opts, overrideClient) {
        const oidc = await Promise.resolve().then(() => __importStar(require('./oidc_auth')));
        return new oidc.OpenIDConnectAuth().applyAuthentication(user, opts, overrideClient);
    }
}
exports.DelayedOpenIDConnectAuth = DelayedOpenIDConnectAuth;
//# sourceMappingURL=oidc_auth_delayed.js.map