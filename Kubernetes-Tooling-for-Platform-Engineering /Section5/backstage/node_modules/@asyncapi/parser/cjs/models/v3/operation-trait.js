"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationTrait = void 0;
const security_scheme_1 = require("./security-scheme");
const security_requirements_1 = require("./security-requirements");
const security_requirement_1 = require("./security-requirement");
const mixins_1 = require("./mixins");
class OperationTrait extends mixins_1.CoreModel {
    id() {
        return this.operationId() || this._meta.id;
    }
    hasOperationId() {
        return !!this._meta.id;
    }
    operationId() {
        return this._meta.id;
    }
    security() {
        return (this._json.security || []).map((security, index) => {
            const scheme = this.createModel(security_scheme_1.SecurityScheme, security, { id: '', pointer: this.jsonPath(`security/${index}`) });
            const requirement = this.createModel(security_requirement_1.SecurityRequirement, { scheme, scopes: security.scopes }, { id: '', pointer: this.jsonPath(`security/${index}`) });
            return new security_requirements_1.SecurityRequirements([requirement]);
        });
    }
}
exports.OperationTrait = OperationTrait;
