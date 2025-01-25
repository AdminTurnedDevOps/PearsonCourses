import { IIoK8sApiAppsV1StatefulSetOrdinals } from "./StatefulSetOrdinals";
import { IIoK8sApiAppsV1StatefulSetPersistentVolumeClaimRetentionPolicy } from "./StatefulSetPersistentVolumeClaimRetentionPolicy";
import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { IIoK8sApiCoreV1PodTemplateSpec } from "../../v1/PodTemplateSpec";
import { IIoK8sApiAppsV1StatefulSetUpdateStrategy } from "./StatefulSetUpdateStrategy";
import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1PersistentVolumeClaimSpec } from "../../v1/PersistentVolumeClaimSpec";
import { IIoK8sApiCoreV1PersistentVolumeClaimStatus } from "../../v1/PersistentVolumeClaimStatus";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * A StatefulSetSpec is the specification of a StatefulSet.
 */
export interface IStatefulSetSpec {
    /**
     * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
     */
    "minReadySeconds"?: number;
    /**
     * ordinals controls the numbering of replica indices in a StatefulSet. The default ordinals behavior assigns a "0" index to the first replica and increments the index by one for each additional replica requested. Using the ordinals field requires the StatefulSetStartOrdinal feature gate to be enabled, which is beta.
     */
    "ordinals"?: IIoK8sApiAppsV1StatefulSetOrdinals;
    /**
     * persistentVolumeClaimRetentionPolicy describes the lifecycle of persistent volume claims created from volumeClaimTemplates. By default, all persistent volume claims are created as needed and retained until manually deleted. This policy allows the lifecycle to be altered, for example by deleting persistent volume claims when their stateful set is deleted, or when their pod is scaled down. This requires the StatefulSetAutoDeletePVC feature gate to be enabled, which is alpha.  +optional
     */
    "persistentVolumeClaimRetentionPolicy"?: IIoK8sApiAppsV1StatefulSetPersistentVolumeClaimRetentionPolicy;
    /**
     * podManagementPolicy controls how pods are created during initial scale up, when replacing pods on nodes, or when scaling down. The default policy is `OrderedReady`, where pods are created in increasing order (pod-0, then pod-1, etc) and the controller will wait until each pod is ready before continuing. When scaling down, the pods are removed in the opposite order. The alternative policy is `Parallel` which will create pods in parallel to match the desired scale without waiting, and on scale down will delete all pods at once.
     *
     * Possible enum values:
     *  - `"OrderedReady"` will create pods in strictly increasing order on scale up and strictly decreasing order on scale down, progressing only when the previous pod is ready or terminated. At most one pod will be changed at any time.
     *  - `"Parallel"` will create and delete pods as soon as the stateful set replica count is changed, and will not wait for pods to be ready or complete termination.
     */
    "podManagementPolicy"?: "OrderedReady" | "Parallel";
    /**
     * replicas is the desired number of replicas of the given Template. These are replicas in the sense that they are instantiations of the same Template, but individual replicas also have a consistent identity. If unspecified, defaults to 1.
     */
    "replicas"?: number;
    /**
     * revisionHistoryLimit is the maximum number of revisions that will be maintained in the StatefulSet's revision history. The revision history consists of all revisions not represented by a currently applied StatefulSetSpec version. The default value is 10.
     */
    "revisionHistoryLimit"?: number;
    /**
     * selector is a label query over pods that should match the replica count. It must match the pod template's labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
     */
    "selector": IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    /**
     * serviceName is the name of the service that governs this StatefulSet. This service must exist before the StatefulSet, and is responsible for the network identity of the set. Pods get DNS/hostnames that follow the pattern: pod-specific-string.serviceName.default.svc.cluster.local where "pod-specific-string" is managed by the StatefulSet controller.
     */
    "serviceName": string;
    /**
     * template is the object that describes the pod that will be created if insufficient replicas are detected. Each pod stamped out by the StatefulSet will fulfill this Template, but have a unique identity from the rest of the StatefulSet. Each pod will be named with the format <statefulsetname>-<podindex>. For example, a pod in a StatefulSet named "web" with index number "3" would be named "web-3". The only allowed template.spec.restartPolicy value is "Always".
     */
    "template": IIoK8sApiCoreV1PodTemplateSpec;
    /**
     * updateStrategy indicates the StatefulSetUpdateStrategy that will be employed to update Pods in the StatefulSet when a revision is made to Template.
     */
    "updateStrategy"?: IIoK8sApiAppsV1StatefulSetUpdateStrategy;
    /**
     * volumeClaimTemplates is a list of claims that pods are allowed to reference. The StatefulSet controller is responsible for mapping network identities to claims in a way that maintains the identity of a pod. Every claim in this list must have at least one matching (by name) volumeMount in one container in the template. A claim in this list takes precedence over any volumes in the template, with the same name.
     */
    "volumeClaimTemplates"?: Array<{
        /**
         * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
         */
        "apiVersion"?: string;
        /**
         * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
         */
        "kind"?: string;
        /**
         * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
         */
        "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
        /**
         * spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        "spec"?: IIoK8sApiCoreV1PersistentVolumeClaimSpec;
        /**
         * status represents the current information/status of a persistent volume claim. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        "status"?: IIoK8sApiCoreV1PersistentVolumeClaimStatus;
    }>;
}
/**
 * A StatefulSetSpec is the specification of a StatefulSet.
 */
export declare class StatefulSetSpec extends Model<IStatefulSetSpec> implements IStatefulSetSpec {
    "minReadySeconds"?: number;
    "ordinals"?: IIoK8sApiAppsV1StatefulSetOrdinals;
    "persistentVolumeClaimRetentionPolicy"?: IIoK8sApiAppsV1StatefulSetPersistentVolumeClaimRetentionPolicy;
    "podManagementPolicy"?: "OrderedReady" | "Parallel";
    "replicas"?: number;
    "revisionHistoryLimit"?: number;
    "selector": IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    "serviceName": string;
    "template": IIoK8sApiCoreV1PodTemplateSpec;
    "updateStrategy"?: IIoK8sApiAppsV1StatefulSetUpdateStrategy;
    "volumeClaimTemplates"?: Array<{
        "apiVersion"?: string;
        "kind"?: string;
        "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
        "spec"?: IIoK8sApiCoreV1PersistentVolumeClaimSpec;
        "status"?: IIoK8sApiCoreV1PersistentVolumeClaimStatus;
    }>;
    constructor(data?: ModelData<IStatefulSetSpec>);
}
export { IStatefulSetSpec as IIoK8sApiAppsV1StatefulSetSpec, StatefulSetSpec as IoK8sApiAppsV1StatefulSetSpec };
