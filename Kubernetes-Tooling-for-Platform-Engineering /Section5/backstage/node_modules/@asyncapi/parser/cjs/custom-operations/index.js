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
Object.defineProperty(exports, "__esModule", { value: true });
exports.customOperations = exports.applyUniqueIds = void 0;
const apply_traits_1 = require("./apply-traits");
const resolve_circular_refs_1 = require("./resolve-circular-refs");
const parse_schema_1 = require("./parse-schema");
const anonymous_naming_1 = require("./anonymous-naming");
const check_circular_refs_1 = require("./check-circular-refs");
var apply_unique_ids_1 = require("./apply-unique-ids");
Object.defineProperty(exports, "applyUniqueIds", { enumerable: true, get: function () { return apply_unique_ids_1.applyUniqueIds; } });
function customOperations(parser, document, detailed, inventory, options) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (detailed.semver.major) {
            case 2: return operationsV2(parser, document, detailed, inventory, options);
            case 3: return operationsV3(parser, document, detailed, inventory, options);
        }
    });
}
exports.customOperations = customOperations;
function operationsV2(parser, document, detailed, inventory, options) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, check_circular_refs_1.checkCircularRefs)(document);
        if (options.applyTraits) {
            (0, apply_traits_1.applyTraitsV2)(detailed.parsed);
        }
        if (options.parseSchemas) {
            yield (0, parse_schema_1.parseSchemasV2)(parser, detailed);
        }
        // anonymous naming and resolving circular references should be done after custom schemas parsing
        if (inventory) {
            (0, resolve_circular_refs_1.resolveCircularRefs)(document, inventory);
        }
        (0, anonymous_naming_1.anonymousNaming)(document);
    });
}
function operationsV3(parser, document, detailed, inventory, options) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, check_circular_refs_1.checkCircularRefs)(document);
        if (options.applyTraits) {
            (0, apply_traits_1.applyTraitsV3)(detailed.parsed);
        }
        if (options.parseSchemas) {
            yield (0, parse_schema_1.parseSchemasV3)(parser, detailed);
        }
        // anonymous naming and resolving circular references should be done after custom schemas parsing
        if (inventory) {
            (0, resolve_circular_refs_1.resolveCircularRefs)(document, inventory);
        }
        (0, anonymous_naming_1.anonymousNaming)(document);
    });
}
