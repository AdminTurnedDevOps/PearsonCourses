import { BaseModel } from '../base';
import { SecurityScheme } from './security-scheme';
import { SecurityRequirements } from './security-requirements';
import { SecurityRequirement } from './security-requirement';
import { bindings, hasDescription, description, extensions, hasExternalDocs, externalDocs, tags } from './mixins';
export class OperationTrait extends BaseModel {
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
        return hasDescription(this);
    }
    description() {
        return description(this);
    }
    hasExternalDocs() {
        return hasExternalDocs(this);
    }
    externalDocs() {
        return externalDocs(this);
    }
    security() {
        var _a, _b, _c, _d;
        const securitySchemes = (((_d = (_c = (_b = (_a = this._meta) === null || _a === void 0 ? void 0 : _a.asyncapi) === null || _b === void 0 ? void 0 : _b.parsed) === null || _c === void 0 ? void 0 : _c.components) === null || _d === void 0 ? void 0 : _d.securitySchemes) || {});
        return (this._json.security || []).map((requirement, index) => {
            const requirements = [];
            Object.entries(requirement).forEach(([security, scopes]) => {
                const scheme = this.createModel(SecurityScheme, securitySchemes[security], { id: security, pointer: `/components/securitySchemes/${security}` });
                requirements.push(this.createModel(SecurityRequirement, { scheme, scopes }, { id: security, pointer: `${this.meta().pointer}/security/${index}/${security}` }));
            });
            return new SecurityRequirements(requirements);
        });
    }
    tags() {
        return tags(this);
    }
    bindings() {
        return bindings(this);
    }
    extensions() {
        return extensions(this);
    }
}
