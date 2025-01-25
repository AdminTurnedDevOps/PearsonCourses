import { getSsoOidcClient } from "./getSsoOidcClient";
export const getNewSsoOidcToken = async (ssoToken, ssoRegion, init = {}) => {
    const { CreateTokenCommand } = await import("@aws-sdk/client-sso-oidc");
    const ssoOidcClient = await getSsoOidcClient(ssoRegion, init);
    return ssoOidcClient.send(new CreateTokenCommand({
        clientId: ssoToken.clientId,
        clientSecret: ssoToken.clientSecret,
        refreshToken: ssoToken.refreshToken,
        grantType: "refresh_token",
    }));
};
