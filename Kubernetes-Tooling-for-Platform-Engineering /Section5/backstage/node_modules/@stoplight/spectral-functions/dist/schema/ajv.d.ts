import { ValidateFunction, SchemaObject } from 'ajv';
declare type AssignAjvInstance = (schema: SchemaObject, dialect: string, allErrors: boolean) => ValidateFunction;
export declare function createAjvInstances(): AssignAjvInstance;
export {};
