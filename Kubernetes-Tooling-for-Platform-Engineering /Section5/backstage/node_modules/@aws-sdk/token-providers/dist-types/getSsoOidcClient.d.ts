import { FromSsoInit } from "./fromSso";
/**
 * Returns a SSOOIDC client for the given region.
 * @internal
 */
export declare const getSsoOidcClient: (ssoRegion: string, init?: FromSsoInit) => Promise<any>;
