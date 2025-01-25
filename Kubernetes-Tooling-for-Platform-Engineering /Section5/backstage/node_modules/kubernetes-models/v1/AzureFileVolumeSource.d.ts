import { ModelData, Model } from "@kubernetes-models/base";
/**
 * AzureFile represents an Azure File Service mount on the host and bind mount to the pod.
 */
export interface IAzureFileVolumeSource {
    /**
     * readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    "readOnly"?: boolean;
    /**
     * secretName is the  name of secret that contains Azure Storage Account Name and Key
     */
    "secretName": string;
    /**
     * shareName is the azure share Name
     */
    "shareName": string;
}
/**
 * AzureFile represents an Azure File Service mount on the host and bind mount to the pod.
 */
export declare class AzureFileVolumeSource extends Model<IAzureFileVolumeSource> implements IAzureFileVolumeSource {
    "readOnly"?: boolean;
    "secretName": string;
    "shareName": string;
    constructor(data?: ModelData<IAzureFileVolumeSource>);
}
export { IAzureFileVolumeSource as IIoK8sApiCoreV1AzureFileVolumeSource, AzureFileVolumeSource as IoK8sApiCoreV1AzureFileVolumeSource };
