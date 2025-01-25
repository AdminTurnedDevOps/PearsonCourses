import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ExternalDocumentation allows referencing an external resource for extended documentation.
 */
export interface IExternalDocumentation {
    "description"?: string;
    "url"?: string;
}
/**
 * ExternalDocumentation allows referencing an external resource for extended documentation.
 */
export declare class ExternalDocumentation extends Model<IExternalDocumentation> implements IExternalDocumentation {
    "description"?: string;
    "url"?: string;
    constructor(data?: ModelData<IExternalDocumentation>);
}
export { IExternalDocumentation as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1ExternalDocumentation, ExternalDocumentation as IoK8sApiextensionsApiserverPkgApisApiextensionsV1ExternalDocumentation };
