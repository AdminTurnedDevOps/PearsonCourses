import { IIoK8sApiCoreV1ConfigMapProjection } from "./ConfigMapProjection";
import { IIoK8sApiCoreV1DownwardAPIProjection } from "./DownwardAPIProjection";
import { IIoK8sApiCoreV1SecretProjection } from "./SecretProjection";
import { IIoK8sApiCoreV1ServiceAccountTokenProjection } from "./ServiceAccountTokenProjection";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Projection that may be projected along with other supported volume types
 */
export interface IVolumeProjection {
    /**
     * configMap information about the configMap data to project
     */
    "configMap"?: IIoK8sApiCoreV1ConfigMapProjection;
    /**
     * downwardAPI information about the downwardAPI data to project
     */
    "downwardAPI"?: IIoK8sApiCoreV1DownwardAPIProjection;
    /**
     * secret information about the secret data to project
     */
    "secret"?: IIoK8sApiCoreV1SecretProjection;
    /**
     * serviceAccountToken is information about the serviceAccountToken data to project
     */
    "serviceAccountToken"?: IIoK8sApiCoreV1ServiceAccountTokenProjection;
}
/**
 * Projection that may be projected along with other supported volume types
 */
export declare class VolumeProjection extends Model<IVolumeProjection> implements IVolumeProjection {
    "configMap"?: IIoK8sApiCoreV1ConfigMapProjection;
    "downwardAPI"?: IIoK8sApiCoreV1DownwardAPIProjection;
    "secret"?: IIoK8sApiCoreV1SecretProjection;
    "serviceAccountToken"?: IIoK8sApiCoreV1ServiceAccountTokenProjection;
    constructor(data?: ModelData<IVolumeProjection>);
}
export { IVolumeProjection as IIoK8sApiCoreV1VolumeProjection, VolumeProjection as IoK8sApiCoreV1VolumeProjection };
