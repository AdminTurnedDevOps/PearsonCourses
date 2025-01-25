"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yaml = exports.parseYaml = void 0;
const yaml_1 = require("@stoplight/yaml");
function getLocationForJsonPath(result, path) {
    return (0, yaml_1.getLocationForJsonPath)(result, path);
}
const parseYaml = (input) => (0, yaml_1.parseWithPointers)(input, {
    ignoreDuplicateKeys: false,
    mergeKeys: true,
    preserveKeyOrder: true,
    attachComments: false,
});
exports.parseYaml = parseYaml;
exports.Yaml = {
    parse: exports.parseYaml,
    getLocationForJsonPath,
    trapAccess: yaml_1.trapAccess,
};
//# sourceMappingURL=yaml.js.map