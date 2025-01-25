import { getUserAgent } from "universal-user-agent";
import { request as octokitRequest } from "@octokit/request";
import { VERSION } from "./version";
import { auth } from "./auth";
import { hook } from "./hook";
import { requiresBasicAuth } from "./requires-basic-auth";
function createOAuthUserAuth({
  clientId,
  clientSecret,
  clientType = "oauth-app",
  request = octokitRequest.defaults({
    headers: {
      "user-agent": `octokit-auth-oauth-app.js/${VERSION} ${getUserAgent()}`
    }
  }),
  onTokenCreated,
  ...strategyOptions
}) {
  const state = Object.assign({
    clientType,
    clientId,
    clientSecret,
    onTokenCreated,
    strategyOptions,
    request
  });
  return Object.assign(auth.bind(null, state), {
    // @ts-expect-error not worth the extra code needed to appease TS
    hook: hook.bind(null, state)
  });
}
createOAuthUserAuth.VERSION = VERSION;
export {
  createOAuthUserAuth,
  requiresBasicAuth
};
