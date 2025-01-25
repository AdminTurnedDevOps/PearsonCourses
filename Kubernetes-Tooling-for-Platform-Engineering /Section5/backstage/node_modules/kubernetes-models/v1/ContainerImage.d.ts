import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Describe a container image
 */
export interface IContainerImage {
    /**
     * Names by which this image is known. e.g. ["kubernetes.example/hyperkube:v1.0.7", "cloud-vendor.registry.example/cloud-vendor/hyperkube:v1.0.7"]
     */
    "names"?: Array<string>;
    /**
     * The size of the image in bytes.
     */
    "sizeBytes"?: number;
}
/**
 * Describe a container image
 */
export declare class ContainerImage extends Model<IContainerImage> implements IContainerImage {
    "names"?: Array<string>;
    "sizeBytes"?: number;
    constructor(data?: ModelData<IContainerImage>);
}
export { IContainerImage as IIoK8sApiCoreV1ContainerImage, ContainerImage as IoK8sApiCoreV1ContainerImage };
