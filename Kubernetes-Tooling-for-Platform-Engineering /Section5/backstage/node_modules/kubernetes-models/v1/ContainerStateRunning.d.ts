import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ContainerStateRunning is a running state of a container.
 */
export interface IContainerStateRunning {
    /**
     * Time at which the container was last (re-)started
     */
    "startedAt"?: IIoK8sApimachineryPkgApisMetaV1Time;
}
/**
 * ContainerStateRunning is a running state of a container.
 */
export declare class ContainerStateRunning extends Model<IContainerStateRunning> implements IContainerStateRunning {
    "startedAt"?: IIoK8sApimachineryPkgApisMetaV1Time;
    constructor(data?: ModelData<IContainerStateRunning>);
}
export { IContainerStateRunning as IIoK8sApiCoreV1ContainerStateRunning, ContainerStateRunning as IoK8sApiCoreV1ContainerStateRunning };
