import type { Plugin } from "ajv";
export interface ErrorMessageOptions {
    keepErrors?: boolean;
    singleError?: boolean | string;
}
declare const ajvErrors: Plugin<ErrorMessageOptions>;
export default ajvErrors;
