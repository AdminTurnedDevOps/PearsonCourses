"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const utils_1 = require("./utils");
const { Template } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
function getFederationGlobal(template, runtimeGlobals, matcher, rootOutputDir, initOptionsWithoutShared) {
    const federationGlobal = (0, utils_1.getFederationGlobalScope)(runtimeGlobals);
    const initOptionsStrWithoutShared = JSON.stringify(initOptionsWithoutShared);
    return template.asString([
        `if(!${federationGlobal}){`,
        template.indent([
            `${federationGlobal} = {`,
            template.indent([
                `initOptions: ${initOptionsStrWithoutShared},`,
                `chunkMatcher: function(chunkId) {return ${matcher}},`,
                `rootOutputDir: ${JSON.stringify(rootOutputDir || '')},`,
                `initialConsumes: undefined,`,
                'bundlerRuntimeOptions: {}',
            ]),
            '};',
        ]),
        '}',
    ]);
}
exports.default = getFederationGlobal;
//# sourceMappingURL=getFederationGlobal.js.map