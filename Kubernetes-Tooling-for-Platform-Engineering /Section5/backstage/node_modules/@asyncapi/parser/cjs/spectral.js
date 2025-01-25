"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpectral = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const ruleset_1 = require("./ruleset");
const resolver_1 = require("./resolver");
function createSpectral(parser, options = {}) {
    var _a;
    const resolverOptions = (_a = options.__unstable) === null || _a === void 0 ? void 0 : _a.resolver;
    const spectral = new spectral_core_1.Spectral({ resolver: (0, resolver_1.createResolver)(resolverOptions) });
    const ruleset = (0, ruleset_1.createRuleset)(parser, options.ruleset);
    spectral.setRuleset(ruleset);
    return spectral;
}
exports.createSpectral = createSpectral;
