import { Modify } from "./reference-walker";
import { Swagger, SwaggerLookup as Lookup } from 'atlassian-openapi';
export declare type ReferenceWalker<A> = (component: A, modify: Modify) => void;
export declare function shallowEquality<A>(referenceWalker: ReferenceWalker<A>): (x: A | Swagger.Reference, y: A | Swagger.Reference) => boolean;
export declare function deepEquality<A>(xLookup: Lookup.Lookup, yLookup: Lookup.Lookup): (x: A | Swagger.Reference, y: A | Swagger.Reference) => boolean;
//# sourceMappingURL=component-equivalence.d.ts.map