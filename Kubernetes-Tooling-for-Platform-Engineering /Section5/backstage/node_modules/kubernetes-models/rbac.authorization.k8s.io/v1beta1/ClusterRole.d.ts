import { IIoK8sApiRbacV1beta1AggregationRule } from "./AggregationRule";
import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiRbacV1beta1PolicyRule } from "./PolicyRule";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ClusterRole is a cluster level, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding or ClusterRoleBinding. Deprecated in v1.17 in favor of rbac.authorization.k8s.io/v1 ClusterRole, and will no longer be served in v1.22.
 * @deprecated
 */
export interface IClusterRole extends TypeMeta {
    /**
     * AggregationRule is an optional field that describes how to build the Rules for this ClusterRole. If AggregationRule is set, then the Rules are controller managed and direct changes to Rules will be stomped by the controller.
     */
    "aggregationRule"?: IIoK8sApiRbacV1beta1AggregationRule;
    "apiVersion": "rbac.authorization.k8s.io/v1beta1";
    "kind": "ClusterRole";
    /**
     * Standard object's metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Rules holds all the PolicyRules for this ClusterRole
     */
    "rules"?: Array<IIoK8sApiRbacV1beta1PolicyRule>;
}
/**
 * ClusterRole is a cluster level, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding or ClusterRoleBinding. Deprecated in v1.17 in favor of rbac.authorization.k8s.io/v1 ClusterRole, and will no longer be served in v1.22.
 * @deprecated
 */
export declare class ClusterRole extends Model<IClusterRole> implements IClusterRole {
    "aggregationRule"?: IIoK8sApiRbacV1beta1AggregationRule;
    "apiVersion": IClusterRole["apiVersion"];
    "kind": IClusterRole["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "rules"?: Array<IIoK8sApiRbacV1beta1PolicyRule>;
    static apiVersion: IClusterRole["apiVersion"];
    static kind: IClusterRole["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IClusterRole>;
    constructor(data?: ModelData<IClusterRole>);
}
export { IClusterRole as IIoK8sApiRbacV1beta1ClusterRole, ClusterRole as IoK8sApiRbacV1beta1ClusterRole };
