"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metrics = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const gen_1 = require("./gen");
const util_1 = require("./util");
class Metrics {
    constructor(config) {
        this.config = config;
    }
    async getNodeMetrics() {
        return this.metricsApiRequest('/apis/metrics.k8s.io/v1beta1/nodes');
    }
    async getPodMetrics(namespace) {
        let path;
        if (namespace !== undefined && namespace.length > 0) {
            path = `/apis/metrics.k8s.io/v1beta1/namespaces/${namespace}/pods`;
        }
        else {
            path = '/apis/metrics.k8s.io/v1beta1/pods';
        }
        return this.metricsApiRequest(path);
    }
    async metricsApiRequest(path) {
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }
        const requestURL = cluster.server + path;
        const requestInit = await this.config.applyToFetchOptions({});
        requestInit.method = 'GET';
        return (0, node_fetch_1.default)(requestURL, requestInit)
            .then((response) => {
            return Promise.all([response.json(), response.status, response]);
        })
            .then(([json, status, response]) => {
            if (status === 200) {
                return json;
            }
            if (status === 500) {
                const v1status = json;
                const v1code = v1status.code;
                const v1message = v1status.message;
                if (v1code !== undefined && v1message !== undefined) {
                    throw new gen_1.ApiException(v1code, v1message, v1status, (0, util_1.normalizeResponseHeaders)(response));
                }
            }
            throw new gen_1.ApiException(status, 'Error occurred in metrics request', undefined, (0, util_1.normalizeResponseHeaders)(response));
        })
            .catch((e) => {
            if (e instanceof gen_1.ApiException) {
                throw e;
            }
            throw new gen_1.ApiException(500, `Error occurred in metrics request: ${e.message}`, {}, {});
        });
    }
}
exports.Metrics = Metrics;
//# sourceMappingURL=metrics.js.map