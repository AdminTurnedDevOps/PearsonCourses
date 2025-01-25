'use strict';

var clientNode = require('@kubernetes/client-node');
var lodash = require('lodash');
var pluginKubernetesCommon = require('@backstage/plugin-kubernetes-common');
var fetch = require('node-fetch');
var https = require('https');
var fs = require('fs-extra');

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

var lodash__default = /*#__PURE__*/_interopDefaultCompat(lodash);
var fetch__default = /*#__PURE__*/_interopDefaultCompat(fetch);
var https__namespace = /*#__PURE__*/_interopNamespaceCompat(https);
var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);

const isError = (fr) => fr.hasOwnProperty("errorType");
function fetchResultsToResponseWrapper(results) {
  const groupBy = lodash__default.default.groupBy(results, (value) => {
    return isError(value) ? "errors" : "responses";
  });
  return {
    errors: groupBy.errors ?? [],
    responses: groupBy.responses ?? []
  };
}
const statusCodeToErrorType = (statusCode) => {
  switch (statusCode) {
    case 400:
      return "BAD_REQUEST";
    case 401:
      return "UNAUTHORIZED_ERROR";
    case 404:
      return "NOT_FOUND";
    case 500:
      return "SYSTEM_ERROR";
    default:
      return "UNKNOWN_ERROR";
  }
};
class KubernetesClientBasedFetcher {
  logger;
  constructor({ logger }) {
    this.logger = logger;
  }
  fetchObjectsForService(params) {
    const fetchResults = Array.from(params.objectTypesToFetch).concat(params.customResources).map(
      ({ objectType, group, apiVersion, plural }) => this.fetchResource(
        params.clusterDetails,
        params.credential,
        group,
        apiVersion,
        plural,
        params.namespace,
        params.labelSelector
      ).then(
        (r) => r.ok ? r.json().then(
          ({ kind, items }) => ({
            type: objectType,
            resources: objectType === "customresources" ? items.map((item) => ({
              ...item,
              kind: kind.replace(/(List)$/, "")
            })) : items
          })
        ) : this.handleUnsuccessfulResponse(params.clusterDetails.name, r)
      )
    );
    return Promise.all(fetchResults).then(fetchResultsToResponseWrapper);
  }
  fetchPodMetricsByNamespaces(clusterDetails, credential, namespaces, labelSelector) {
    const fetchResults = Array.from(namespaces).map(async (ns) => {
      const [podMetrics, podList] = await Promise.all([
        this.fetchResource(
          clusterDetails,
          credential,
          "metrics.k8s.io",
          "v1beta1",
          "pods",
          ns,
          labelSelector
        ),
        this.fetchResource(
          clusterDetails,
          credential,
          "",
          "v1",
          "pods",
          ns,
          labelSelector
        )
      ]);
      if (podMetrics.ok && podList.ok) {
        return clientNode.topPods(
          {
            listPodForAllNamespaces: () => podList.json()
          },
          {
            getPodMetrics: () => podMetrics.json()
          }
        ).then(
          (resources) => ({
            type: "podstatus",
            resources
          })
        );
      } else if (podMetrics.ok) {
        return this.handleUnsuccessfulResponse(clusterDetails.name, podList);
      }
      return this.handleUnsuccessfulResponse(clusterDetails.name, podMetrics);
    });
    return Promise.all(fetchResults).then(fetchResultsToResponseWrapper);
  }
  async handleUnsuccessfulResponse(clusterName, res) {
    const resourcePath = new URL(res.url).pathname;
    this.logger.warn(
      `Received ${res.status} status when fetching "${resourcePath}" from cluster "${clusterName}"; body=[${await res.text()}]`
    );
    return {
      errorType: statusCodeToErrorType(res.status),
      statusCode: res.status,
      resourcePath
    };
  }
  fetchResource(clusterDetails, credential, group, apiVersion, plural, namespace, labelSelector) {
    const encode = (s) => encodeURIComponent(s);
    let resourcePath = group ? `/apis/${encode(group)}/${encode(apiVersion)}` : `/api/${encode(apiVersion)}`;
    if (namespace) {
      resourcePath += `/namespaces/${encode(namespace)}`;
    }
    resourcePath += `/${encode(plural)}`;
    let url;
    let requestInit;
    const authProvider = clusterDetails.authMetadata[pluginKubernetesCommon.ANNOTATION_KUBERNETES_AUTH_PROVIDER];
    if (this.isServiceAccountAuthentication(authProvider, clusterDetails)) {
      [url, requestInit] = this.fetchArgsInCluster(credential);
    } else if (!this.isCredentialMissing(authProvider, credential)) {
      [url, requestInit] = this.fetchArgs(clusterDetails, credential);
    } else {
      return Promise.reject(
        new Error(
          `no bearer token or client cert for cluster '${clusterDetails.name}' and not running in Kubernetes`
        )
      );
    }
    if (url.pathname === "/") {
      url.pathname = resourcePath;
    } else {
      url.pathname += resourcePath;
    }
    if (labelSelector) {
      url.search = `labelSelector=${encode(labelSelector)}`;
    }
    return fetch__default.default(url, requestInit);
  }
  isServiceAccountAuthentication(authProvider, clusterDetails) {
    return authProvider === "serviceAccount" && !clusterDetails.authMetadata.serviceAccountToken && fs__default.default.pathExistsSync(pluginKubernetesCommon.SERVICEACCOUNT_CA_PATH);
  }
  isCredentialMissing(authProvider, credential) {
    return authProvider !== "localKubectlProxy" && credential.type === "anonymous";
  }
  fetchArgs(clusterDetails, credential) {
    const requestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...credential.type === "bearer token" && {
          Authorization: `Bearer ${credential.token}`
        }
      }
    };
    const url = new URL(clusterDetails.url);
    if (url.protocol === "https:") {
      requestInit.agent = new https__namespace.Agent({
        ca: clientNode.bufferFromFileOrString(
          clusterDetails.caFile,
          clusterDetails.caData
        ) ?? void 0,
        rejectUnauthorized: !clusterDetails.skipTLSVerify,
        ...credential.type === "x509 client certificate" && {
          cert: credential.cert,
          key: credential.key
        }
      });
    }
    return [url, requestInit];
  }
  fetchArgsInCluster(credential) {
    const requestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...credential.type === "bearer token" && {
          Authorization: `Bearer ${credential.token}`
        }
      }
    };
    const kc = new clientNode.KubeConfig();
    kc.loadFromCluster();
    const cluster = kc.getCurrentCluster();
    const url = new URL(cluster.server);
    if (url.protocol === "https:") {
      requestInit.agent = new https__namespace.Agent({
        ca: fs__default.default.readFileSync(cluster.caFile)
      });
    }
    return [url, requestInit];
  }
}

exports.KubernetesClientBasedFetcher = KubernetesClientBasedFetcher;
//# sourceMappingURL=KubernetesFetcher.cjs.js.map
