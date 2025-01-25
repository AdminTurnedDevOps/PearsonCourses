import { Collection } from '../collection';
import type { SecuritySchemesInterface } from '../security-schemes';
import type { SecuritySchemeInterface } from '../security-scheme';
export declare class SecuritySchemes extends Collection<SecuritySchemeInterface> implements SecuritySchemesInterface {
    get(id: string): SecuritySchemeInterface | undefined;
}
