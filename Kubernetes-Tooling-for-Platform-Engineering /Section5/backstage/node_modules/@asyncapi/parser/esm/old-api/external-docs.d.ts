import { Base } from './base';
import type { v2 } from '../spec-types';
export declare class ExternalDocs extends Base<v2.ExternalDocumentationObject> {
    url(): string;
    hasDescription(): boolean;
    description(): string | null;
    hasExtensions(): boolean;
    extensions(): v2.SpecificationExtensions;
    extensionKeys(): string[];
    extKeys(): string[];
    hasExtension(extension: string): boolean;
    extension(extension: string): v2.SpecificationExtension;
    hasExt(extension: string): boolean;
    ext(extension: string): any;
}
