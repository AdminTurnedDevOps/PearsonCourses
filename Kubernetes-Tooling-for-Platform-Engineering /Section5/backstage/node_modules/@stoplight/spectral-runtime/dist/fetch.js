"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_REQUEST_OPTIONS = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = (0, tslib_1.__importDefault)(require("node-fetch"));
exports.DEFAULT_REQUEST_OPTIONS = {};
exports.default = async (uri, opts = {}) => {
    return (0, node_fetch_1.default)(uri, { ...opts, ...exports.DEFAULT_REQUEST_OPTIONS });
};
//# sourceMappingURL=fetch.js.map