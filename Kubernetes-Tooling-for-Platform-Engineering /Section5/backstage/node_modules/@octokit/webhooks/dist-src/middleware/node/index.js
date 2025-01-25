import { createLogger } from "../../createLogger";
import { middleware } from "./middleware";
import { onUnhandledRequestDefault } from "./on-unhandled-request-default";
function createNodeMiddleware(webhooks, {
  path = "/api/github/webhooks",
  onUnhandledRequest = onUnhandledRequestDefault,
  log = createLogger()
} = {}) {
  const deprecateOnUnhandledRequest = (request, response) => {
    console.warn(
      "[@octokit/webhooks] `onUnhandledRequest()` is deprecated and will be removed in a future release of `@octokit/webhooks`"
    );
    return onUnhandledRequest(request, response);
  };
  return middleware.bind(null, webhooks, {
    path,
    onUnhandledRequest: deprecateOnUnhandledRequest,
    log
  });
}
export {
  createNodeMiddleware
};
