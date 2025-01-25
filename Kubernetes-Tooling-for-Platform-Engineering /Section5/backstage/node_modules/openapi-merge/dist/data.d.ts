import { Swagger } from 'atlassian-openapi';
export declare type OperationSelection = {
    /**
     * Only Operatinos that have these tags will be taken from this OpenAPI file. If a single Operation contains
     * an includeTag and an excludeTag then it will be excluded; exclusion takes precedence.
     */
    includeTags?: string[];
    /**
     * Any Operation that has any one of these tags will be excluded from the final result. If a single Operation contains
     * an includeTag and an excludeTag then it will be excluded; exclusion takes precedence.
     */
    excludeTags?: string[];
};
export interface DisputeBase {
    /**
     * If this is set to true, then this prefix will always be applied to every Schema, even if there is no dispute
     * for that particular schema. This may prevent the deduplication of common schemas from different OpenApi files.
     */
    alwaysApply?: boolean;
}
export interface DisputePrefix extends DisputeBase {
    /**
     * The prefix to use when a schema is in dispute.
     */
    prefix: string;
}
export interface DisputeSuffix extends DisputeBase {
    /**
     * The suffix to use when a schema is in dispute.
     */
    suffix: string;
}
export declare type Dispute = DisputePrefix | DisputeSuffix;
export interface SingleMergeInputBase {
    oas: Swagger.SwaggerV3;
    pathModification?: PathModification;
    /**
     * Any Operation tagged with one of the paths in this definition will be excluded from the merge result. Any tag
     * mentioned in this list will also be excluded from the top level list of tags.
     */
    operationSelection?: OperationSelection;
    /**
     * This configuration setting lets you configure how the info.description from this OpenAPI file will be merged
     * into the final resulting OpenAPI file
     */
    description?: DescriptionMergeBehaviour;
}
/**
 * The original SingelMergeInput, now deprecated. This is included for backwards compatibility, to prevent a breaking
 * change and should be removed in the next major version.
 *
 * @deprecated
 */
export interface SingleMergeInputV1 extends SingleMergeInputBase {
    /**
     * The prefix to use in the event of a dispute.
     *
     * @deprecated
     */
    disputePrefix?: string;
}
/**
 * The current expected format of the SingleMergeInput.
 */
export interface SingleMergeInputV2 extends SingleMergeInputBase {
    /**
     * This dictates how any disputes will be resolved between similar elements across multiple OpenAPI files.
     */
    dispute?: Dispute;
}
export declare type SingleMergeInput = SingleMergeInputV1 | SingleMergeInputV2;
export declare type PathModification = {
    stripStart?: string;
    prepend?: string;
};
export declare type DescriptionMergeBehaviour = {
    /**
     * Wether or not the description for this OpenAPI file will be merged into the description of the final file.
     */
    append: boolean;
    /**
     * You may optionally include a Markdown Title to demarcate this particular section of the merged description files.
     */
    title?: DescriptionTitle;
};
export declare type DescriptionTitle = {
    /**
     * The value of the included title.
     *
     * @minLength 1
     */
    value: string;
    /**
     * What heading level this heading will be at: from h1 through to h6. The default value is 1 and will create h1 elements
     * in Markdown format.
     *
     * @minimum 1
     * @maximum 6
     */
    headingLevel?: number;
};
export declare type MergeInput = Array<SingleMergeInput>;
export declare type SuccessfulMergeResult = {
    output: Swagger.SwaggerV3;
};
export declare type ErrorType = 'no-inputs' | 'duplicate-paths' | 'component-definition-conflict' | 'operation-id-conflict';
export declare type ErrorMergeResult = {
    type: ErrorType;
    message: string;
};
export declare function isErrorResult<A>(t: A | ErrorMergeResult): t is ErrorMergeResult;
export declare type MergeResult = SuccessfulMergeResult | ErrorMergeResult;
//# sourceMappingURL=data.d.ts.map