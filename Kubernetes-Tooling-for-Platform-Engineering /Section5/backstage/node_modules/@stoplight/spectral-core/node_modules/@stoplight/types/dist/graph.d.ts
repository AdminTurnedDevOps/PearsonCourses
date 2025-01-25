import { Extensions } from './http-spec';
export interface IShareableNode {
    id: string;
}
export interface IComponentNode {
    key: string;
}
export interface INode extends IShareableNode {
    /** An internal identifier. For example, the operationId property in OAS. */
    iid?: string;
    tags?: INodeTag[];
    summary?: string;
    description?: string;
    extensions?: Extensions;
}
export interface INodeTag {
    name: string;
    description?: string;
}
export interface INodeVariable {
    default: string;
    description?: string;
    enum?: string[];
}
interface INodeExampleBase {
    key: string;
    summary?: string;
    description?: string;
}
export interface INodeExample extends INodeExampleBase, IShareableNode {
    value: unknown;
}
export interface INodeExternalExample extends INodeExampleBase, IShareableNode {
    externalValue: string;
}
export {};
