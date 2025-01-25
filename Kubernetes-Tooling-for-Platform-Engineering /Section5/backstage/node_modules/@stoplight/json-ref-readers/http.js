"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_fetch_1 = require("node-fetch");
class OpenError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'OpenError';
    }
}
exports.OpenError = OpenError;
class NetworkError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ReadError';
    }
}
exports.NetworkError = NetworkError;
function resolveHttp(ref, opts = {}) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const uri = ref.href();
        const response = yield node_fetch_1.default(uri, opts);
        if (response.ok) {
            return response.text();
        }
        if (response.status === 404) {
            throw new OpenError(`Page not found: ${uri}`);
        }
        throw new NetworkError(`${response.status} ${response.statusText}`);
    });
}
exports.resolveHttp = resolveHttp;
function createResolveHttp(defaultRequestOptions = {}) {
    return ref => resolveHttp(ref, defaultRequestOptions);
}
exports.createResolveHttp = createResolveHttp;
//# sourceMappingURL=http.js.map