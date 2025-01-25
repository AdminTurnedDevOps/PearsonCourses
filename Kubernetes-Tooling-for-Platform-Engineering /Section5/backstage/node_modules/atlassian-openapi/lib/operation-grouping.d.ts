import { Swagger } from './swagger';
export declare type PathAndOperation = {
    baseUrl: string;
    path: string;
    method: Swagger.Method;
    operation: Swagger.Operation;
    pathItemParameters: (Swagger.ParameterOrRef)[];
    security: Swagger.SecurityRequirement[] | undefined;
};
export declare type OperationGrouping = {
    title: string;
    description?: string;
    operations: PathAndOperation[];
};
export declare type OperationGroupings = {
    groups: OperationGrouping[];
};
export declare function getIdForOperationGroup(grouping: OperationGrouping): string;
export declare function getIdForOperation(po: PathAndOperation): string;
export declare function getOpPath(po: PathAndOperation): string;
export declare type GroupingStrategy = (swagger: Swagger.SwaggerV3) => OperationGroupings;
/**
 * This function replicates the RAD V1 grouping strategy that we used for the side-nav. Having this grouping strategy
 * present should ease the transition to RAD V2 by making it the fallback mechanism if tagging has not been implemented.
 */
export declare const radV1GroupingStrategy: GroupingStrategy;
export declare const urlGroupingStrategy: GroupingStrategy;
export declare const tagGroupingStrategy: GroupingStrategy;
