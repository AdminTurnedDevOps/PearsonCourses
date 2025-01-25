import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { SecuritySchemeInterface } from '../security-scheme';
import type { OAuthFlowsInterface } from '../oauth-flows';
import type { v3 } from '../../spec-types';
export declare class SecurityScheme extends BaseModel<v3.SecuritySchemeObject, {
    id: string;
}> implements SecuritySchemeInterface {
    id(): string;
    type(): v3.SecuritySchemeType;
    hasDescription(): boolean;
    description(): string | undefined;
    hasName(): boolean;
    name(): string | undefined;
    hasIn(): boolean;
    in(): v3.SecuritySchemaLocation | undefined;
    hasScheme(): boolean;
    scheme(): string | undefined;
    hasBearerFormat(): boolean;
    bearerFormat(): string | undefined;
    hasFlows(): boolean;
    flows(): OAuthFlowsInterface | undefined;
    hasOpenIdConnectUrl(): boolean;
    openIdConnectUrl(): string | undefined;
    extensions(): ExtensionsInterface;
}
