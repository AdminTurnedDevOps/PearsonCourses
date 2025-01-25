'use strict';

var https = require('https');
var clientNode = require('@kubernetes/client-node');
var fetch = require('node-fetch');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

function _interopNamespaceCompat(e) {
  if (e && typeof e === 'object' && 'default' in e) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var https__namespace = /*#__PURE__*/_interopNamespaceCompat(https);
var fetch__default = /*#__PURE__*/_interopDefaultCompat(fetch);

class PinnipedHelper {
  constructor(logger) {
    this.logger = logger;
  }
  async tokenCredentialRequest(clusterDetails, pinnipedParams) {
    this.logger.debug("Pinniped: Requesting client Certs to Concierge");
    return await this.exchangeClusterTokentoClientCerts(
      clusterDetails,
      pinnipedParams
    );
  }
  async exchangeClusterTokentoClientCerts(clusterDetails, pinnipedParams) {
    const url = new URL(clusterDetails.url);
    const apiGroup = pinnipedParams.tokenCredentialRequest?.apiGroup ?? "login.concierge.pinniped.dev/v1alpha1";
    url.pathname = `/apis/${apiGroup}/tokencredentialrequests`;
    const requestInit = this.buildRequestForPinniped(
      url,
      clusterDetails,
      pinnipedParams
    );
    this.logger.info(
      "Fetching client certs for mTLS authentication on Pinniped"
    );
    let response;
    try {
      response = await fetch__default.default(url, requestInit);
    } catch (error) {
      this.logger.error("Pinniped request error", error);
      throw error;
    }
    const data = await response.json();
    if (data.status.credential) {
      const result = {
        key: data.status.credential.clientKeyData,
        cert: data.status.credential.clientCertificateData,
        expirationTimestamp: data.status.credential.expirationTimestamp
      };
      return Promise.resolve(result);
    }
    this.logger.error("Unable to fetch client certs,", data.status);
    return Promise.reject(data.status.message);
  }
  buildRequestForPinniped(url, clusterDetails, pinnipedParams) {
    const body = {
      apiVersion: pinnipedParams.tokenCredentialRequest?.apiGroup ?? "login.concierge.pinniped.dev/v1alpha1",
      kind: "TokenCredentialRequest",
      spec: {
        authenticator: pinnipedParams.authenticator,
        token: pinnipedParams.clusterScopedIdToken
      }
    };
    const requestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };
    if (url.protocol === "https:") {
      requestInit.agent = new https__namespace.Agent({
        ca: clientNode.bufferFromFileOrString(
          clusterDetails.caFile,
          clusterDetails.caData
        ) ?? void 0,
        rejectUnauthorized: !clusterDetails.skipTLSVerify
      });
    }
    return requestInit;
  }
}

exports.PinnipedHelper = PinnipedHelper;
//# sourceMappingURL=PinnipedHelper.cjs.js.map
