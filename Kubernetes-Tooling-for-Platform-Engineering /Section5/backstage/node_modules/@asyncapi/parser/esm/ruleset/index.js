var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { coreRuleset, recommendedRuleset } from './ruleset';
import { v2CoreRuleset, v2SchemasRuleset, v2RecommendedRuleset } from './v2';
import { v3CoreRuleset } from './v3';
export function createRuleset(parser, options) {
    var _a;
    const _b = (options || {}), { core: useCore = true, recommended: useRecommended = true } = _b, rest = __rest(_b, ["core", "recommended"]);
    const extendedRuleset = [
        useCore && coreRuleset,
        useRecommended && recommendedRuleset,
        useCore && v2CoreRuleset,
        useCore && v2SchemasRuleset(parser),
        useRecommended && v2RecommendedRuleset,
        useCore && v3CoreRuleset,
        ...((_a = (options || {})) === null || _a === void 0 ? void 0 : _a.extends) || [],
    ].filter(Boolean);
    return Object.assign(Object.assign({}, rest || {}), { extends: extendedRuleset });
}
