import { IIoK8sApiAdmissionregistrationV1WebhookClientConfig } from "./WebhookClientConfig";
import { IIoK8sApiAdmissionregistrationV1MatchCondition } from "./MatchCondition";
import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { IIoK8sApiAdmissionregistrationV1RuleWithOperations } from "./RuleWithOperations";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ValidatingWebhook describes an admission webhook and the resources and operations it applies to.
 */
export interface IValidatingWebhook {
    /**
     * AdmissionReviewVersions is an ordered list of preferred `AdmissionReview` versions the Webhook expects. API server will try to use first version in the list which it supports. If none of the versions specified in this list supported by API server, validation will fail for this object. If a persisted webhook configuration specifies allowed versions and does not include any versions known to the API Server, calls to the webhook will fail and be subject to the failure policy.
     */
    "admissionReviewVersions": Array<string>;
    /**
     * ClientConfig defines how to communicate with the hook. Required
     */
    "clientConfig": IIoK8sApiAdmissionregistrationV1WebhookClientConfig;
    /**
     * FailurePolicy defines how unrecognized errors from the admission endpoint are handled - allowed values are Ignore or Fail. Defaults to Fail.
     *
     * Possible enum values:
     *  - `"Fail"` means that an error calling the webhook causes the admission to fail.
     *  - `"Ignore"` means that an error calling the webhook is ignored.
     */
    "failurePolicy"?: "Fail" | "Ignore";
    /**
     * MatchConditions is a list of conditions that must be met for a request to be sent to this webhook. Match conditions filter requests that have already been matched by the rules, namespaceSelector, and objectSelector. An empty list of matchConditions matches all requests. There are a maximum of 64 match conditions allowed.
     *
     * The exact matching logic is (in order):
     *   1. If ANY matchCondition evaluates to FALSE, the webhook is skipped.
     *   2. If ALL matchConditions evaluate to TRUE, the webhook is called.
     *   3. If any matchCondition evaluates to an error (but none are FALSE):
     *      - If failurePolicy=Fail, reject the request
     *      - If failurePolicy=Ignore, the error is ignored and the webhook is skipped
     *
     * This is an alpha feature and managed by the AdmissionWebhookMatchConditions feature gate.
     */
    "matchConditions"?: Array<IIoK8sApiAdmissionregistrationV1MatchCondition>;
    /**
     * matchPolicy defines how the "rules" list is used to match incoming requests. Allowed values are "Exact" or "Equivalent".
     *
     * - Exact: match a request only if it exactly matches a specified rule. For example, if deployments can be modified via apps/v1, apps/v1beta1, and extensions/v1beta1, but "rules" only included `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]`, a request to apps/v1beta1 or extensions/v1beta1 would not be sent to the webhook.
     *
     * - Equivalent: match a request if modifies a resource listed in rules, even via another API group or version. For example, if deployments can be modified via apps/v1, apps/v1beta1, and extensions/v1beta1, and "rules" only included `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]`, a request to apps/v1beta1 or extensions/v1beta1 would be converted to apps/v1 and sent to the webhook.
     *
     * Defaults to "Equivalent"
     *
     * Possible enum values:
     *  - `"Equivalent"` means requests should be sent to the webhook if they modify a resource listed in rules via another API group or version.
     *  - `"Exact"` means requests should only be sent to the webhook if they exactly match a given rule.
     */
    "matchPolicy"?: "Equivalent" | "Exact";
    /**
     * The name of the admission webhook. Name should be fully qualified, e.g., imagepolicy.kubernetes.io, where "imagepolicy" is the name of the webhook, and kubernetes.io is the name of the organization. Required.
     */
    "name": string;
    /**
     * NamespaceSelector decides whether to run the webhook on an object based on whether the namespace for that object matches the selector. If the object itself is a namespace, the matching is performed on object.metadata.labels. If the object is another cluster scoped resource, it never skips the webhook.
     *
     * For example, to run the webhook on any objects whose namespace is not associated with "runlevel" of "0" or "1";  you will set the selector as follows: "namespaceSelector": {
     *   "matchExpressions": [
     *     {
     *       "key": "runlevel",
     *       "operator": "NotIn",
     *       "values": [
     *         "0",
     *         "1"
     *       ]
     *     }
     *   ]
     * }
     *
     * If instead you want to only run the webhook on any objects whose namespace is associated with the "environment" of "prod" or "staging"; you will set the selector as follows: "namespaceSelector": {
     *   "matchExpressions": [
     *     {
     *       "key": "environment",
     *       "operator": "In",
     *       "values": [
     *         "prod",
     *         "staging"
     *       ]
     *     }
     *   ]
     * }
     *
     * See https://kubernetes.io/docs/concepts/overview/working-with-objects/labels for more examples of label selectors.
     *
     * Default to the empty LabelSelector, which matches everything.
     */
    "namespaceSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    /**
     * ObjectSelector decides whether to run the webhook based on if the object has matching labels. objectSelector is evaluated against both the oldObject and newObject that would be sent to the webhook, and is considered to match if either object matches the selector. A null object (oldObject in the case of create, or newObject in the case of delete) or an object that cannot have labels (like a DeploymentRollback or a PodProxyOptions object) is not considered to match. Use the object selector only if the webhook is opt-in, because end users may skip the admission webhook by setting the labels. Default to the empty LabelSelector, which matches everything.
     */
    "objectSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    /**
     * Rules describes what operations on what resources/subresources the webhook cares about. The webhook cares about an operation if it matches _any_ Rule. However, in order to prevent ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks from putting the cluster in a state which cannot be recovered from without completely disabling the plugin, ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks are never called on admission requests for ValidatingWebhookConfiguration and MutatingWebhookConfiguration objects.
     */
    "rules"?: Array<IIoK8sApiAdmissionregistrationV1RuleWithOperations>;
    /**
     * SideEffects states whether this webhook has side effects. Acceptable values are: None, NoneOnDryRun (webhooks created via v1beta1 may also specify Some or Unknown). Webhooks with side effects MUST implement a reconciliation system, since a request may be rejected by a future step in the admission chain and the side effects therefore need to be undone. Requests with the dryRun attribute will be auto-rejected if they match a webhook with sideEffects == Unknown or Some.
     *
     * Possible enum values:
     *  - `"None"` means that calling the webhook will have no side effects.
     *  - `"NoneOnDryRun"` means that calling the webhook will possibly have side effects, but if the request being reviewed has the dry-run attribute, the side effects will be suppressed.
     *  - `"Some"` means that calling the webhook will possibly have side effects. If a request with the dry-run attribute would trigger a call to this webhook, the request will instead fail.
     *  - `"Unknown"` means that no information is known about the side effects of calling the webhook. If a request with the dry-run attribute would trigger a call to this webhook, the request will instead fail.
     */
    "sideEffects": "None" | "NoneOnDryRun" | "Some" | "Unknown";
    /**
     * TimeoutSeconds specifies the timeout for this webhook. After the timeout passes, the webhook call will be ignored or the API call will fail based on the failure policy. The timeout value must be between 1 and 30 seconds. Default to 10 seconds.
     */
    "timeoutSeconds"?: number;
}
/**
 * ValidatingWebhook describes an admission webhook and the resources and operations it applies to.
 */
export declare class ValidatingWebhook extends Model<IValidatingWebhook> implements IValidatingWebhook {
    "admissionReviewVersions": Array<string>;
    "clientConfig": IIoK8sApiAdmissionregistrationV1WebhookClientConfig;
    "failurePolicy"?: "Fail" | "Ignore";
    "matchConditions"?: Array<IIoK8sApiAdmissionregistrationV1MatchCondition>;
    "matchPolicy"?: "Equivalent" | "Exact";
    "name": string;
    "namespaceSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    "objectSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    "rules"?: Array<IIoK8sApiAdmissionregistrationV1RuleWithOperations>;
    "sideEffects": "None" | "NoneOnDryRun" | "Some" | "Unknown";
    "timeoutSeconds"?: number;
    constructor(data?: ModelData<IValidatingWebhook>);
}
export { IValidatingWebhook as IIoK8sApiAdmissionregistrationV1ValidatingWebhook, ValidatingWebhook as IoK8sApiAdmissionregistrationV1ValidatingWebhook };
