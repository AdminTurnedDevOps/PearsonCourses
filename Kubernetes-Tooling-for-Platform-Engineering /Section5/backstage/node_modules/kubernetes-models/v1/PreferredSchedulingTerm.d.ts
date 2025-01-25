import { IIoK8sApiCoreV1NodeSelectorTerm } from "./NodeSelectorTerm";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * An empty preferred scheduling term matches all objects with implicit weight 0 (i.e. it's a no-op). A null preferred scheduling term matches no objects (i.e. is also a no-op).
 */
export interface IPreferredSchedulingTerm {
    /**
     * A node selector term, associated with the corresponding weight.
     */
    "preference": IIoK8sApiCoreV1NodeSelectorTerm;
    /**
     * Weight associated with matching the corresponding nodeSelectorTerm, in the range 1-100.
     */
    "weight": number;
}
/**
 * An empty preferred scheduling term matches all objects with implicit weight 0 (i.e. it's a no-op). A null preferred scheduling term matches no objects (i.e. is also a no-op).
 */
export declare class PreferredSchedulingTerm extends Model<IPreferredSchedulingTerm> implements IPreferredSchedulingTerm {
    "preference": IIoK8sApiCoreV1NodeSelectorTerm;
    "weight": number;
    constructor(data?: ModelData<IPreferredSchedulingTerm>);
}
export { IPreferredSchedulingTerm as IIoK8sApiCoreV1PreferredSchedulingTerm, PreferredSchedulingTerm as IoK8sApiCoreV1PreferredSchedulingTerm };
