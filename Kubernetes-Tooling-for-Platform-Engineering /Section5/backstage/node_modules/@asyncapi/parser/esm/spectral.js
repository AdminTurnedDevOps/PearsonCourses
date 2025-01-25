import { Spectral } from '@stoplight/spectral-core';
import { createRuleset } from './ruleset';
import { createResolver } from './resolver';
export function createSpectral(parser, options = {}) {
    var _a;
    const resolverOptions = (_a = options.__unstable) === null || _a === void 0 ? void 0 : _a.resolver;
    const spectral = new Spectral({ resolver: createResolver(resolverOptions) });
    const ruleset = createRuleset(parser, options.ruleset);
    spectral.setRuleset(ruleset);
    return spectral;
}
