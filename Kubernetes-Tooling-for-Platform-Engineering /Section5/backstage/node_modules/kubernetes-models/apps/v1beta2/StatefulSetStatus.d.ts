import { IIoK8sApiAppsV1beta2StatefulSetCondition } from "./StatefulSetCondition";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * StatefulSetStatus represents the current state of a StatefulSet.
 */
export interface IStatefulSetStatus {
    /**
     * collisionCount is the count of hash collisions for the StatefulSet. The StatefulSet controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ControllerRevision.
     */
    "collisionCount"?: number;
    /**
     * Represents the latest available observations of a statefulset's current state.
     */
    "conditions"?: Array<IIoK8sApiAppsV1beta2StatefulSetCondition>;
    /**
     * currentReplicas is the number of Pods created by the StatefulSet controller from the StatefulSet version indicated by currentRevision.
     */
    "currentReplicas"?: number;
    /**
     * currentRevision, if not empty, indicates the version of the StatefulSet used to generate Pods in the sequence [0,currentReplicas).
     */
    "currentRevision"?: string;
    /**
     * observedGeneration is the most recent generation observed for this StatefulSet. It corresponds to the StatefulSet's generation, which is updated on mutation by the API Server.
     */
    "observedGeneration"?: number;
    /**
     * readyReplicas is the number of Pods created by the StatefulSet controller that have a Ready Condition.
     */
    "readyReplicas"?: number;
    /**
     * replicas is the number of Pods created by the StatefulSet controller.
     */
    "replicas": number;
    /**
     * updateRevision, if not empty, indicates the version of the StatefulSet used to generate Pods in the sequence [replicas-updatedReplicas,replicas)
     */
    "updateRevision"?: string;
    /**
     * updatedReplicas is the number of Pods created by the StatefulSet controller from the StatefulSet version indicated by updateRevision.
     */
    "updatedReplicas"?: number;
}
/**
 * StatefulSetStatus represents the current state of a StatefulSet.
 */
export declare class StatefulSetStatus extends Model<IStatefulSetStatus> implements IStatefulSetStatus {
    "collisionCount"?: number;
    "conditions"?: Array<IIoK8sApiAppsV1beta2StatefulSetCondition>;
    "currentReplicas"?: number;
    "currentRevision"?: string;
    "observedGeneration"?: number;
    "readyReplicas"?: number;
    "replicas": number;
    "updateRevision"?: string;
    "updatedReplicas"?: number;
    constructor(data?: ModelData<IStatefulSetStatus>);
}
export { IStatefulSetStatus as IIoK8sApiAppsV1beta2StatefulSetStatus, StatefulSetStatus as IoK8sApiAppsV1beta2StatefulSetStatus };
