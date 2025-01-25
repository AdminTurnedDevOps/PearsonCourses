import { SpecificationExtensionsModel } from './mixins';
import type { v2 } from '../spec-types';
export declare class OAuthFlow extends SpecificationExtensionsModel<v2.OAuthFlowObject> {
    authorizationUrl(): string;
    tokenUrl(): string;
    refreshUrl(): string | undefined;
    scopes(): Record<string, string>;
}
