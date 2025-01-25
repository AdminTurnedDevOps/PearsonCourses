import { timingSafeEqual } from "crypto";
import { Buffer } from "buffer";
import { sign } from "./sign";
import { VERSION } from "../version";
import { getAlgorithm } from "../utils";
async function verify(secret, eventPayload, signature) {
  if (!secret || !eventPayload || !signature) {
    throw new TypeError(
      "[@octokit/webhooks-methods] secret, eventPayload & signature required"
    );
  }
  const signatureBuffer = Buffer.from(signature);
  const algorithm = getAlgorithm(signature);
  const verificationBuffer = Buffer.from(
    await sign({ secret, algorithm }, eventPayload)
  );
  if (signatureBuffer.length !== verificationBuffer.length) {
    return false;
  }
  return timingSafeEqual(signatureBuffer, verificationBuffer);
}
verify.VERSION = VERSION;
export {
  verify
};
