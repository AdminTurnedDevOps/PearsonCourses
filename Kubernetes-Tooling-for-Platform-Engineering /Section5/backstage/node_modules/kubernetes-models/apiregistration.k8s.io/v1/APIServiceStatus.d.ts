import { IIoK8sKubeAggregatorPkgApisApiregistrationV1APIServiceCondition } from "./APIServiceCondition";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * APIServiceStatus contains derived information about an API server
 */
export interface IAPIServiceStatus {
    /**
     * Current service state of apiService.
     */
    "conditions"?: Array<IIoK8sKubeAggregatorPkgApisApiregistrationV1APIServiceCondition>;
}
/**
 * APIServiceStatus contains derived information about an API server
 */
export declare class APIServiceStatus extends Model<IAPIServiceStatus> implements IAPIServiceStatus {
    "conditions"?: Array<IIoK8sKubeAggregatorPkgApisApiregistrationV1APIServiceCondition>;
    constructor(data?: ModelData<IAPIServiceStatus>);
}
export { IAPIServiceStatus as IIoK8sKubeAggregatorPkgApisApiregistrationV1APIServiceStatus, APIServiceStatus as IoK8sKubeAggregatorPkgApisApiregistrationV1APIServiceStatus };
