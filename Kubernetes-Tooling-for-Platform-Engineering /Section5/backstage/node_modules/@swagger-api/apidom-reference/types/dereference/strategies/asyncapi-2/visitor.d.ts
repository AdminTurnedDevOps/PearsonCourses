import { Namespace, Element } from '@swagger-api/apidom-core';
import { ChannelItemElement, ReferenceElement } from '@swagger-api/apidom-ns-asyncapi-2';
import { AncestorLineage } from '../../util.ts';
import Reference from '../../../Reference.ts';
import type { ReferenceOptions } from '../../../options/index.ts';
/**
 * Custom mutation replacer.
 * @public
 */
export declare const mutationReplacer: (newElement: Element, oldElement: Element, key: string | number, parent: Element | undefined) => void;
/**
 * @public
 */
export interface AsyncAPI2DereferenceVisitorOptions {
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
declare class AsyncAPI2DereferenceVisitor {
    protected readonly indirections: Element[];
    protected readonly namespace: Namespace;
    protected readonly reference: Reference;
    protected readonly options: ReferenceOptions;
    protected readonly ancestors: AncestorLineage<Element>;
    protected readonly refractCache: Map<string, Element>;
    constructor({ reference, namespace, options, indirections, ancestors, refractCache, }: AsyncAPI2DereferenceVisitorOptions);
    protected toBaseURI(uri: string): string;
    protected toReference(uri: string): Promise<Reference>;
    protected toAncestorLineage(ancestors: (Element | Element[] | undefined)[]): [AncestorLineage<Element>, Set<Element>];
    ReferenceElement(referencingElement: ReferenceElement, key: string | number, parent: Element | undefined, path: (string | number)[], ancestors: [Element | Element[]], link: {
        replaceWith: (element: Element, replacer: typeof mutationReplacer) => void;
    }): Promise<any>;
    ChannelItemElement(referencingElement: ChannelItemElement, key: string | number, parent: Element | undefined, path: (string | number)[], ancestors: [Element | Element[]], link: {
        replaceWith: (element: Element, replacer: typeof mutationReplacer) => void;
    }): Promise<any>;
}
export default AsyncAPI2DereferenceVisitor;
