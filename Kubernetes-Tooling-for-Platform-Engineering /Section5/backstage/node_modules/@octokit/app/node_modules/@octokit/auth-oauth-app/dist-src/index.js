import { getUserAgent } from "universal-user-agent";
import { request } from "@octokit/request";
import { auth } from "./auth";
import { hook } from "./hook";
import { VERSION } from "./version";
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";
function createOAuthAppAuth(options) {
  const state = Object.assign(
    {
      request: request.defaults({
        headers: {
          "user-agent": `octokit-auth-oauth-app.js/${VERSION} ${getUserAgent()}`
        }
      }),
      clientType: "oauth-app"
    },
    options
  );
  return Object.assign(auth.bind(null, state), {
    hook: hook.bind(null, state)
  });
}
export {
  createOAuthAppAuth,
  createOAuthUserAuth
};
