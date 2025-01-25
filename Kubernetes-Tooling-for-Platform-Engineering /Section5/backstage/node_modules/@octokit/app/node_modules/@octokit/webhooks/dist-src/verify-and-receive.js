import AggregateError from "aggregate-error";
import { verify } from "@octokit/webhooks-methods";
async function verifyAndReceive(state, event) {
  const matchesSignature = await verify(
    state.secret,
    event.payload,
    event.signature
  ).catch(() => false);
  if (!matchesSignature) {
    const error = new Error(
      "[@octokit/webhooks] signature does not match event payload and secret"
    );
    return state.eventHandler.receive(
      Object.assign(error, { event, status: 400 })
    );
  }
  let payload;
  try {
    payload = JSON.parse(event.payload);
  } catch (error) {
    error.message = "Invalid JSON";
    error.status = 400;
    throw new AggregateError([error]);
  }
  return state.eventHandler.receive({
    id: event.id,
    name: event.name,
    payload
  });
}
export {
  verifyAndReceive
};
