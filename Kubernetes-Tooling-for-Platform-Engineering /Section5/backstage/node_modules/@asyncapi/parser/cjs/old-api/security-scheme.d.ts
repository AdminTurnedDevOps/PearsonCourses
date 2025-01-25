import { SpecificationExtensionsModel } from './mixins';
import { OAuthFlow } from './oauth-flow';
import type { v2 } from '../spec-types';
export declare class SecurityScheme extends SpecificationExtensionsModel<v2.SecuritySchemeObject> {
    type(): v2.SecuritySchemeType;
    description(): string | null;
    hasDescription(): boolean;
    name(): string | undefined;
    in(): "user" | "password" | "query" | "header" | "cookie" | undefined;
    scheme(): string | undefined;
    bearerFormat(): string | undefined;
    openIdConnectUrl(): string | undefined;
    flows(): Record<string, OAuthFlow>;
}
