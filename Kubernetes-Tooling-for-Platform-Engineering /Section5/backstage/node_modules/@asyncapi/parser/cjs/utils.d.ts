import { Document } from '@stoplight/spectral-core';
import type { ISpectralDiagnostic } from '@stoplight/spectral-core';
import type { BaseModel } from './models';
import type { AsyncAPISemver, AsyncAPIObject, DetailedAsyncAPI, MaybeAsyncAPI, Diagnostic } from './types';
export declare function createDetailedAsyncAPI(parsed: AsyncAPIObject, input?: string | MaybeAsyncAPI | AsyncAPIObject, source?: string): DetailedAsyncAPI;
export declare function getSemver(version: string): AsyncAPISemver;
export declare function normalizeInput(asyncapi: string | MaybeAsyncAPI): string;
export declare function hasErrorDiagnostic(diagnostics: ISpectralDiagnostic[]): boolean;
export declare function hasWarningDiagnostic(diagnostics: ISpectralDiagnostic[]): boolean;
export declare function hasInfoDiagnostic(diagnostics: ISpectralDiagnostic[]): boolean;
export declare function hasHintDiagnostic(diagnostics: ISpectralDiagnostic[]): boolean;
export declare function setExtension(id: string, value: unknown, model: BaseModel): void;
export declare function setExtensionOnJson(id: string, value: unknown, model: any): void;
export declare function mergePatch<T = any>(origin: unknown, patch: unknown): T;
export declare function isObject(value: unknown): value is Record<string, any>;
export declare function hasRef(value: unknown): value is {
    $ref: string;
};
export declare function toJSONPathArray(jsonPath: string): Array<string | number>;
export declare function createUncaghtDiagnostic(err: unknown, message: string, document?: Document): Diagnostic[];
export declare function tilde(str: string): string;
export declare function untilde(str: string): string;
export declare function findSubArrayIndex(arr: Array<any>, subarr: Array<any>, fromIndex?: number): number;
export declare function resolveServerUrl(url: string): {
    host: string;
    pathname: string | undefined;
};
export declare function retrieveDeepData(value: Record<string, any>, path: Array<string | number>): Record<string, any> | undefined;
