import type { BaseModel } from './base';
import type { OAuthFlowsInterface } from './oauth-flows';
import type { DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';
export interface SecuritySchemeInterface extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface {
    id(): string;
    type(): string;
    hasName(): boolean;
    name(): string | undefined;
    hasIn(): boolean;
    in(): string | undefined;
    hasScheme(): boolean;
    scheme(): string | undefined;
    hasBearerFormat(): boolean;
    bearerFormat(): string | undefined;
    hasFlows(): boolean;
    flows(): OAuthFlowsInterface | undefined;
    hasOpenIdConnectUrl(): boolean;
    openIdConnectUrl(): string | undefined;
}
