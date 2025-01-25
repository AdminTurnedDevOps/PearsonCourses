import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ContainerStateWaiting is a waiting state of a container.
 */
export interface IContainerStateWaiting {
    /**
     * Message regarding why the container is not yet running.
     */
    "message"?: string;
    /**
     * (brief) reason the container is not yet running.
     */
    "reason"?: string;
}
/**
 * ContainerStateWaiting is a waiting state of a container.
 */
export declare class ContainerStateWaiting extends Model<IContainerStateWaiting> implements IContainerStateWaiting {
    "message"?: string;
    "reason"?: string;
    constructor(data?: ModelData<IContainerStateWaiting>);
}
export { IContainerStateWaiting as IIoK8sApiCoreV1ContainerStateWaiting, ContainerStateWaiting as IoK8sApiCoreV1ContainerStateWaiting };
