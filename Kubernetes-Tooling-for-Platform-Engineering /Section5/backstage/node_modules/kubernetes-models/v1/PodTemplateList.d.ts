import { IIoK8sApiCoreV1PodTemplate } from "./PodTemplate";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PodTemplateList is a list of PodTemplates.
 */
export interface IPodTemplateList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * List of pod templates
     */
    "items": Array<IIoK8sApiCoreV1PodTemplate>;
    "kind": "PodTemplateList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * PodTemplateList is a list of PodTemplates.
 */
export declare class PodTemplateList extends Model<IPodTemplateList> implements IPodTemplateList {
    "apiVersion": IPodTemplateList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1PodTemplate>;
    "kind": IPodTemplateList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IPodTemplateList["apiVersion"];
    static kind: IPodTemplateList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPodTemplateList>;
    constructor(data?: ModelData<IPodTemplateList>);
}
export { IPodTemplateList as IIoK8sApiCoreV1PodTemplateList, PodTemplateList as IoK8sApiCoreV1PodTemplateList };
