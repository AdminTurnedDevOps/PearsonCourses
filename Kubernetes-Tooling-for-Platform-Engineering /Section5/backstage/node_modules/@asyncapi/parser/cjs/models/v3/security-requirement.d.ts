import { BaseModel } from '../base';
import type { SecuritySchemeInterface } from '../security-scheme';
import type { SecurityRequirementInterface } from '../security-requirement';
export declare class SecurityRequirement extends BaseModel<{
    scopes?: string[];
    scheme: SecuritySchemeInterface;
}, {
    id?: string;
}> implements SecurityRequirementInterface {
    scheme(): SecuritySchemeInterface;
    scopes(): string[];
}
