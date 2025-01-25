import type { BaseModel } from './base';
import type { SecuritySchemeInterface } from './security-scheme';
export interface SecurityRequirementInterface extends BaseModel {
    scheme(): SecuritySchemeInterface;
    scopes(): string[];
}
