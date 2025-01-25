import { ModelData, Model } from "@kubernetes-models/base";
/**
 * CustomResourceDefinitionNames indicates the names to serve this CustomResourceDefinition
 */
export interface ICustomResourceDefinitionNames {
    /**
     * categories is a list of grouped resources this custom resource belongs to (e.g. 'all'). This is published in API discovery documents, and used by clients to support invocations like `kubectl get all`.
     */
    "categories"?: Array<string>;
    /**
     * kind is the serialized kind of the resource. It is normally CamelCase and singular. Custom resource instances will use this value as the `kind` attribute in API calls.
     */
    "kind": string;
    /**
     * listKind is the serialized kind of the list for this resource. Defaults to "`kind`List".
     */
    "listKind"?: string;
    /**
     * plural is the plural name of the resource to serve. The custom resources are served under `/apis/<group>/<version>/.../<plural>`. Must match the name of the CustomResourceDefinition (in the form `<names.plural>.<group>`). Must be all lowercase.
     */
    "plural": string;
    /**
     * shortNames are short names for the resource, exposed in API discovery documents, and used by clients to support invocations like `kubectl get <shortname>`. It must be all lowercase.
     */
    "shortNames"?: Array<string>;
    /**
     * singular is the singular name of the resource. It must be all lowercase. Defaults to lowercased `kind`.
     */
    "singular"?: string;
}
/**
 * CustomResourceDefinitionNames indicates the names to serve this CustomResourceDefinition
 */
export declare class CustomResourceDefinitionNames extends Model<ICustomResourceDefinitionNames> implements ICustomResourceDefinitionNames {
    "categories"?: Array<string>;
    "kind": ICustomResourceDefinitionNames["kind"];
    "listKind"?: string;
    "plural": string;
    "shortNames"?: Array<string>;
    "singular"?: string;
    constructor(data?: ModelData<ICustomResourceDefinitionNames>);
}
export { ICustomResourceDefinitionNames as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionNames, CustomResourceDefinitionNames as IoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionNames };
