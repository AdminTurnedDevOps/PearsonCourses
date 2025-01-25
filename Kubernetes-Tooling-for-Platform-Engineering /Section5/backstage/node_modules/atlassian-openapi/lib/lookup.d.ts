import { Swagger as S } from './swagger';
export declare namespace SwaggerLookup {
    /**
     * Given an object and a potential reference to that object, this interface will help you perform that
     * lookup and either return the right object or undefined.
     */
    interface Lookup {
        getCallback: (c: S.Callback | S.Reference) => S.Callback | undefined;
        getExample: (e: S.Example | S.Reference) => S.Example | undefined;
        getHeaders: (h: S.Header | S.Reference) => S.Header | undefined;
        getLink: (l: S.Link | S.Reference) => S.Link | undefined;
        getParam: (p: S.ParameterOrRef) => S.Parameter | undefined;
        getRequestBody: (b: S.RequestBody | S.Reference) => S.RequestBody | undefined;
        getResponse: (r: S.Response | S.Reference) => S.Response | undefined;
        getSchema: (s: S.Schema | S.Reference) => S.Schema | undefined;
        getSecuritySchemeByName: (name: string) => S.SecurityScheme | undefined;
        getSecurityScheme: (ss: S.SecurityScheme | S.Reference) => S.SecurityScheme | undefined;
    }
    /**
     * This lookup does not return any values that could be discovered via references. Every function
     * just operates as the ID function; thus the name.
     */
    class IdLookup implements Lookup {
        getExample(e: S.Example | S.Reference): S.Example | undefined;
        getRequestBody(b: S.Reference | S.RequestBody): S.RequestBody | undefined;
        getHeaders(h: S.Reference | S.Header): S.Header | undefined;
        getSecuritySchemeByName(_name: string): S.SecurityScheme | undefined;
        getSecurityScheme(ss: S.Reference | S.SecurityScheme): S.SecurityScheme | undefined;
        getLink(l: S.Reference | S.Link): S.Link | undefined;
        getCallback(c: S.Reference | S.Callback): S.Callback | undefined;
        getResponse(r: S.Response | S.Reference): S.Response | undefined;
        getSchema(s: S.Schema | S.Reference): S.Schema | undefined;
        getParam(p: S.ParameterOrRef): S.Parameter | undefined;
    }
    class InternalLookup implements Lookup {
        private schema;
        constructor(swagger: S.SwaggerV3);
        getCallback(c: S.Reference | S.Callback): S.Callback | undefined;
        getExample(e: S.Example | S.Reference): S.Example | undefined;
        getHeaders(h: S.Reference | S.Header): S.Header | undefined;
        getLink(l: S.Reference | S.Link): S.Link | undefined;
        getParam(p: S.ParameterOrRef): S.Parameter | undefined;
        getRequestBody(b: S.Reference | S.RequestBody): S.RequestBody | undefined;
        getResponse(r: S.Response | S.Reference): S.Response | undefined;
        getSchema(s: S.Schema | S.Reference): S.Schema | undefined;
        getSecuritySchemeByName(name: string): S.SecurityScheme | undefined;
        getSecurityScheme(ss: S.Reference | S.SecurityScheme): S.SecurityScheme | undefined;
        private performLookup;
    }
}
