import { Base } from './base';
import { ExternalDocs } from './external-docs';
import { Tag } from './tag';
import type { v2 } from '../spec-types';
export declare abstract class SpecificationExtensionsModel<J = any, M extends Record<string, any> = Record<string, any>> extends Base<J & v2.SpecificationExtensions, M> {
    hasExtensions(): boolean;
    extensions(): v2.SpecificationExtensions;
    extensionKeys(): string[];
    extKeys(): string[];
    hasExtension(extension: string): boolean;
    extension(extension: string): v2.SpecificationExtension;
    hasExt(extension: string): boolean;
    ext(extension: string): any;
}
export declare function hasDescription(model: Base<{
    description?: string;
}>): boolean;
export declare function description(model: Base<{
    description?: string;
}>): string | null;
export declare function hasExternalDocs(model: Base<{
    externalDocs?: v2.ExternalDocumentationObject;
}>): boolean;
export declare function externalDocs(model: Base<{
    externalDocs?: v2.ExternalDocumentationObject;
}>): ExternalDocs | null;
export declare const extensionsMixins: {
    hasExtensions(model: Base<{
        [extension: `x-${string}`]: any;
    }, Record<string, any>>): boolean;
    extensions(model: Base<{
        [extension: `x-${string}`]: any;
    }, Record<string, any>>): v2.SpecificationExtensions;
    extensionKeys(model: Base<{
        [extension: `x-${string}`]: any;
    }, Record<string, any>>): string[];
    extKeys(model: Base<{
        [extension: `x-${string}`]: any;
    }, Record<string, any>>): string[];
    hasExtension(model: Base<{
        [extension: `x-${string}`]: any;
    }, Record<string, any>>, extension: string): boolean;
    extension(model: Base<{
        [extension: `x-${string}`]: any;
    }, Record<string, any>>, extension: string): v2.SpecificationExtension | null;
    hasExt(model: Base<{
        [extension: `x-${string}`]: any;
    }, Record<string, any>>, extension: string): boolean;
    ext(model: Base<{
        [extension: `x-${string}`]: any;
    }, Record<string, any>>, extension: string): any;
};
export declare const bindingsMixins: {
    hasBindings(model: Base<{
        bindings?: Record<string, v2.Binding>;
    }>): boolean;
    bindings(model: Base<{
        bindings?: Record<string, v2.Binding>;
    }>): Record<string, v2.Binding>;
    bindingProtocols(model: Base<{
        bindings?: Record<string, v2.Binding>;
    }>): string[];
    hasBinding(model: Base<{
        bindings?: Record<string, v2.Binding>;
    }>, name: string): boolean;
    binding(model: Base<{
        bindings?: Record<string, v2.Binding>;
    }>, name: string): v2.Binding | null;
};
export declare const tagsMixins: {
    hasTags(model: Base<{
        tags?: Array<v2.TagObject>;
    }>): boolean;
    tags(model: Base<{
        tags?: Array<v2.TagObject>;
    }>): Array<Tag>;
    tagNames(model: Base<{
        tags?: Array<v2.TagObject>;
    }>): string[];
    hasTag(model: Base<{
        tags?: Array<v2.TagObject>;
    }>, name: string): boolean;
    tag(model: Base<{
        tags?: Array<v2.TagObject>;
    }>, name: string): Tag | null;
};
interface Constructor<T> extends Function {
    new (...any: any[]): T;
}
type InferModelData<T> = T extends Base<infer J> ? J : never;
type InferModelMetadata<T> = T extends Base<infer J, infer M> ? M : never;
export declare function getMapValue<T extends Record<string, any>, K extends keyof T>(obj: T | undefined, key: K): T[K] | null;
export declare function getMapValue<T extends Base>(obj: Record<string, InferModelData<T>> | undefined, key: string, Type: Constructor<T>, meta?: InferModelMetadata<T>): T | null;
export declare function createMapOfType<T extends Base>(obj: Record<string, InferModelData<T>> | undefined, Type: Constructor<T>, meta?: InferModelMetadata<T>): Record<string, T>;
export {};
