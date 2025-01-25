import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * APIServiceCondition describes the state of an APIService at a particular point
 */
export interface IAPIServiceCondition {
    /**
     * Last time the condition transitioned from one status to another.
     */
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * Human-readable message indicating details about last transition.
     */
    "message"?: string;
    /**
     * Unique, one-word, CamelCase reason for the condition's last transition.
     */
    "reason"?: string;
    /**
     * Status is the status of the condition. Can be True, False, Unknown.
     */
    "status": string;
    /**
     * Type is the type of the condition.
     */
    "type": string;
}
/**
 * APIServiceCondition describes the state of an APIService at a particular point
 */
export declare class APIServiceCondition extends Model<IAPIServiceCondition> implements IAPIServiceCondition {
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<IAPIServiceCondition>);
}
export { IAPIServiceCondition as IIoK8sKubeAggregatorPkgApisApiregistrationV1APIServiceCondition, APIServiceCondition as IoK8sKubeAggregatorPkgApisApiregistrationV1APIServiceCondition };
