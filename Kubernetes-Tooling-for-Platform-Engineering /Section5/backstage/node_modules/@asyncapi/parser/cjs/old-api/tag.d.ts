import { Base } from './base';
import type { v2 } from '../spec-types';
export declare class Tag extends Base<v2.TagObject> {
    name(): string;
    description(): string | null;
    hasDescription(): boolean;
    externalDocs(): import("./external-docs").ExternalDocs | null;
    hasExternalDocs(): boolean;
    hasExtensions(): boolean;
    extensions(): v2.SpecificationExtensions;
    extensionKeys(): string[];
    extKeys(): string[];
    hasExtension(extension: string): boolean;
    extension(extension: string): v2.SpecificationExtension;
    hasExt(extension: string): boolean;
    ext(extension: string): any;
}
