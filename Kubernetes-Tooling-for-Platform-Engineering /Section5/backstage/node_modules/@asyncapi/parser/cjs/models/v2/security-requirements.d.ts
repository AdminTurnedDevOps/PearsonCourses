import { Collection } from '../collection';
import type { SecurityRequirementsInterface } from '../security-requirements';
import type { SecurityRequirementInterface } from '../security-requirement';
export declare class SecurityRequirements extends Collection<SecurityRequirementInterface> implements SecurityRequirementsInterface {
    get(id: string): SecurityRequirementInterface | undefined;
}
