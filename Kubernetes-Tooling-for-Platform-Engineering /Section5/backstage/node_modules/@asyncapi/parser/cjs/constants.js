"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastVersion = exports.specVersions = exports.EXTENSION_REGEX = exports.xParserObjectUniqueId = exports.xParserCircularProps = exports.xParserCircular = exports.xParserOriginalTraits = exports.xParserOriginalPayload = exports.xParserOriginalSchemaFormat = exports.xParserSchemaId = exports.xParserMessageParsed = exports.xParserMessageName = exports.xParserApiVersion = exports.xParserSpecStringified = exports.xParserSpecParsed = void 0;
const specs_1 = __importDefault(require("@asyncapi/specs"));
exports.xParserSpecParsed = 'x-parser-spec-parsed';
exports.xParserSpecStringified = 'x-parser-spec-stringified';
exports.xParserApiVersion = 'x-parser-api-version';
exports.xParserMessageName = 'x-parser-message-name';
exports.xParserMessageParsed = 'x-parser-message-parsed';
exports.xParserSchemaId = 'x-parser-schema-id';
exports.xParserOriginalSchemaFormat = 'x-parser-original-schema-format';
exports.xParserOriginalPayload = 'x-parser-original-payload';
exports.xParserOriginalTraits = 'x-parser-original-traits';
exports.xParserCircular = 'x-parser-circular';
exports.xParserCircularProps = 'x-parser-circular-props';
exports.xParserObjectUniqueId = 'x-parser-unique-object-id';
exports.EXTENSION_REGEX = /^x-[\w\d.\-_]+$/;
// Only >=2.0.0 versions are supported
exports.specVersions = Object.keys(specs_1.default.schemas);
exports.lastVersion = exports.specVersions[exports.specVersions.length - 1];
