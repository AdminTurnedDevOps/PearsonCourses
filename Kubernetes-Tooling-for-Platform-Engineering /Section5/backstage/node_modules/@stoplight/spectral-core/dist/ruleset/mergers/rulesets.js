"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeRulesets = void 0;
function getExtension(extension) {
    return Array.isArray(extension) ? extension[0] : extension;
}
function getExtensions(extensions) {
    return (Array.isArray(extensions) ? extensions : [extensions]).map(getExtension);
}
function mergeRulesets(left, right, isOverride) {
    const ruleset = {
        ...left,
        ...right,
    };
    if ('extends' in ruleset && 'extends' in ruleset) {
        const rightExtensions = getExtensions(ruleset.extends);
        ruleset.extends = [
            ...(Array.isArray(ruleset.extends) ? ruleset.extends : [ruleset.extends]).filter(ext => !rightExtensions.includes(getExtension(ext))),
            ...(Array.isArray(ruleset.extends) ? ruleset.extends : [ruleset.extends]),
        ];
    }
    if ('aliases' in left && 'aliases' in right) {
        ruleset.aliases = {
            ...left.aliases,
            ...right.aliases,
        };
    }
    if (!('rules' in left) || !('rules' in right))
        return ruleset;
    if (isOverride) {
        ruleset.rules = {
            ...left.rules,
            ...right.rules,
        };
    }
    else {
        const r = ruleset;
        if (!('extends' in r)) {
            r.extends = left;
        }
        else if (Array.isArray(r.extends)) {
            r.extends = [...r.extends, left];
        }
        else {
            r.extends = [r.extends, left];
        }
    }
    return ruleset;
}
exports.mergeRulesets = mergeRulesets;
//# sourceMappingURL=rulesets.js.map