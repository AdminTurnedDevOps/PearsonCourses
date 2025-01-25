'use strict';

var errors = require('@backstage/errors');
var pluginKubernetesCommon = require('@backstage/plugin-kubernetes-common');
var pluginPermissionCommon = require('@backstage/plugin-permission-common');
var clientNode = require('@kubernetes/client-node');
var httpProxyMiddleware = require('http-proxy-middleware');
var fs = require('fs-extra');
var backendCommon = require('@backstage/backend-common');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);

const HEADER_KUBERNETES_CLUSTER = "Backstage-Kubernetes-Cluster";
const HEADER_KUBERNETES_AUTH = "Backstage-Kubernetes-Authorization";
class KubernetesProxy {
  middlewareForClusterName = /* @__PURE__ */ new Map();
  logger;
  clusterSupplier;
  authStrategy;
  httpAuth;
  constructor(options) {
    this.logger = options.logger;
    this.clusterSupplier = options.clusterSupplier;
    this.authStrategy = options.authStrategy;
    const legacy = backendCommon.createLegacyAuthAdapters({
      discovery: options.discovery,
      httpAuth: options.httpAuth
    });
    this.httpAuth = legacy.httpAuth;
  }
  createRequestHandler(options) {
    const { permissionApi } = options;
    return async (req, res, next) => {
      const authorizeResponse = await permissionApi.authorize(
        [{ permission: pluginKubernetesCommon.kubernetesProxyPermission }],
        {
          credentials: await this.httpAuth.credentials(req)
        }
      );
      const auth = authorizeResponse[0];
      if (auth.result === pluginPermissionCommon.AuthorizeResult.DENY) {
        res.status(403).json({ error: new errors.NotAllowedError("Unauthorized") });
        return;
      }
      const middleware = await this.getMiddleware(req);
      if (req.header("connection")?.toLowerCase() === "upgrade" && req.header("upgrade")?.toLowerCase() === "websocket") {
        middleware.upgrade(req, req.socket, void 0);
      } else {
        middleware(req, res, next);
      }
    };
  }
  // We create one middleware per remote cluster and hold on to them, because
  // the secure property isn't possible to decide on a per-request basis with a
  // single middleware instance - and we don't expect it to change over time.
  async getMiddleware(originalReq) {
    const originalCluster = await this.getClusterForRequest(originalReq);
    let middleware = this.middlewareForClusterName.get(originalCluster.name);
    if (!middleware) {
      const logger = this.logger.child({ cluster: originalCluster.name });
      middleware = httpProxyMiddleware.createProxyMiddleware({
        // TODO: Add 'log' to LoggerService
        logProvider: () => backendCommon.loggerToWinstonLogger(logger),
        ws: true,
        secure: !originalCluster.skipTLSVerify,
        changeOrigin: true,
        pathRewrite: async (path, req) => {
          const cluster = await this.getClusterForRequest(req);
          const url = new URL(cluster.url);
          return path.replace(
            new RegExp(`^${originalReq.baseUrl}`),
            url.pathname || ""
          );
        },
        router: async (req) => {
          const cluster = await this.getClusterForRequest(req);
          const url = new URL(cluster.url);
          const target = {
            protocol: url.protocol,
            host: url.hostname,
            port: url.port,
            ca: clientNode.bufferFromFileOrString(
              cluster.caFile,
              cluster.caData
            )?.toString()
          };
          const authHeader = req.headers[HEADER_KUBERNETES_AUTH.toLocaleLowerCase("en-US")];
          if (typeof authHeader === "string") {
            req.headers.authorization = authHeader;
          } else {
            const authObj = KubernetesProxy.authHeadersToKubernetesRequestAuth(
              req.headers
            );
            const credential = await this.getClusterForRequest(req).then((cd) => {
              return this.authStrategy.getCredential(cd, authObj);
            });
            if (credential.type === "bearer token") {
              req.headers.authorization = `Bearer ${credential.token}`;
            } else if (credential.type === "x509 client certificate") {
              target.key = credential.key;
              target.cert = credential.cert;
            }
          }
          return target;
        },
        onError: (error, req, res) => {
          const wrappedError = new errors.ForwardedError(
            `Cluster '${originalCluster.name}' request error`,
            error
          );
          logger.error("Kubernetes proxy error", wrappedError);
          const body = {
            error: errors.serializeError(wrappedError, {
              includeStack: process.env.NODE_ENV === "development"
            }),
            request: { method: req.method, url: req.originalUrl },
            response: { statusCode: 500 }
          };
          res.status(500).json(body);
        }
      });
      this.middlewareForClusterName.set(originalCluster.name, middleware);
    }
    return middleware;
  }
  async getClusterForRequest(req) {
    const clusterName = req.headers[HEADER_KUBERNETES_CLUSTER.toLowerCase()];
    const clusters = await this.clusterSupplier.getClusters({
      credentials: await this.httpAuth.credentials(req)
    });
    if (!clusters || clusters.length <= 0) {
      throw new errors.NotFoundError(`No Clusters configured`);
    }
    const hasClusterNameHeader = typeof clusterName === "string" && clusterName.length > 0;
    let cluster;
    if (hasClusterNameHeader) {
      cluster = clusters.find((c) => c.name === clusterName);
    } else if (clusters.length === 1) {
      cluster = clusters.at(0);
    }
    if (!cluster) {
      throw new errors.NotFoundError(`Cluster '${clusterName}' not found`);
    }
    const authProvider = cluster.authMetadata[pluginKubernetesCommon.ANNOTATION_KUBERNETES_AUTH_PROVIDER];
    if (authProvider === "serviceAccount" && fs__default.default.pathExistsSync(pluginKubernetesCommon.SERVICEACCOUNT_CA_PATH) && !cluster.authMetadata.serviceAccountToken) {
      const kc = new clientNode.KubeConfig();
      kc.loadFromCluster();
      const clusterFromKubeConfig = kc.getCurrentCluster();
      const url = new URL(clusterFromKubeConfig.server);
      cluster.url = clusterFromKubeConfig.server;
      if (url.protocol === "https:") {
        cluster.caFile = clusterFromKubeConfig.caFile;
      }
    }
    return cluster;
  }
  static authHeadersToKubernetesRequestAuth(originalHeaders) {
    return Object.keys(originalHeaders).filter((header) => header.startsWith("backstage-kubernetes-authorization")).map(
      (header) => KubernetesProxy.headerToDictionary(header, originalHeaders)
    ).filter((headerAsDic) => Object.keys(headerAsDic).length !== 0).reduce(KubernetesProxy.combineHeaders, {});
  }
  static headerToDictionary(header, originalHeaders) {
    const obj = {};
    const headerSplitted = header.split("-");
    if (headerSplitted.length >= 4) {
      const framework = headerSplitted[3].toLowerCase();
      if (headerSplitted.length >= 5) {
        const provider = headerSplitted.slice(4).join("-").toLowerCase();
        obj[framework] = { [provider]: originalHeaders[header] };
      } else {
        obj[framework] = originalHeaders[header];
      }
    }
    return obj;
  }
  static combineHeaders(authObj, header) {
    const framework = Object.keys(header)[0];
    if (authObj[framework]) {
      authObj[framework] = {
        ...authObj[framework],
        ...header[framework]
      };
    } else {
      authObj[framework] = header[framework];
    }
    return authObj;
  }
}

exports.HEADER_KUBERNETES_AUTH = HEADER_KUBERNETES_AUTH;
exports.HEADER_KUBERNETES_CLUSTER = HEADER_KUBERNETES_CLUSTER;
exports.KubernetesProxy = KubernetesProxy;
//# sourceMappingURL=KubernetesProxy.cjs.js.map
