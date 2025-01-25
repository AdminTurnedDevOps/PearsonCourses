import type { ErrorObject } from "ajv";
export interface ValidateFunc<T> {
    (data: unknown): data is T;
    errors?: ErrorObject[] | null;
}
export declare function runValidateFunc<T>(fn: ValidateFunc<T>, data: unknown): asserts data is T;
