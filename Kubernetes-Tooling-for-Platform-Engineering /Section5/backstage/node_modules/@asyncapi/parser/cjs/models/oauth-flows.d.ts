import type { BaseModel } from './base';
import type { OAuthFlowInterface } from './oauth-flow';
import type { ExtensionsMixinInterface } from './mixins';
export interface OAuthFlowsInterface extends BaseModel, ExtensionsMixinInterface {
    hasAuthorizationCode(): boolean;
    authorizationCode(): OAuthFlowInterface | undefined;
    hasClientCredentials(): boolean;
    clientCredentials(): OAuthFlowInterface | undefined;
    hasImplicit(): boolean;
    implicit(): OAuthFlowInterface | undefined;
    hasPassword(): boolean;
    password(): OAuthFlowInterface | undefined;
}
