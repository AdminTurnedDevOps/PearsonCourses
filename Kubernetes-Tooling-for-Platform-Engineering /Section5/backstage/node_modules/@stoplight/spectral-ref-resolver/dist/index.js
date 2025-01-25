"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpAndFileResolver = exports.ResolverDepGraph = exports.Resolver = exports.httpAndFileResolver = void 0;
const tslib_1 = require("tslib");
const json_ref_readers_1 = require("@stoplight/json-ref-readers");
const json_ref_resolver_1 = require("@stoplight/json-ref-resolver");
Object.defineProperty(exports, "Resolver", { enumerable: true, get: function () { return json_ref_resolver_1.Resolver; } });
const spectral_runtime_1 = require("@stoplight/spectral-runtime");
const dependency_graph_1 = require("dependency-graph");
(0, tslib_1.__exportStar)(require("./types"), exports);
exports.httpAndFileResolver = createHttpAndFileResolver();
exports.ResolverDepGraph = dependency_graph_1.DepGraph;
function createHttpAndFileResolver(opts) {
    const resolveHttp = (0, json_ref_readers_1.createResolveHttp)({ ...spectral_runtime_1.DEFAULT_REQUEST_OPTIONS, ...opts });
    return new json_ref_resolver_1.Resolver({
        resolvers: {
            https: { resolve: resolveHttp },
            http: { resolve: resolveHttp },
            file: { resolve: json_ref_readers_1.resolveFile },
        },
    });
}
exports.createHttpAndFileResolver = createHttpAndFileResolver;
//# sourceMappingURL=index.js.map