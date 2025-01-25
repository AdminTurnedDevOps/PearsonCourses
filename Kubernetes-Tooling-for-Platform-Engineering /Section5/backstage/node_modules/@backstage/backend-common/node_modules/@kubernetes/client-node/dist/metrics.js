"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metrics = void 0;
const request = require("request");
const api_1 = require("./gen/api");
class Metrics {
    constructor(config) {
        this.config = config;
    }
    async getNodeMetrics(nodeOrOptions, options) {
        if (typeof nodeOrOptions !== 'string' || nodeOrOptions === '') {
            if (nodeOrOptions !== '') {
                options = nodeOrOptions;
            }
            return this.metricsApiRequest('/apis/metrics.k8s.io/v1beta1/nodes', options);
        }
        return this.metricsApiRequest(`/apis/metrics.k8s.io/v1beta1/nodes/${nodeOrOptions}`, options);
    }
    async getPodMetrics(namespaceOrOptions, nameOrOptions, options) {
        let path;
        if (typeof namespaceOrOptions === 'string' && namespaceOrOptions !== '') {
            const namespace = namespaceOrOptions;
            if (typeof nameOrOptions === 'string') {
                path = `/apis/metrics.k8s.io/v1beta1/namespaces/${namespace}/pods/${nameOrOptions}`;
            }
            else {
                path = `/apis/metrics.k8s.io/v1beta1/namespaces/${namespace}/pods`;
                options = nameOrOptions;
            }
        }
        else {
            path = '/apis/metrics.k8s.io/v1beta1/pods';
            if (typeof namespaceOrOptions !== 'string') {
                options = namespaceOrOptions;
            }
            else if (typeof nameOrOptions !== 'string') {
                options = nameOrOptions;
            }
        }
        return this.metricsApiRequest(path, options);
    }
    async metricsApiRequest(path, options) {
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }
        const requestOptions = {
            method: 'GET',
            uri: cluster.server + path,
            qs: options,
        };
        await this.config.applyToRequest(requestOptions);
        return new Promise((resolve, reject) => {
            const req = request(requestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    try {
                        const deserializedBody = api_1.ObjectSerializer.deserialize(JSON.parse(body), 'V1Status');
                        reject(new api_1.HttpError(response, deserializedBody, response.statusCode));
                    }
                    catch (e) {
                        reject(new api_1.HttpError(response, body, response.statusCode));
                    }
                }
                else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}
exports.Metrics = Metrics;
//# sourceMappingURL=metrics.js.map