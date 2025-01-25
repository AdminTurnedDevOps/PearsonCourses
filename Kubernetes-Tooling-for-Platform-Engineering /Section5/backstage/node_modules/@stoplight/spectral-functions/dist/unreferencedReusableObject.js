"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spectral_core_1 = require("@stoplight/spectral-core");
const spectral_runtime_1 = require("@stoplight/spectral-runtime");
const json_1 = require("@stoplight/json");
const optionSchemas_1 = require("./optionSchemas");
exports.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
    },
    options: optionSchemas_1.optionSchemas.unreferencedReusableObject,
}, function unreferencedReusableObject(data, opts, { document, documentInventory }) {
    var _a;
    const graph = documentInventory.graph;
    if (graph === null) {
        throw new Error('unreferencedReusableObject requires dependency graph');
    }
    const normalizedSource = (_a = document.source) !== null && _a !== void 0 ? _a : '';
    const defined = Object.keys(data).map(name => `${normalizedSource}${opts.reusableObjectsLocation}/${name}`);
    const decodedNodes = new Set(graph.overallOrder().map(n => (0, json_1.decodePointer)(n)));
    const orphans = defined.filter(defPath => !decodedNodes.has(defPath));
    return orphans.map(orphanPath => {
        return {
            message: 'Potential orphaned reusable object has been detected',
            path: (0, spectral_runtime_1.safePointerToPath)(orphanPath),
        };
    });
});
//# sourceMappingURL=unreferencedReusableObject.js.map