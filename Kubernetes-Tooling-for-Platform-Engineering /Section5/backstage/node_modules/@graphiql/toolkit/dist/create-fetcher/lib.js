"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWsFetcher = exports.createMultipartFetcher = exports.createLegacyWebsocketsFetcher = exports.createWebsocketsFetcherFromClient = exports.createWebsocketsFetcherFromUrl = exports.createSimpleFetcher = exports.isSubscriptionWithName = void 0;
var graphql_1 = require("graphql");
var meros_1 = require("meros");
var push_pull_async_iterable_iterator_1 = require("@n1ru4l/push-pull-async-iterable-iterator");
var errorHasCode = function (err) {
    return typeof err === 'object' && err !== null && 'code' in err;
};
var isSubscriptionWithName = function (document, name) {
    var isSubscription = false;
    (0, graphql_1.visit)(document, {
        OperationDefinition: function (node) {
            var _a;
            if (name === ((_a = node.name) === null || _a === void 0 ? void 0 : _a.value) && node.operation === 'subscription') {
                isSubscription = true;
            }
        },
    });
    return isSubscription;
};
exports.isSubscriptionWithName = isSubscriptionWithName;
var createSimpleFetcher = function (options, httpFetch) {
    return function (graphQLParams, fetcherOpts) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, httpFetch(options.url, {
                        method: 'POST',
                        body: JSON.stringify(graphQLParams),
                        headers: __assign(__assign({ 'content-type': 'application/json' }, options.headers), fetcherOpts === null || fetcherOpts === void 0 ? void 0 : fetcherOpts.headers),
                    })];
                case 1:
                    data = _a.sent();
                    return [2, data.json()];
            }
        });
    }); };
};
exports.createSimpleFetcher = createSimpleFetcher;
var createWebsocketsFetcherFromUrl = function (url, connectionParams) {
    var wsClient;
    try {
        var createClient = require('graphql-ws').createClient;
        wsClient = createClient({
            url: url,
            connectionParams: connectionParams,
        });
        return (0, exports.createWebsocketsFetcherFromClient)(wsClient);
    }
    catch (err) {
        if (errorHasCode(err) && err.code === 'MODULE_NOT_FOUND') {
            throw new Error("You need to install the 'graphql-ws' package to use websockets when passing a 'subscriptionUrl'");
        }
        console.error("Error creating websocket client for ".concat(url), err);
    }
};
exports.createWebsocketsFetcherFromUrl = createWebsocketsFetcherFromUrl;
var createWebsocketsFetcherFromClient = function (wsClient) { return function (graphQLParams) {
    return (0, push_pull_async_iterable_iterator_1.makeAsyncIterableIteratorFromSink)(function (sink) {
        return wsClient.subscribe(graphQLParams, __assign(__assign({}, sink), { error: function (err) {
                if (err instanceof CloseEvent) {
                    sink.error(new Error("Socket closed with event ".concat(err.code, " ").concat(err.reason || '').trim()));
                }
                else {
                    sink.error(err);
                }
            } }));
    });
}; };
exports.createWebsocketsFetcherFromClient = createWebsocketsFetcherFromClient;
var createLegacyWebsocketsFetcher = function (legacyWsClient) {
    return function (graphQLParams) {
        var observable = legacyWsClient.request(graphQLParams);
        return (0, push_pull_async_iterable_iterator_1.makeAsyncIterableIteratorFromSink)(function (sink) { return observable.subscribe(sink).unsubscribe; });
    };
};
exports.createLegacyWebsocketsFetcher = createLegacyWebsocketsFetcher;
var createMultipartFetcher = function (options, httpFetch) {
    return function (graphQLParams, fetcherOpts) {
        return __asyncGenerator(this, arguments, function () {
            var response, response_1, response_1_1, chunk, message, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, __await(httpFetch(options.url, {
                            method: 'POST',
                            body: JSON.stringify(graphQLParams),
                            headers: __assign(__assign({ 'content-type': 'application/json', accept: 'application/json, multipart/mixed' }, options.headers), fetcherOpts === null || fetcherOpts === void 0 ? void 0 : fetcherOpts.headers),
                        }).then(function (r) {
                            return (0, meros_1.meros)(r, {
                                multiple: true,
                            });
                        }))];
                    case 1:
                        response = _b.sent();
                        if (!!(0, push_pull_async_iterable_iterator_1.isAsyncIterable)(response)) return [3, 5];
                        return [4, __await(response.json())];
                    case 2: return [4, _b.sent()];
                    case 3: return [4, __await.apply(void 0, [_b.sent()])];
                    case 4: return [2, _b.sent()];
                    case 5:
                        _b.trys.push([5, 12, 13, 18]);
                        response_1 = __asyncValues(response);
                        _b.label = 6;
                    case 6: return [4, __await(response_1.next())];
                    case 7:
                        if (!(response_1_1 = _b.sent(), !response_1_1.done)) return [3, 11];
                        chunk = response_1_1.value;
                        if (chunk.some(function (part) { return !part.json; })) {
                            message = chunk.map(function (part) { return "Headers::\n".concat(part.headers, "\n\nBody::\n").concat(part.body); });
                            throw new Error("Expected multipart chunks to be of json type. got:\n".concat(message));
                        }
                        return [4, __await(chunk.map(function (part) { return part.body; }))];
                    case 8: return [4, _b.sent()];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [3, 6];
                    case 11: return [3, 18];
                    case 12:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 18];
                    case 13:
                        _b.trys.push([13, , 16, 17]);
                        if (!(response_1_1 && !response_1_1.done && (_a = response_1.return))) return [3, 15];
                        return [4, __await(_a.call(response_1))];
                    case 14:
                        _b.sent();
                        _b.label = 15;
                    case 15: return [3, 17];
                    case 16:
                        if (e_1) throw e_1.error;
                        return [7];
                    case 17: return [7];
                    case 18: return [2];
                }
            });
        });
    };
};
exports.createMultipartFetcher = createMultipartFetcher;
var getWsFetcher = function (options, fetcherOpts) {
    if (options.wsClient) {
        return (0, exports.createWebsocketsFetcherFromClient)(options.wsClient);
    }
    if (options.subscriptionUrl) {
        return (0, exports.createWebsocketsFetcherFromUrl)(options.subscriptionUrl, __assign(__assign({}, options.wsConnectionParams), fetcherOpts === null || fetcherOpts === void 0 ? void 0 : fetcherOpts.headers));
    }
    var legacyWebsocketsClient = options.legacyClient || options.legacyWsClient;
    if (legacyWebsocketsClient) {
        return (0, exports.createLegacyWebsocketsFetcher)(legacyWebsocketsClient);
    }
};
exports.getWsFetcher = getWsFetcher;
//# sourceMappingURL=lib.js.map