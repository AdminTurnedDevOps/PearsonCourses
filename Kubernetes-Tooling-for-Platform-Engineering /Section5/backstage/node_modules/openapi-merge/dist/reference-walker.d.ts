import { Swagger } from "atlassian-openapi";
export declare type Modify = (input: string) => string;
export declare function walkSchemaReferences(schema: Swagger.Schema | Swagger.Reference, modify: Modify): void;
export declare function walkExampleReferences(example: Swagger.Example | Swagger.Reference, modify: Modify): void;
export declare function walkParameterReferences(parameterOrRef: Swagger.ParameterOrRef, modify: Modify): void;
export declare function walkRequestBodyReferences(requestBody: Swagger.RequestBody | Swagger.Reference, modify: Modify): void;
export declare function walkHeaderReferences(header: Swagger.Header | Swagger.Reference, modify: Modify): void;
export declare function walkLinkReferences(link: Swagger.Link | Swagger.Reference, modify: Modify): void;
export declare function walkResponseReferences(response: Swagger.Response | Swagger.Reference, modify: Modify): void;
export declare function walkCallbackReferences(callback: Swagger.Callback | Swagger.Reference, modify: Modify): void;
export declare function walkComponentReferences(components: Swagger.Components, modify: Modify): void;
export declare function walkPathReferences(paths: Swagger.Paths, modify: Modify): void;
export declare function walkAllReferences(oas: Swagger.SwaggerV3, modify: Modify): void;
//# sourceMappingURL=reference-walker.d.ts.map