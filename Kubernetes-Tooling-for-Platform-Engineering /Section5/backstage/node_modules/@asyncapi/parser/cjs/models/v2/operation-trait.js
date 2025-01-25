"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationTrait = void 0;
const base_1 = require("../base");
const security_scheme_1 = require("./security-scheme");
const security_requirements_1 = require("./security-requirements");
const security_requirement_1 = require("./security-requirement");
const mixins_1 = require("./mixins");
class OperationTrait extends base_1.BaseModel {
    id() {
        return this.operationId() || this._meta.id;
    }
    hasOperationId() {
        return !!this._json.operationId;
    }
    operationId() {
        return this._json.operationId;
    }
    hasSummary() {
        return !!this._json.summary;
    }
    summary() {
        return this._json.summary;
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    hasExternalDocs() {
        return (0, mixins_1.hasExternalDocs)(this);
    }
    externalDocs() {
        return (0, mixins_1.externalDocs)(this);
    }
    security() {
        var _a, _b, _c, _d;
        const securitySchemes = (((_d = (_c = (_b = (_a = this._meta) === null || _a === void 0 ? void 0 : _a.asyncapi) === null || _b === void 0 ? void 0 : _b.parsed) === null || _c === void 0 ? void 0 : _c.components) === null || _d === void 0 ? void 0 : _d.securitySchemes) || {});
        return (this._json.security || []).map((requirement, index) => {
            const requirements = [];
            Object.entries(requirement).forEach(([security, scopes]) => {
                const scheme = this.createModel(security_scheme_1.SecurityScheme, securitySchemes[security], { id: security, pointer: `/components/securitySchemes/${security}` });
                requirements.push(this.createModel(security_requirement_1.SecurityRequirement, { scheme, scopes }, { id: security, pointer: `${this.meta().pointer}/security/${index}/${security}` }));
            });
            return new security_requirements_1.SecurityRequirements(requirements);
        });
    }
    tags() {
        return (0, mixins_1.tags)(this);
    }
    bindings() {
        return (0, mixins_1.bindings)(this);
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.OperationTrait = OperationTrait;
