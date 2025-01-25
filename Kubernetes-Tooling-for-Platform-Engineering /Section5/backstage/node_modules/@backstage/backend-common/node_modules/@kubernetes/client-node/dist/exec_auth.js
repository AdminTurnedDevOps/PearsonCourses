"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecAuth = void 0;
const child_process = require("child_process");
class ExecAuth {
    constructor() {
        this.tokenCache = {};
        this.execFn = child_process.spawnSync;
    }
    isAuthProvider(user) {
        if (!user) {
            return false;
        }
        if (user.exec) {
            return true;
        }
        if (!user.authProvider) {
            return false;
        }
        return (user.authProvider.name === 'exec' || !!(user.authProvider.config && user.authProvider.config.exec));
    }
    async applyAuthentication(user, opts) {
        const credential = this.getCredential(user);
        if (!credential) {
            return;
        }
        if (credential.status.clientCertificateData) {
            opts.cert = credential.status.clientCertificateData;
        }
        if (credential.status.clientKeyData) {
            opts.key = credential.status.clientKeyData;
        }
        const token = this.getToken(credential);
        if (token) {
            if (!opts.headers) {
                opts.headers = [];
            }
            opts.headers.Authorization = `Bearer ${token}`;
        }
    }
    getToken(credential) {
        if (!credential) {
            return null;
        }
        if (credential.status.token) {
            return credential.status.token;
        }
        return null;
    }
    getCredential(user) {
        // TODO: Add a unit test for token caching.
        const cachedToken = this.tokenCache[user.name];
        if (cachedToken) {
            const date = Date.parse(cachedToken.status.expirationTimestamp);
            if (date > Date.now()) {
                return cachedToken;
            }
            this.tokenCache[user.name] = null;
        }
        let exec = null;
        if (user.authProvider && user.authProvider.config) {
            exec = user.authProvider.config.exec;
        }
        if (user.exec) {
            exec = user.exec;
        }
        if (!exec) {
            return null;
        }
        if (!exec.command) {
            throw new Error('No command was specified for exec authProvider!');
        }
        let opts = {};
        if (exec.env) {
            const env = {
                ...process.env,
            };
            exec.env.forEach((elt) => (env[elt.name] = elt.value));
            opts = { ...opts, env };
        }
        const result = this.execFn(exec.command, exec.args, opts);
        if (result.status === 0) {
            const obj = JSON.parse(result.stdout.toString('utf8'));
            this.tokenCache[user.name] = obj;
            return obj;
        }
        throw new Error(result.stderr.toString('utf8'));
    }
}
exports.ExecAuth = ExecAuth;
//# sourceMappingURL=exec_auth.js.map