"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRuleset = void 0;
const ruleset_1 = require("./ruleset");
const v2_1 = require("./v2");
const v3_1 = require("./v3");
function createRuleset(parser, options) {
    var _a;
    const _b = (options || {}), { core: useCore = true, recommended: useRecommended = true } = _b, rest = __rest(_b, ["core", "recommended"]);
    const extendedRuleset = [
        useCore && ruleset_1.coreRuleset,
        useRecommended && ruleset_1.recommendedRuleset,
        useCore && v2_1.v2CoreRuleset,
        useCore && (0, v2_1.v2SchemasRuleset)(parser),
        useRecommended && v2_1.v2RecommendedRuleset,
        useCore && v3_1.v3CoreRuleset,
        ...((_a = (options || {})) === null || _a === void 0 ? void 0 : _a.extends) || [],
    ].filter(Boolean);
    return Object.assign(Object.assign({}, rest || {}), { extends: extendedRuleset });
}
exports.createRuleset = createRuleset;
