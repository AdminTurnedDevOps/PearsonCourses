import { getOAuthAccessToken } from "./get-oauth-access-token";
async function auth(state, authOptions) {
  return getOAuthAccessToken(state, {
    auth: authOptions
  });
}
export {
  auth
};
