import { Collection } from '../collection';
export class SecurityRequirements extends Collection {
    get(id) {
        return this.collections.find(securityRequirement => securityRequirement.meta('id') === id);
    }
}
