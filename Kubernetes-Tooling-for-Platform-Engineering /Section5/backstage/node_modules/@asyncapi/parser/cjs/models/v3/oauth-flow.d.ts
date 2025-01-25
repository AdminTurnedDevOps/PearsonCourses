import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { OAuthFlowInterface } from '../oauth-flow';
import type { v3 } from '../../spec-types';
export declare class OAuthFlow<F extends v3.OAuthFlowObjectBase> extends BaseModel<F> implements OAuthFlowInterface {
    hasAuthorizationUrl(): boolean;
    authorizationUrl(): string | undefined;
    hasRefreshUrl(): boolean;
    refreshUrl(): string | undefined;
    scopes(): Record<string, string> | undefined;
    hasTokenUrl(): boolean;
    tokenUrl(): string | undefined;
    extensions(): ExtensionsInterface;
}
