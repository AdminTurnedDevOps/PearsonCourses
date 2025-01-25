import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { OAuthFlowsInterface } from '../oauth-flows';
import type { OAuthFlowInterface } from '../oauth-flow';
import type { v2 } from '../../spec-types';
export declare class OAuthFlows extends BaseModel<v2.OAuthFlowsObject> implements OAuthFlowsInterface {
    hasAuthorizationCode(): boolean;
    authorizationCode(): OAuthFlowInterface<v2.OAuthFlowObjectAuthorizationCode> | undefined;
    hasClientCredentials(): boolean;
    clientCredentials(): OAuthFlowInterface<v2.OAuthFlowObjectClientCredentials> | undefined;
    hasImplicit(): boolean;
    implicit(): OAuthFlowInterface<v2.OAuthFlowObjectImplicit> | undefined;
    hasPassword(): boolean;
    password(): OAuthFlowInterface<v2.OAuthFlowObjectPassword> | undefined;
    extensions(): ExtensionsInterface;
}
