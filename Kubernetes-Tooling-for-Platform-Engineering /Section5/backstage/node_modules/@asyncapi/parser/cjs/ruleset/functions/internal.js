"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internal = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
exports.internal = (0, spectral_core_1.createRulesetFunction)({
    input: null,
    options: null,
}, (_, __, { document, documentInventory }) => {
    // adding document inventory in document - we need it in custom operations to resolve all circular refs
    document.__documentInventory = documentInventory;
});
