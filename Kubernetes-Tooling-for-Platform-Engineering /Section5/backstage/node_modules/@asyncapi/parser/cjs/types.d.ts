import type { ISpectralDiagnostic, IFunctionResult } from '@stoplight/spectral-core';
import type { AsyncAPIDocumentInterface } from './models';
import type { v2, v3 } from './spec-types';
export type MaybeAsyncAPI = {
    asyncapi: string;
} & Record<string, unknown>;
export interface AsyncAPISemver {
    version: string;
    major: number;
    minor: number;
    patch: number;
    rc?: number;
}
export interface DetailedAsyncAPI {
    source?: string;
    input?: string | MaybeAsyncAPI | AsyncAPIObject;
    parsed: AsyncAPIObject;
    semver: AsyncAPISemver;
}
export type Input = string | MaybeAsyncAPI | AsyncAPIDocumentInterface;
export type Diagnostic = ISpectralDiagnostic;
export type SchemaValidateResult = IFunctionResult;
export type AsyncAPIObject = v2.AsyncAPIObject | v3.AsyncAPIObject;
export type AsyncAPISchema = v2.AsyncAPISchemaObject | v3.AsyncAPISchemaObject;
