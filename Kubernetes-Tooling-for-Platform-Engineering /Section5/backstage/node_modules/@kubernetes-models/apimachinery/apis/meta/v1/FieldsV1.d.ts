import { ModelData, Model } from "@kubernetes-models/base";
/**
 * FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.
 *
 * Each key is either a '.' representing the field itself, and will always map to an empty set, or a string representing a sub-field or item. The string will follow one of these four formats: 'f:<name>', where <name> is the name of a field in a struct, or key in a map 'v:<value>', where <value> is the exact json formatted value of a list item 'i:<index>', where <index> is position of a item in a list 'k:<keys>', where <keys> is a map of  a list item's key fields to their unique values If a key maps to an empty Fields value, the field that key represents is part of the set.
 *
 * The exact format is defined in sigs.k8s.io/structured-merge-diff
 */
export interface IFieldsV1 {
}
/**
 * FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.
 *
 * Each key is either a '.' representing the field itself, and will always map to an empty set, or a string representing a sub-field or item. The string will follow one of these four formats: 'f:<name>', where <name> is the name of a field in a struct, or key in a map 'v:<value>', where <value> is the exact json formatted value of a list item 'i:<index>', where <index> is position of a item in a list 'k:<keys>', where <keys> is a map of  a list item's key fields to their unique values If a key maps to an empty Fields value, the field that key represents is part of the set.
 *
 * The exact format is defined in sigs.k8s.io/structured-merge-diff
 */
export declare class FieldsV1 extends Model<IFieldsV1> implements IFieldsV1 {
    constructor(data?: ModelData<IFieldsV1>);
}
export { IFieldsV1 as IIoK8sApimachineryPkgApisMetaV1FieldsV1, FieldsV1 as IoK8sApimachineryPkgApisMetaV1FieldsV1 };
