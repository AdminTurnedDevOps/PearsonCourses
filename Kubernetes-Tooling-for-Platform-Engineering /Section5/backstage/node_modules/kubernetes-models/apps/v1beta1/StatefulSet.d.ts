import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAppsV1beta1StatefulSetSpec } from "./StatefulSetSpec";
import { IIoK8sApiAppsV1beta1StatefulSetStatus } from "./StatefulSetStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * DEPRECATED - This group version of StatefulSet is deprecated by apps/v1beta2/StatefulSet. See the release notes for more information. StatefulSet represents a set of pods with consistent identities. Identities are defined as:
 *  - Network: A single stable DNS and hostname.
 *  - Storage: As many VolumeClaims as requested.
 * The StatefulSet guarantees that a given network identity will always map to the same storage identity.
 * @deprecated
 */
export interface IStatefulSet extends TypeMeta {
    "apiVersion": "apps/v1beta1";
    "kind": "StatefulSet";
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec defines the desired identities of pods in this set.
     */
    "spec"?: IIoK8sApiAppsV1beta1StatefulSetSpec;
    /**
     * Status is the current status of Pods in this StatefulSet. This data may be out of date by some window of time.
     */
    "status"?: IIoK8sApiAppsV1beta1StatefulSetStatus;
}
/**
 * DEPRECATED - This group version of StatefulSet is deprecated by apps/v1beta2/StatefulSet. See the release notes for more information. StatefulSet represents a set of pods with consistent identities. Identities are defined as:
 *  - Network: A single stable DNS and hostname.
 *  - Storage: As many VolumeClaims as requested.
 * The StatefulSet guarantees that a given network identity will always map to the same storage identity.
 * @deprecated
 */
export declare class StatefulSet extends Model<IStatefulSet> implements IStatefulSet {
    "apiVersion": IStatefulSet["apiVersion"];
    "kind": IStatefulSet["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiAppsV1beta1StatefulSetSpec;
    "status"?: IIoK8sApiAppsV1beta1StatefulSetStatus;
    static apiVersion: IStatefulSet["apiVersion"];
    static kind: IStatefulSet["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IStatefulSet>;
    constructor(data?: ModelData<IStatefulSet>);
}
export { IStatefulSet as IIoK8sApiAppsV1beta1StatefulSet, StatefulSet as IoK8sApiAppsV1beta1StatefulSet };
