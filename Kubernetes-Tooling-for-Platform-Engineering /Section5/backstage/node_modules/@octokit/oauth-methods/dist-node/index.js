"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// pkg/dist-src/index.js
var dist_src_exports = {};
__export(dist_src_exports, {
  VERSION: () => VERSION,
  checkToken: () => checkToken,
  createDeviceCode: () => createDeviceCode,
  deleteAuthorization: () => deleteAuthorization,
  deleteToken: () => deleteToken,
  exchangeDeviceCode: () => exchangeDeviceCode,
  exchangeWebFlowCode: () => exchangeWebFlowCode,
  getWebFlowAuthorizationUrl: () => getWebFlowAuthorizationUrl,
  refreshToken: () => refreshToken,
  resetToken: () => resetToken,
  scopeToken: () => scopeToken
});
module.exports = __toCommonJS(dist_src_exports);

// pkg/dist-src/version.js
var VERSION = "2.0.6";

// pkg/dist-src/get-web-flow-authorization-url.js
var import_oauth_authorization_url = require("@octokit/oauth-authorization-url");
var import_request = require("@octokit/request");

// pkg/dist-src/utils.js
var import_request_error = require("@octokit/request-error");
function requestToOAuthBaseUrl(request) {
  const endpointDefaults = request.endpoint.DEFAULTS;
  return /^https:\/\/(api\.)?github\.com$/.test(endpointDefaults.baseUrl) ? "https://github.com" : endpointDefaults.baseUrl.replace("/api/v3", "");
}
async function oauthRequest(request, route, parameters) {
  const withOAuthParameters = {
    baseUrl: requestToOAuthBaseUrl(request),
    headers: {
      accept: "application/json"
    },
    ...parameters
  };
  const response = await request(route, withOAuthParameters);
  if ("error" in response.data) {
    const error = new import_request_error.RequestError(
      `${response.data.error_description} (${response.data.error}, ${response.data.error_uri})`,
      400,
      {
        request: request.endpoint.merge(
          route,
          withOAuthParameters
        ),
        headers: response.headers
      }
    );
    error.response = response;
    throw error;
  }
  return response;
}

// pkg/dist-src/get-web-flow-authorization-url.js
function getWebFlowAuthorizationUrl({
  request = import_request.request,
  ...options
}) {
  const baseUrl = requestToOAuthBaseUrl(request);
  return (0, import_oauth_authorization_url.oauthAuthorizationUrl)({
    ...options,
    baseUrl
  });
}

// pkg/dist-src/exchange-web-flow-code.js
var import_request2 = require("@octokit/request");
async function exchangeWebFlowCode(options) {
  const request = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  import_request2.request;
  const response = await oauthRequest(
    request,
    "POST /login/oauth/access_token",
    {
      client_id: options.clientId,
      client_secret: options.clientSecret,
      code: options.code,
      redirect_uri: options.redirectUrl
    }
  );
  const authentication = {
    clientType: options.clientType,
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    token: response.data.access_token,
    scopes: response.data.scope.split(/\s+/).filter(Boolean)
  };
  if (options.clientType === "github-app") {
    if ("refresh_token" in response.data) {
      const apiTimeInMs = new Date(response.headers.date).getTime();
      authentication.refreshToken = response.data.refresh_token, authentication.expiresAt = toTimestamp(
        apiTimeInMs,
        response.data.expires_in
      ), authentication.refreshTokenExpiresAt = toTimestamp(
        apiTimeInMs,
        response.data.refresh_token_expires_in
      );
    }
    delete authentication.scopes;
  }
  return { ...response, authentication };
}
function toTimestamp(apiTimeInMs, expirationInSeconds) {
  return new Date(apiTimeInMs + expirationInSeconds * 1e3).toISOString();
}

// pkg/dist-src/create-device-code.js
var import_request3 = require("@octokit/request");
async function createDeviceCode(options) {
  const request = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  import_request3.request;
  const parameters = {
    client_id: options.clientId
  };
  if ("scopes" in options && Array.isArray(options.scopes)) {
    parameters.scope = options.scopes.join(" ");
  }
  return oauthRequest(request, "POST /login/device/code", parameters);
}

// pkg/dist-src/exchange-device-code.js
var import_request4 = require("@octokit/request");
async function exchangeDeviceCode(options) {
  const request = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  import_request4.request;
  const response = await oauthRequest(
    request,
    "POST /login/oauth/access_token",
    {
      client_id: options.clientId,
      device_code: options.code,
      grant_type: "urn:ietf:params:oauth:grant-type:device_code"
    }
  );
  const authentication = {
    clientType: options.clientType,
    clientId: options.clientId,
    token: response.data.access_token,
    scopes: response.data.scope.split(/\s+/).filter(Boolean)
  };
  if ("clientSecret" in options) {
    authentication.clientSecret = options.clientSecret;
  }
  if (options.clientType === "github-app") {
    if ("refresh_token" in response.data) {
      const apiTimeInMs = new Date(response.headers.date).getTime();
      authentication.refreshToken = response.data.refresh_token, authentication.expiresAt = toTimestamp2(
        apiTimeInMs,
        response.data.expires_in
      ), authentication.refreshTokenExpiresAt = toTimestamp2(
        apiTimeInMs,
        response.data.refresh_token_expires_in
      );
    }
    delete authentication.scopes;
  }
  return { ...response, authentication };
}
function toTimestamp2(apiTimeInMs, expirationInSeconds) {
  return new Date(apiTimeInMs + expirationInSeconds * 1e3).toISOString();
}

// pkg/dist-src/check-token.js
var import_request5 = require("@octokit/request");
var import_btoa_lite = __toESM(require("btoa-lite"));
async function checkToken(options) {
  const request = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  import_request5.request;
  const response = await request("POST /applications/{client_id}/token", {
    headers: {
      authorization: `basic ${(0, import_btoa_lite.default)(
        `${options.clientId}:${options.clientSecret}`
      )}`
    },
    client_id: options.clientId,
    access_token: options.token
  });
  const authentication = {
    clientType: options.clientType,
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    token: options.token,
    scopes: response.data.scopes
  };
  if (response.data.expires_at)
    authentication.expiresAt = response.data.expires_at;
  if (options.clientType === "github-app") {
    delete authentication.scopes;
  }
  return { ...response, authentication };
}

// pkg/dist-src/refresh-token.js
var import_request6 = require("@octokit/request");
async function refreshToken(options) {
  const request = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  import_request6.request;
  const response = await oauthRequest(
    request,
    "POST /login/oauth/access_token",
    {
      client_id: options.clientId,
      client_secret: options.clientSecret,
      grant_type: "refresh_token",
      refresh_token: options.refreshToken
    }
  );
  const apiTimeInMs = new Date(response.headers.date).getTime();
  const authentication = {
    clientType: "github-app",
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    token: response.data.access_token,
    refreshToken: response.data.refresh_token,
    expiresAt: toTimestamp3(apiTimeInMs, response.data.expires_in),
    refreshTokenExpiresAt: toTimestamp3(
      apiTimeInMs,
      response.data.refresh_token_expires_in
    )
  };
  return { ...response, authentication };
}
function toTimestamp3(apiTimeInMs, expirationInSeconds) {
  return new Date(apiTimeInMs + expirationInSeconds * 1e3).toISOString();
}

// pkg/dist-src/scope-token.js
var import_request7 = require("@octokit/request");
var import_btoa_lite2 = __toESM(require("btoa-lite"));
async function scopeToken(options) {
  const {
    request: optionsRequest,
    clientType,
    clientId,
    clientSecret,
    token,
    ...requestOptions
  } = options;
  const request = optionsRequest || /* istanbul ignore next: we always pass a custom request in tests */
  import_request7.request;
  const response = await request(
    "POST /applications/{client_id}/token/scoped",
    {
      headers: {
        authorization: `basic ${(0, import_btoa_lite2.default)(`${clientId}:${clientSecret}`)}`
      },
      client_id: clientId,
      access_token: token,
      ...requestOptions
    }
  );
  const authentication = Object.assign(
    {
      clientType,
      clientId,
      clientSecret,
      token: response.data.token
    },
    response.data.expires_at ? { expiresAt: response.data.expires_at } : {}
  );
  return { ...response, authentication };
}

// pkg/dist-src/reset-token.js
var import_request8 = require("@octokit/request");
var import_btoa_lite3 = __toESM(require("btoa-lite"));
async function resetToken(options) {
  const request = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  import_request8.request;
  const auth = (0, import_btoa_lite3.default)(`${options.clientId}:${options.clientSecret}`);
  const response = await request(
    "PATCH /applications/{client_id}/token",
    {
      headers: {
        authorization: `basic ${auth}`
      },
      client_id: options.clientId,
      access_token: options.token
    }
  );
  const authentication = {
    clientType: options.clientType,
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    token: response.data.token,
    scopes: response.data.scopes
  };
  if (response.data.expires_at)
    authentication.expiresAt = response.data.expires_at;
  if (options.clientType === "github-app") {
    delete authentication.scopes;
  }
  return { ...response, authentication };
}

// pkg/dist-src/delete-token.js
var import_request9 = require("@octokit/request");
var import_btoa_lite4 = __toESM(require("btoa-lite"));
async function deleteToken(options) {
  const request = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  import_request9.request;
  const auth = (0, import_btoa_lite4.default)(`${options.clientId}:${options.clientSecret}`);
  return request(
    "DELETE /applications/{client_id}/token",
    {
      headers: {
        authorization: `basic ${auth}`
      },
      client_id: options.clientId,
      access_token: options.token
    }
  );
}

// pkg/dist-src/delete-authorization.js
var import_request10 = require("@octokit/request");
var import_btoa_lite5 = __toESM(require("btoa-lite"));
async function deleteAuthorization(options) {
  const request = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  import_request10.request;
  const auth = (0, import_btoa_lite5.default)(`${options.clientId}:${options.clientSecret}`);
  return request(
    "DELETE /applications/{client_id}/grant",
    {
      headers: {
        authorization: `basic ${auth}`
      },
      client_id: options.clientId,
      access_token: options.token
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VERSION,
  checkToken,
  createDeviceCode,
  deleteAuthorization,
  deleteToken,
  exchangeDeviceCode,
  exchangeWebFlowCode,
  getWebFlowAuthorizationUrl,
  refreshToken,
  resetToken,
  scopeToken
});
