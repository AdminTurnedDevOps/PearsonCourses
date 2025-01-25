"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetcherReturnToPromise = exports.isAsyncIterable = exports.isObservable = exports.isPromise = void 0;
function isPromise(value) {
    return (typeof value === 'object' &&
        value !== null &&
        typeof value.then === 'function');
}
exports.isPromise = isPromise;
function observableToPromise(observable) {
    return new Promise(function (resolve, reject) {
        var subscription = observable.subscribe({
            next: function (v) {
                resolve(v);
                subscription.unsubscribe();
            },
            error: reject,
            complete: function () {
                reject(new Error('no value resolved'));
            },
        });
    });
}
function isObservable(value) {
    return (typeof value === 'object' &&
        value !== null &&
        'subscribe' in value &&
        typeof value.subscribe === 'function');
}
exports.isObservable = isObservable;
function isAsyncIterable(input) {
    return (typeof input === 'object' &&
        input !== null &&
        (input[Symbol.toStringTag] === 'AsyncGenerator' ||
            Symbol.asyncIterator in input));
}
exports.isAsyncIterable = isAsyncIterable;
function asyncIterableToPromise(input) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var iteratorReturn, iteratorNext, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    iteratorReturn = (_a = ('return' in input ? input : input[Symbol.asyncIterator]()).return) === null || _a === void 0 ? void 0 : _a.bind(input);
                    iteratorNext = ('next' in input ? input : input[Symbol.asyncIterator]()).next.bind(input);
                    return [4, iteratorNext()];
                case 1:
                    result = _b.sent();
                    void (iteratorReturn === null || iteratorReturn === void 0 ? void 0 : iteratorReturn());
                    return [2, result.value];
            }
        });
    });
}
function fetcherReturnToPromise(fetcherResult) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetcherResult];
                case 1:
                    result = _a.sent();
                    if (isAsyncIterable(result)) {
                        return [2, asyncIterableToPromise(result)];
                    }
                    if (isObservable(result)) {
                        return [2, observableToPromise(result)];
                    }
                    return [2, result];
            }
        });
    });
}
exports.fetcherReturnToPromise = fetcherReturnToPromise;
//# sourceMappingURL=index.js.map