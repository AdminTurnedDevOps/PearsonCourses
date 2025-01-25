import { createLogger } from "./createLogger";
import { createEventHandler } from "./event-handler/index";
import { sign } from "./sign";
import { verify } from "./verify";
import { verifyAndReceive } from "./verify-and-receive";
import { createNodeMiddleware } from "./middleware/node/index";
import { emitterEventNames } from "./generated/webhook-names";
class Webhooks {
  constructor(options) {
    if (!options || !options.secret) {
      throw new Error("[@octokit/webhooks] options.secret required");
    }
    const state = {
      eventHandler: createEventHandler(options),
      secret: options.secret,
      hooks: {},
      log: createLogger(options.log)
    };
    this.sign = sign.bind(null, options.secret);
    this.verify = (eventPayload, signature) => {
      if (typeof eventPayload === "object") {
        console.warn(
          "[@octokit/webhooks] Passing a JSON payload object to `verify()` is deprecated and the functionality will be removed in a future release of `@octokit/webhooks`"
        );
      }
      return verify(options.secret, eventPayload, signature);
    };
    this.on = state.eventHandler.on;
    this.onAny = state.eventHandler.onAny;
    this.onError = state.eventHandler.onError;
    this.removeListener = state.eventHandler.removeListener;
    this.receive = state.eventHandler.receive;
    this.verifyAndReceive = (options2) => {
      if (typeof options2.payload === "object") {
        console.warn(
          "[@octokit/webhooks] Passing a JSON payload object to `verifyAndReceive()` is deprecated and the functionality will be removed in a future release of `@octokit/webhooks`"
        );
      }
      return verifyAndReceive(state, options2);
    };
  }
}
export {
  Webhooks,
  createEventHandler,
  createNodeMiddleware,
  emitterEventNames
};
