"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerLookup = void 0;
const type_checks_1 = require("./type-checks");
const jsonpointer_1 = require("jsonpointer");
var SwaggerLookup;
(function (SwaggerLookup) {
    /**
     * This lookup does not return any values that could be discovered via references. Every function
     * just operates as the ID function; thus the name.
     */
    class IdLookup {
        getExample(e) {
            return !type_checks_1.SwaggerTypeChecks.isReference(e) ? e : undefined;
        }
        getRequestBody(b) {
            return !type_checks_1.SwaggerTypeChecks.isReference(b) ? b : undefined;
        }
        getHeaders(h) {
            return !type_checks_1.SwaggerTypeChecks.isReference(h) ? h : undefined;
        }
        getSecuritySchemeByName(_name) {
            return undefined;
        }
        getSecurityScheme(ss) {
            return !type_checks_1.SwaggerTypeChecks.isReference(ss) ? ss : undefined;
        }
        getLink(l) {
            return !type_checks_1.SwaggerTypeChecks.isReference(l) ? l : undefined;
        }
        getCallback(c) {
            return !type_checks_1.SwaggerTypeChecks.isReference(c) ? c : undefined;
        }
        getResponse(r) {
            return !type_checks_1.SwaggerTypeChecks.isReference(r) ? r : undefined;
        }
        getSchema(s) {
            return !type_checks_1.SwaggerTypeChecks.isReference(s) ? s : undefined;
        }
        getParam(p) {
            return !type_checks_1.SwaggerTypeChecks.isReference(p) ? p : undefined;
        }
    }
    SwaggerLookup.IdLookup = IdLookup;
    class InternalLookup {
        constructor(swagger) {
            this.schema = swagger;
        }
        getCallback(c) {
            return this.performLookup(c, type_checks_1.SwaggerTypeChecks.isCallback);
        }
        getExample(e) {
            return this.performLookup(e, type_checks_1.SwaggerTypeChecks.isExample);
        }
        getHeaders(h) {
            return this.performLookup(h, type_checks_1.SwaggerTypeChecks.isHeader);
        }
        getLink(l) {
            return this.performLookup(l, type_checks_1.SwaggerTypeChecks.isLink);
        }
        getParam(p) {
            return this.performLookup(p, type_checks_1.SwaggerTypeChecks.isParameter);
        }
        getRequestBody(b) {
            return this.performLookup(b, type_checks_1.SwaggerTypeChecks.isRequestBody);
        }
        getResponse(r) {
            return this.performLookup(r, type_checks_1.SwaggerTypeChecks.isResponse);
        }
        getSchema(s) {
            const potentialSchema = this.performLookup(s, type_checks_1.SwaggerTypeChecks.isSchema);
            // Use the definition name if the title is missing
            if (typeof potentialSchema !== 'undefined'
                && typeof potentialSchema.title === 'undefined'
                && type_checks_1.SwaggerTypeChecks.isReference(s)) {
                const refSplit = s.$ref.split('/');
                if (refSplit.length === 4) {
                    return Object.assign(Object.assign({}, potentialSchema), { title: refSplit[3] });
                }
            }
            return potentialSchema;
        }
        getSecuritySchemeByName(name) {
            return this.getSecurityScheme({ '$ref': `#/components/securitySchemes/${name}` });
        }
        getSecurityScheme(ss) {
            return this.performLookup(ss, type_checks_1.SwaggerTypeChecks.isSecurityScheme);
        }
        // tslint:disable-next-line:no-any
        performLookup(o, tCheck) {
            if (!type_checks_1.SwaggerTypeChecks.isReference(o)) {
                return o;
            }
            const ref = o.$ref;
            if (!ref.startsWith('#')) {
                // Any references that don't start with a # are external, and thus not handled
                return undefined;
            }
            const result = jsonpointer_1.get(this.schema, ref.slice(1));
            // Call recursively if you perform a lookup and get another reference
            if (type_checks_1.SwaggerTypeChecks.isReference(result)) {
                return this.performLookup(result, tCheck);
            }
            return tCheck(result) ? result : undefined;
        }
    }
    SwaggerLookup.InternalLookup = InternalLookup;
})(SwaggerLookup = exports.SwaggerLookup || (exports.SwaggerLookup = {}));
