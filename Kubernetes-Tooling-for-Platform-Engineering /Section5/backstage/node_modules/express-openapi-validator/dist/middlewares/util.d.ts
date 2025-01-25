import type { ErrorObject } from 'ajv-draft-04';
import { Request } from 'express';
import { ValidationError } from '../framework/types';
export declare class ContentType {
    readonly mediaType: string;
    readonly isWildCard: boolean;
    readonly parameters: {
        charset?: string;
        boundary?: string;
    } & Record<string, string>;
    private constructor();
    static from(req: Request): ContentType;
    static fromString(type: string): ContentType;
    equivalents(): ContentType[];
    normalize(excludeParams?: string[]): string;
}
/**
 * (side-effecting) modifies the errors object
 * TODO - do this some other way
 * @param errors
 */
export declare function augmentAjvErrors(errors?: ErrorObject[]): ErrorObject[];
export declare function ajvErrorsToValidatorError(status: number, errors: ErrorObject[]): ValidationError;
export declare const deprecationWarning: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
/**
 *
 * @param accepts the list of accepted media types
 * @param expectedTypes - expected media types defined in the response schema
 * @returns the content-type
 */
export declare const findResponseContent: (accepts: string[], expectedTypes: string[]) => string;
export declare const zipObject: (keys: any, values: any) => any;
