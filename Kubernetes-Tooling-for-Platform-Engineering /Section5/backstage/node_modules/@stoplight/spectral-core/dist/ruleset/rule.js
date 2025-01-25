"use strict";
var _Rule_severity, _Rule_enabled, _Rule_then, _Rule_given;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const path_1 = require("@stoplight/path");
const json_1 = require("@stoplight/json");
const severity_1 = require("./utils/severity");
const minimatch_1 = require("./utils/minimatch");
const formats_1 = require("./formats");
const alias_1 = require("./alias");
class Rule {
    constructor(name, definition, owner) {
        var _a, _b, _c, _d;
        this.name = name;
        this.definition = definition;
        this.owner = owner;
        _Rule_severity.set(this, void 0);
        _Rule_enabled.set(this, void 0);
        _Rule_then.set(this, void 0);
        _Rule_given.set(this, void 0);
        this.recommended = definition.recommended !== false;
        (0, tslib_1.__classPrivateFieldSet)(this, _Rule_enabled, this.recommended, "f");
        this.description = (_a = definition.description) !== null && _a !== void 0 ? _a : null;
        this.message = (_b = definition.message) !== null && _b !== void 0 ? _b : null;
        this.documentationUrl = (_c = definition.documentationUrl) !== null && _c !== void 0 ? _c : null;
        this.severity = definition.severity;
        this.resolved = definition.resolved !== false;
        this.formats = 'formats' in definition ? new formats_1.Formats(definition.formats) : null;
        this.then = definition.then;
        this.given = definition.given;
        this.extensions = (_d = definition.extensions) !== null && _d !== void 0 ? _d : null;
    }
    get enabled() {
        return (0, tslib_1.__classPrivateFieldGet)(this, _Rule_enabled, "f") || this.overrides !== void 0;
    }
    set enabled(enabled) {
        (0, tslib_1.__classPrivateFieldSet)(this, _Rule_enabled, enabled, "f");
    }
    static isEnabled(rule, severity) {
        return severity === 'all' || (severity === 'recommended' && rule.recommended);
    }
    getSeverityForSource(source, path) {
        if (this.overrides === void 0 || this.overrides.definition.size === 0) {
            return this.severity;
        }
        const relativeSource = (0, path_1.relative)((0, path_1.dirname)(this.overrides.rulesetSource), source);
        const relevantOverrides = [];
        for (const [source, override] of this.overrides.definition.entries()) {
            if ((0, minimatch_1.minimatch)(relativeSource, source)) {
                relevantOverrides.push(override);
            }
        }
        if (relevantOverrides.length === 0) {
            return this.severity;
        }
        let severity = this.severity;
        let closestPointer = '';
        const pointer = (0, json_1.pathToPointer)(path);
        for (const relevantOverride of relevantOverrides) {
            for (const [overridePath, overrideSeverity] of relevantOverride.entries()) {
                if (overridePath.length >= closestPointer.length &&
                    (pointer === overridePath || pointer.startsWith(`${overridePath}/`))) {
                    closestPointer = overridePath;
                    severity = overrideSeverity;
                }
            }
        }
        return severity;
    }
    get severity() {
        return (0, tslib_1.__classPrivateFieldGet)(this, _Rule_severity, "f");
    }
    set severity(severity) {
        if (severity === void 0) {
            (0, tslib_1.__classPrivateFieldSet)(this, _Rule_severity, severity_1.DEFAULT_SEVERITY_LEVEL, "f");
        }
        else {
            (0, tslib_1.__classPrivateFieldSet)(this, _Rule_severity, (0, severity_1.getDiagnosticSeverity)(severity), "f");
        }
    }
    get then() {
        return (0, tslib_1.__classPrivateFieldGet)(this, _Rule_then, "f");
    }
    set then(then) {
        (0, tslib_1.__classPrivateFieldSet)(this, _Rule_then, Array.isArray(then) ? then : [then], "f");
    }
    get given() {
        return (0, tslib_1.__classPrivateFieldGet)(this, _Rule_given, "f");
    }
    set given(given) {
        const actualGiven = Array.isArray(given) ? given : [given];
        (0, tslib_1.__classPrivateFieldSet)(this, _Rule_given, this.owner.hasComplexAliases
            ? actualGiven
            : actualGiven.flatMap(expr => (0, alias_1.resolveAlias)(this.owner.aliases, expr, null)).filter(lodash_1.isString), "f");
    }
    getGivenForFormats(formats) {
        return this.owner.hasComplexAliases
            ? (0, tslib_1.__classPrivateFieldGet)(this, _Rule_given, "f").flatMap(expr => (0, alias_1.resolveAlias)(this.owner.aliases, expr, formats))
            : (0, tslib_1.__classPrivateFieldGet)(this, _Rule_given, "f");
    }
    matchesFormat(formats) {
        if (this.formats === null) {
            return true;
        }
        if (formats === null) {
            return false;
        }
        for (const format of this.formats) {
            if (formats.has(format)) {
                return true;
            }
        }
        return false;
    }
    clone() {
        return new Rule(this.name, this.definition, this.owner);
    }
    toJSON() {
        return {
            name: this.name,
            recommended: this.recommended,
            enabled: this.enabled,
            description: this.description,
            message: this.message,
            documentationUrl: this.documentationUrl,
            severity: this.severity,
            resolved: this.resolved,
            formats: this.formats,
            then: this.then.map(then => ({
                ...then,
                function: then.function.name,
            })),
            given: Array.isArray(this.definition.given) ? this.definition.given : [this.definition.given],
            owner: this.owner.id,
            extensions: this.extensions,
        };
    }
}
exports.Rule = Rule;
_Rule_severity = new WeakMap(), _Rule_enabled = new WeakMap(), _Rule_then = new WeakMap(), _Rule_given = new WeakMap();
//# sourceMappingURL=rule.js.map