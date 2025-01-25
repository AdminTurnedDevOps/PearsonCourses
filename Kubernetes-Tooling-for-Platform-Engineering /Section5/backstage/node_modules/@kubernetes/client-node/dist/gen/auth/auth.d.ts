import { RequestContext } from "../http/http";
/**
 * Interface authentication schemes.
 */
export interface SecurityAuthentication {
    getName(): string;
    /**
     * Applies the authentication scheme to the request context
     *
     * @params context the request context which should use this authentication scheme
     */
    applySecurityAuthentication(context: RequestContext): void | Promise<void>;
}
export interface TokenProvider {
    getToken(): Promise<string> | string;
}
/**
 * Applies apiKey authentication to the request context.
 */
export declare class BearerTokenAuthentication implements SecurityAuthentication {
    private apiKey;
    /**
     * Configures this api key authentication with the necessary properties
     *
     * @param apiKey: The api key to be used for every request
     */
    constructor(apiKey: string);
    getName(): string;
    applySecurityAuthentication(context: RequestContext): void;
}
export type AuthMethods = {
    "default"?: SecurityAuthentication;
    "BearerToken"?: SecurityAuthentication;
};
export type ApiKeyConfiguration = string;
export type HttpBasicConfiguration = {
    "username": string;
    "password": string;
};
export type HttpBearerConfiguration = {
    tokenProvider: TokenProvider;
};
export type OAuth2Configuration = {
    accessToken: string;
};
export type AuthMethodsConfiguration = {
    "default"?: SecurityAuthentication;
    "BearerToken"?: ApiKeyConfiguration;
};
/**
 * Creates the authentication methods from a swagger description.
 *
 */
export declare function configureAuthMethods(config: AuthMethodsConfiguration | undefined): AuthMethods;
