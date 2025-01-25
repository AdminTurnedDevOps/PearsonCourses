import { Collection } from './collection';
import type { ExternalDocumentationInterface } from './external-docs';
export type ExternalDocumentationsInterface = Collection<ExternalDocumentationInterface>;
export declare class ExternalDocumentations extends Collection<ExternalDocumentationInterface> implements ExternalDocumentationsInterface {
    get(id: string): ExternalDocumentationInterface | undefined;
}
