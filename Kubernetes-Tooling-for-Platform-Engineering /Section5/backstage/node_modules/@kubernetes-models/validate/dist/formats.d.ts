import Ajv, { Format } from "ajv";
export declare const formats: Record<string, Format>;
export declare function addFormats(ajv: Ajv): void;
