import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { OAuthFlowsInterface } from '../oauth-flows';
import type { OAuthFlowInterface } from '../oauth-flow';
import type { v3 } from '../../spec-types';
export declare class OAuthFlows extends BaseModel<v3.OAuthFlowsObject> implements OAuthFlowsInterface {
    hasAuthorizationCode(): boolean;
    authorizationCode(): OAuthFlowInterface<v3.OAuthFlowObjectAuthorizationCode> | undefined;
    hasClientCredentials(): boolean;
    clientCredentials(): OAuthFlowInterface<v3.OAuthFlowObjectClientCredentials> | undefined;
    hasImplicit(): boolean;
    implicit(): OAuthFlowInterface<v3.OAuthFlowObjectImplicit> | undefined;
    hasPassword(): boolean;
    password(): OAuthFlowInterface<v3.OAuthFlowObjectPassword> | undefined;
    extensions(): ExtensionsInterface;
}
