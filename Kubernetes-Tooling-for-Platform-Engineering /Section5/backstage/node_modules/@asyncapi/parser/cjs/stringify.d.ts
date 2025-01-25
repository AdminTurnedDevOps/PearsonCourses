import { AsyncAPIDocumentInterface } from './models';
export interface StringifyOptions {
    space?: string | number;
}
export declare function stringify(document: unknown, options?: StringifyOptions): string | undefined;
export declare function unstringify(document: unknown): AsyncAPIDocumentInterface | undefined;
export declare function copy(data: Record<string, any>): any;
export declare function refReplacer(): (this: unknown, field: string, value: unknown) => unknown;
export declare function traverseStringifiedData(parent: any, field: string | undefined, root: any, objToPath: Map<unknown, unknown>, pathToObj: Map<unknown, unknown>): void;
