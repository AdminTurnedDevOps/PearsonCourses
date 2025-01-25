import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NonResourceRule holds information that describes a rule for the non-resource
 */
export interface INonResourceRule {
    /**
     * NonResourceURLs is a set of partial urls that a user should have access to.  \*s are allowed, but only as the full, final step in the path.  "\*" means all.
     */
    "nonResourceURLs"?: Array<string>;
    /**
     * Verb is a list of kubernetes non-resource API verbs, like: get, post, put, delete, patch, head, options.  "\*" means all.
     */
    "verbs": Array<string>;
}
/**
 * NonResourceRule holds information that describes a rule for the non-resource
 */
export declare class NonResourceRule extends Model<INonResourceRule> implements INonResourceRule {
    "nonResourceURLs"?: Array<string>;
    "verbs": Array<string>;
    constructor(data?: ModelData<INonResourceRule>);
}
export { INonResourceRule as IIoK8sApiAuthorizationV1NonResourceRule, NonResourceRule as IoK8sApiAuthorizationV1NonResourceRule };
