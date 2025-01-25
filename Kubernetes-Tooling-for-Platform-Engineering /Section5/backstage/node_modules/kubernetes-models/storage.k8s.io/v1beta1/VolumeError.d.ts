import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * VolumeError captures an error encountered during a volume operation.
 */
export interface IVolumeError {
    /**
     * String detailing the error encountered during Attach or Detach operation. This string may be logged, so it should not contain sensitive information.
     */
    "message"?: string;
    /**
     * Time the error was encountered.
     */
    "time"?: IIoK8sApimachineryPkgApisMetaV1Time;
}
/**
 * VolumeError captures an error encountered during a volume operation.
 */
export declare class VolumeError extends Model<IVolumeError> implements IVolumeError {
    "message"?: string;
    "time"?: IIoK8sApimachineryPkgApisMetaV1Time;
    constructor(data?: ModelData<IVolumeError>);
}
export { IVolumeError as IIoK8sApiStorageV1beta1VolumeError, VolumeError as IoK8sApiStorageV1beta1VolumeError };
