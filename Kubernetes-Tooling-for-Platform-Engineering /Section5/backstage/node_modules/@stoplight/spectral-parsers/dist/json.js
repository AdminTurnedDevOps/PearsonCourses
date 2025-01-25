"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Json = exports.parseJson = void 0;
const json_1 = require("@stoplight/json");
const parseJson = (input) => (0, json_1.parseWithPointers)(input, {
    ignoreDuplicateKeys: false,
    preserveKeyOrder: true,
});
exports.parseJson = parseJson;
exports.Json = {
    parse: exports.parseJson,
    getLocationForJsonPath: json_1.getLocationForJsonPath,
    trapAccess: json_1.trapAccess,
};
//# sourceMappingURL=json.js.map