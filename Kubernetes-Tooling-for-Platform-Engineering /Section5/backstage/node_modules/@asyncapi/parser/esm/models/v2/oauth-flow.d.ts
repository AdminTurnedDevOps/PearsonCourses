import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { OAuthFlowInterface } from '../oauth-flow';
import type { v2 } from '../../spec-types';
export declare class OAuthFlow<F extends v2.OAuthFlowObjectBase> extends BaseModel<F> implements OAuthFlowInterface {
    hasAuthorizationUrl(): boolean;
    authorizationUrl(): string | undefined;
    hasTokenUrl(): boolean;
    tokenUrl(): string | undefined;
    hasRefreshUrl(): boolean;
    refreshUrl(): string | undefined;
    scopes(): Record<string, string> | undefined;
    extensions(): ExtensionsInterface;
}
