"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.helpers = exports.default = void 0;
var _constants = require("./constants.js");
var _index = _interopRequireWildcard(require("./http/index.js"));
var _index2 = require("./http/serializers/response/index.js");
var _index3 = require("./resolver/index.js");
var _index4 = require("./subtree-resolver/index.js");
var _index5 = _interopRequireDefault(require("./resolver/strategies/generic/index.js"));
var _index6 = _interopRequireWildcard(require("./resolver/strategies/openapi-2/index.js"));
var _index7 = _interopRequireDefault(require("./resolver/strategies/openapi-3-0/index.js"));
var _index8 = _interopRequireDefault(require("./resolver/strategies/openapi-3-1-apidom/index.js"));
var _interfaces = require("./interfaces.js");
var _index9 = require("./execute/index.js");
var _index10 = require("./helpers/index.js");
var _openapiPredicates = require("./helpers/openapi-predicates.js");
var _index11 = _interopRequireDefault(require("./resolver/apidom/reference/resolve/resolvers/http-swagger-client/index.js"));
var _index12 = _interopRequireDefault(require("./resolver/apidom/reference/parse/parsers/json/index.js"));
var _index13 = _interopRequireDefault(require("./resolver/apidom/reference/parse/parsers/yaml-1-2/index.js"));
var _index14 = _interopRequireDefault(require("./resolver/apidom/reference/parse/parsers/openapi-json-3-1/index.js"));
var _index15 = _interopRequireDefault(require("./resolver/apidom/reference/parse/parsers/openapi-yaml-3-1/index.js"));
var _index16 = _interopRequireDefault(require("./resolver/apidom/reference/dereference/strategies/openapi-3-1-swagger-client/index.js"));
/* eslint-disable camelcase */

Swagger.http = _index.default;
Swagger.makeHttp = _index.makeHttp.bind(null, Swagger.http);
Swagger.resolveStrategies = {
  'openapi-3-1-apidom': _index8.default,
  'openapi-3-0': _index7.default,
  'openapi-2-0': _index6.default,
  generic: _index5.default
};
Swagger.resolve = (0, _index3.makeResolve)({
  strategies: [Swagger.resolveStrategies['openapi-3-1-apidom'], Swagger.resolveStrategies['openapi-3-0'], Swagger.resolveStrategies['openapi-2-0'], Swagger.resolveStrategies.generic]
});
Swagger.resolveSubtree = (0, _index4.makeResolveSubtree)({
  strategies: [Swagger.resolveStrategies['openapi-3-1-apidom'], Swagger.resolveStrategies['openapi-3-0'], Swagger.resolveStrategies['openapi-2-0'], Swagger.resolveStrategies.generic]
});
Swagger.execute = _index9.execute;
Swagger.serializeRes = _index.serializeRes;
Swagger.serializeHeaders = _index2.serializeHeaders;
Swagger.clearCache = _index6.clearCache;
Swagger.makeApisTagOperation = _interfaces.makeApisTagOperation;
Swagger.buildRequest = _index9.buildRequest;
Swagger.helpers = {
  opId: _index10.opId
};
Swagger.getBaseUrl = _index9.baseUrl;
Swagger.apidom = {
  resolve: {
    resolvers: {
      HTTPResolverSwaggerClient: _index11.default
    }
  },
  parse: {
    parsers: {
      JsonParser: _index12.default,
      YamlParser: _index13.default,
      OpenApiJson3_1Parser: _index14.default,
      OpenApiYaml3_1Parser: _index15.default
    }
  },
  dereference: {
    strategies: {
      OpenApi3_1SwaggerClientDereferenceStrategy: _index16.default
    }
  }
};
function Swagger(url, opts = {}) {
  // Allow url as a separate argument
  if (typeof url === 'string') {
    opts.url = url;
  } else {
    opts = url;
  }
  if (!(this instanceof Swagger)) {
    return new Swagger(opts);
  }
  Object.assign(this, opts);
  const prom = this.resolve().then(() => {
    if (!this.disableInterfaces) {
      Object.assign(this, Swagger.makeApisTagOperation(this));
    }
    return this;
  });

  // Expose this instance on the promise that gets returned
  prom.client = this;
  return prom;
}
Swagger.prototype = {
  http: _index.default,
  execute(options) {
    this.applyDefaults();
    return Swagger.execute({
      spec: this.spec,
      http: this.http,
      securities: {
        authorized: this.authorizations
      },
      contextUrl: typeof this.url === 'string' ? this.url : undefined,
      requestInterceptor: this.requestInterceptor || null,
      responseInterceptor: this.responseInterceptor || null,
      ...options
    });
  },
  resolve(options = {}) {
    return Swagger.resolve({
      spec: this.spec,
      url: this.url,
      http: this.http || this.fetch,
      allowMetaPatches: this.allowMetaPatches,
      useCircularStructures: this.useCircularStructures,
      requestInterceptor: this.requestInterceptor || null,
      responseInterceptor: this.responseInterceptor || null,
      skipNormalization: this.skipNormalization || false,
      ...options
    }).then(obj => {
      this.originalSpec = this.spec;
      this.spec = obj.spec;
      this.errors = obj.errors;
      return this;
    });
  }
};
Swagger.prototype.applyDefaults = function applyDefaults() {
  const {
    spec
  } = this;
  const specUrl = this.url;
  if ((0, _openapiPredicates.isOpenAPI2)(spec) && (0, _index10.isHttpUrl)(specUrl)) {
    const parsed = new URL(specUrl);
    if (!spec.host) {
      spec.host = parsed.host;
    }
    if (!spec.schemes) {
      spec.schemes = [parsed.protocol.replace(':', '')];
    }
    if (!spec.basePath) {
      spec.basePath = '/';
    }
  } else if ((0, _openapiPredicates.isOpenAPI3)(spec)) {
    const isEmptyServerList = Array.isArray(spec.servers) && spec.servers.length === 0;
    if (!spec.servers || isEmptyServerList) {
      spec.servers = [_constants.DEFAULT_OPENAPI_3_SERVER];
    }
  }
};

// add backwards compatibility with older versions of swagger-ui
// Refs https://github.com/swagger-api/swagger-ui/issues/6210
const {
  helpers
} = Swagger;
exports.helpers = helpers;
var _default = exports.default = Swagger;
/* eslint-enable camelcase */