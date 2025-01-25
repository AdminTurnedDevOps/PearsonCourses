import { Collection } from '../collection';
import type { ServerVariablesInterface } from '../server-variables';
import type { ServerVariableInterface } from '../server-variable';
export declare class ServerVariables extends Collection<ServerVariableInterface> implements ServerVariablesInterface {
    get(id: string): ServerVariableInterface | undefined;
}
