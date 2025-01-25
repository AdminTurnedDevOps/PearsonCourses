import { Collection } from '../collection';
export class SecuritySchemes extends Collection {
    get(id) {
        return this.collections.find(securityScheme => securityScheme.id() === id);
    }
}
