var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFile } from 'fs';
import { promisify } from 'util';
export function fromURL(parser, source, options) {
    function fetchUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchFn = yield getFetch();
            return (yield fetchFn(source, options)).text();
        });
    }
    return {
        parse(options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                const schema = yield fetchUrl();
                return parser.parse(schema, Object.assign(Object.assign({}, options), { source }));
            });
        },
        validate(options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                const schema = yield fetchUrl();
                return parser.validate(schema, Object.assign(Object.assign({}, options), { source }));
            });
        }
    };
}
export function fromFile(parser, source, options) {
    function readFileFn() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield promisify(readFile)(source, options)).toString();
        });
    }
    return {
        parse(options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                const schema = yield readFileFn();
                return parser.parse(schema, Object.assign(Object.assign({}, options), { source }));
            });
        },
        validate(options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                const schema = yield readFileFn();
                return parser.validate(schema, Object.assign(Object.assign({}, options), { source }));
            });
        }
    };
}
let __fetchFn;
function getFetch() {
    return __awaiter(this, void 0, void 0, function* () {
        if (__fetchFn) {
            return __fetchFn;
        }
        if (typeof fetch === 'undefined') {
            return __fetchFn = (yield import('node-fetch')).default;
        }
        return (__fetchFn = fetch);
    });
}
