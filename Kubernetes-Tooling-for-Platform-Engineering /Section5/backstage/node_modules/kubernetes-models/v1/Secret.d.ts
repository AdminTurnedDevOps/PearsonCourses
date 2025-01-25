import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Secret holds secret data of a certain type. The total bytes of the values in the Data field must be less than MaxSecretSize bytes.
 */
export interface ISecret extends TypeMeta {
    "apiVersion": "v1";
    /**
     * Data contains the secret data. Each key must consist of alphanumeric characters, '-', '_' or '.'. The serialized form of the secret data is a base64 encoded string, representing the arbitrary (possibly non-string) data value here. Described in https://tools.ietf.org/html/rfc4648#section-4
     */
    "data"?: {
        [key: string]: string;
    };
    /**
     * Immutable, if set to true, ensures that data stored in the Secret cannot be updated (only object metadata can be modified). If not set to true, the field can be modified at any time. Defaulted to nil.
     */
    "immutable"?: boolean;
    "kind": "Secret";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * stringData allows specifying non-binary secret data in string form. It is provided as a write-only input field for convenience. All keys and values are merged into the data field on write, overwriting any existing values. The stringData field is never output when reading from the API.
     */
    "stringData"?: {
        [key: string]: string;
    };
    /**
     * Used to facilitate programmatic handling of secret data. More info: https://kubernetes.io/docs/concepts/configuration/secret/#secret-types
     */
    "type"?: string;
}
/**
 * Secret holds secret data of a certain type. The total bytes of the values in the Data field must be less than MaxSecretSize bytes.
 */
export declare class Secret extends Model<ISecret> implements ISecret {
    "apiVersion": ISecret["apiVersion"];
    "data"?: {
        [key: string]: string;
    };
    "immutable"?: boolean;
    "kind": ISecret["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "stringData"?: {
        [key: string]: string;
    };
    "type"?: string;
    static apiVersion: ISecret["apiVersion"];
    static kind: ISecret["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ISecret>;
    constructor(data?: ModelData<ISecret>);
}
export { ISecret as IIoK8sApiCoreV1Secret, Secret as IoK8sApiCoreV1Secret };
