import { Algorithm } from "./types.js";
import { getAlgorithm } from "./utils.js";
const enc = new TextEncoder();
function hexToUInt8Array(string) {
  const pairs = string.match(/[\dA-F]{2}/gi);
  const integers = pairs.map(function(s) {
    return parseInt(s, 16);
  });
  return new Uint8Array(integers);
}
function UInt8ArrayToHex(signature) {
  return Array.prototype.map.call(new Uint8Array(signature), (x) => x.toString(16).padStart(2, "0")).join("");
}
function getHMACHashName(algorithm) {
  return {
    [Algorithm.SHA1]: "SHA-1",
    [Algorithm.SHA256]: "SHA-256"
  }[algorithm];
}
async function importKey(secret, algorithm) {
  return crypto.subtle.importKey(
    "raw",
    // raw format of the key - should be Uint8Array
    enc.encode(secret),
    {
      // algorithm details
      name: "HMAC",
      hash: { name: getHMACHashName(algorithm) }
    },
    false,
    // export = false
    ["sign", "verify"]
    // what this key can do
  );
}
async function sign(options, payload) {
  const { secret, algorithm } = typeof options === "object" ? {
    secret: options.secret,
    algorithm: options.algorithm || Algorithm.SHA256
  } : { secret: options, algorithm: Algorithm.SHA256 };
  if (!secret || !payload) {
    throw new TypeError(
      "[@octokit/webhooks-methods] secret & payload required for sign()"
    );
  }
  if (typeof payload !== "string") {
    throw new TypeError("[@octokit/webhooks-methods] payload must be a string");
  }
  if (!Object.values(Algorithm).includes(algorithm)) {
    throw new TypeError(
      `[@octokit/webhooks] Algorithm ${algorithm} is not supported. Must be  'sha1' or 'sha256'`
    );
  }
  const signature = await crypto.subtle.sign(
    "HMAC",
    await importKey(secret, algorithm),
    enc.encode(payload)
  );
  return `${algorithm}=${UInt8ArrayToHex(signature)}`;
}
async function verify(secret, eventPayload, signature) {
  if (!secret || !eventPayload || !signature) {
    throw new TypeError(
      "[@octokit/webhooks-methods] secret, eventPayload & signature required"
    );
  }
  if (typeof eventPayload !== "string") {
    throw new TypeError(
      "[@octokit/webhooks-methods] eventPayload must be a string"
    );
  }
  const algorithm = getAlgorithm(signature);
  return await crypto.subtle.verify(
    "HMAC",
    await importKey(secret, algorithm),
    hexToUInt8Array(signature.replace(`${algorithm}=`, "")),
    enc.encode(eventPayload)
  );
}
export {
  sign,
  verify
};
