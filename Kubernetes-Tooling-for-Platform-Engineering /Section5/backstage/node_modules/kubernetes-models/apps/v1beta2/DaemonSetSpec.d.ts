import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { IIoK8sApiCoreV1PodTemplateSpec } from "../../v1/PodTemplateSpec";
import { IIoK8sApiAppsV1beta2DaemonSetUpdateStrategy } from "./DaemonSetUpdateStrategy";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * DaemonSetSpec is the specification of a daemon set.
 */
export interface IDaemonSetSpec {
    /**
     * The minimum number of seconds for which a newly created DaemonSet pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready).
     */
    "minReadySeconds"?: number;
    /**
     * The number of old history to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 10.
     */
    "revisionHistoryLimit"?: number;
    /**
     * A label query over pods that are managed by the daemon set. Must match in order to be controlled. It must match the pod template's labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
     */
    "selector": IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    /**
     * An object that describes the pod that will be created. The DaemonSet will create exactly one copy of this pod on every node that matches the template's node selector (or on every node if no node selector is specified). More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template
     */
    "template": IIoK8sApiCoreV1PodTemplateSpec;
    /**
     * An update strategy to replace existing DaemonSet pods with new pods.
     */
    "updateStrategy"?: IIoK8sApiAppsV1beta2DaemonSetUpdateStrategy;
}
/**
 * DaemonSetSpec is the specification of a daemon set.
 */
export declare class DaemonSetSpec extends Model<IDaemonSetSpec> implements IDaemonSetSpec {
    "minReadySeconds"?: number;
    "revisionHistoryLimit"?: number;
    "selector": IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    "template": IIoK8sApiCoreV1PodTemplateSpec;
    "updateStrategy"?: IIoK8sApiAppsV1beta2DaemonSetUpdateStrategy;
    constructor(data?: ModelData<IDaemonSetSpec>);
}
export { IDaemonSetSpec as IIoK8sApiAppsV1beta2DaemonSetSpec, DaemonSetSpec as IoK8sApiAppsV1beta2DaemonSetSpec };
