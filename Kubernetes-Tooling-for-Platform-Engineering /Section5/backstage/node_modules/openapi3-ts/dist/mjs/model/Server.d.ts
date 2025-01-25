import * as oa from './OpenApi';
import { IExtensionName, IExtensionType } from './SpecificationExtension.js';
export declare class Server implements oa.ServerObject {
    url: string;
    description?: string;
    variables: {
        [v: string]: ServerVariable;
    };
    [k: IExtensionName]: IExtensionType;
    constructor(url: string, desc?: string);
    addVariable(name: string, variable: ServerVariable): void;
}
export declare class ServerVariable implements oa.ServerVariableObject {
    enum?: string[] | boolean[] | number[];
    default: string | boolean | number;
    description?: string;
    [k: IExtensionName]: IExtensionType;
    constructor(defaultValue: string | boolean | number, enums?: string[] | boolean[] | number[], description?: string);
}
