import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Preconditions must be fulfilled before an operation (update, delete, etc.) is carried out.
 */
export interface IPreconditions {
    /**
     * Specifies the target ResourceVersion
     */
    "resourceVersion"?: string;
    /**
     * Specifies the target UID.
     */
    "uid"?: string;
}
/**
 * Preconditions must be fulfilled before an operation (update, delete, etc.) is carried out.
 */
export declare class Preconditions extends Model<IPreconditions> implements IPreconditions {
    "resourceVersion"?: string;
    "uid"?: string;
    constructor(data?: ModelData<IPreconditions>);
}
export { IPreconditions as IIoK8sApimachineryPkgApisMetaV1Preconditions, Preconditions as IoK8sApimachineryPkgApisMetaV1Preconditions };
