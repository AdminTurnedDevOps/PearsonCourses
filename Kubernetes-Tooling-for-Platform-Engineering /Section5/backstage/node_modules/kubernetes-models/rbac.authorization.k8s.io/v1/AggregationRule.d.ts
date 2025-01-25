import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * AggregationRule describes how to locate ClusterRoles to aggregate into the ClusterRole
 */
export interface IAggregationRule {
    /**
     * ClusterRoleSelectors holds a list of selectors which will be used to find ClusterRoles and create the rules. If any of the selectors match, then the ClusterRole's permissions will be added
     */
    "clusterRoleSelectors"?: Array<IIoK8sApimachineryPkgApisMetaV1LabelSelector>;
}
/**
 * AggregationRule describes how to locate ClusterRoles to aggregate into the ClusterRole
 */
export declare class AggregationRule extends Model<IAggregationRule> implements IAggregationRule {
    "clusterRoleSelectors"?: Array<IIoK8sApimachineryPkgApisMetaV1LabelSelector>;
    constructor(data?: ModelData<IAggregationRule>);
}
export { IAggregationRule as IIoK8sApiRbacV1AggregationRule, AggregationRule as IoK8sApiRbacV1AggregationRule };
