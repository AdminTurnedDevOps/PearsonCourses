import { SecurityScheme } from './security-scheme';
import { SecurityRequirements } from './security-requirements';
import { SecurityRequirement } from './security-requirement';
import { CoreModel } from './mixins';
export class OperationTrait extends CoreModel {
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
            const scheme = this.createModel(SecurityScheme, security, { id: '', pointer: this.jsonPath(`security/${index}`) });
            const requirement = this.createModel(SecurityRequirement, { scheme, scopes: security.scopes }, { id: '', pointer: this.jsonPath(`security/${index}`) });
            return new SecurityRequirements([requirement]);
        });
    }
}
