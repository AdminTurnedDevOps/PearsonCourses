import { Element, Namespace } from '@swagger-api/apidom-core';
import { ReferenceElement, ExampleElement, LinkElement, PathItemElement } from '@swagger-api/apidom-ns-openapi-3-0';
import Reference from '../../../Reference.ts';
import { AncestorLineage } from '../../util.ts';
import type { ReferenceOptions } from '../../../options/index.ts';
/**
 * Custom mutation replacer.
 * @public
 */
export declare const mutationReplacer: (newElement: Element, oldElement: Element, key: string | number, parent: Element | undefined) => void;
/**
 * @public
 */
export interface OpenAPI3_0DereferenceVisitorOptions {
    readonly namespace: Namespace;
    readonly reference: Reference;
    readonly options: ReferenceOptions;
    readonly indirections?: Element[];
    readonly ancestors?: AncestorLineage<Element>;
    readonly refractCache?: Map<string, Element>;
}
/**
 * @public
 */
declare class OpenAPI3_0DereferenceVisitor {
    protected readonly indirections: Element[];
    protected readonly namespace: Namespace;
    protected readonly reference: Reference;
    protected readonly options: ReferenceOptions;
    protected readonly ancestors: AncestorLineage<Element>;
    protected readonly refractCache: Map<string, Element>;
    constructor({ reference, namespace, options, indirections, ancestors, refractCache, }: OpenAPI3_0DereferenceVisitorOptions);
    protected toBaseURI(uri: string): string;
    protected toReference(uri: string): Promise<Reference>;
    protected toAncestorLineage(ancestors: (Element | Element[] | undefined)[]): [AncestorLineage<Element>, Set<Element>];
    ReferenceElement(referencingElement: ReferenceElement, key: string | number, parent: Element | undefined, path: (string | number)[], ancestors: [Element | Element[]], link: {
        replaceWith: (element: Element, replacer: typeof mutationReplacer) => void;
    }): Promise<any>;
    PathItemElement(referencingElement: PathItemElement, key: string | number, parent: Element | undefined, path: (string | number)[], ancestors: [Element | Element[]], link: {
        replaceWith: (element: Element, replacer: typeof mutationReplacer) => void;
    }): Promise<any>;
    LinkElement(linkElement: LinkElement, key: string | number, parent: Element | undefined, path: (string | number)[], ancestors: [Element | Element[]], link: {
        replaceWith: (element: Element, replacer: typeof mutationReplacer) => void;
    }): Promise<LinkElement | undefined>;
    ExampleElement(exampleElement: ExampleElement, key: string | number, parent: Element | undefined, path: (string | number)[], ancestors: [Element | Element[]], link: {
        replaceWith: (element: Element, replacer: typeof mutationReplacer) => void;
    }): Promise<ExampleElement | undefined>;
}
export default OpenAPI3_0DereferenceVisitor;
