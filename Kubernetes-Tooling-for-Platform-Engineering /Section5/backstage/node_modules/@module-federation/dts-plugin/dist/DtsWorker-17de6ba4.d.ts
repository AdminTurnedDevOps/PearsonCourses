import { ChildProcess } from 'child_process';
import { a as RemoteOptions, D as DTSManagerOptions, R as RemoteInfo, H as HostOptions } from './DTSManagerOptions-7109e8ac.js';
import ts from 'typescript';

interface TsConfigJson {
    extends?: string;
    compilerOptions?: ts.CompilerOptions;
    exclude?: string[];
    include?: string[];
    files?: string[];
}

declare const retrieveRemoteConfig: (options: RemoteOptions) => {
    tsConfig: TsConfigJson;
    mapComponentsToExpose: Record<string, string>;
    remoteOptions: Required<RemoteOptions>;
};

declare const enum UpdateMode {
    POSITIVE = "POSITIVE",
    PASSIVE = "PASSIVE"
}

interface UpdateTypesOptions {
    updateMode: UpdateMode;
    remoteName?: string;
    remoteTarPath?: string;
    remoteInfo?: RemoteInfo;
    once?: boolean;
}
declare class DTSManager {
    options: DTSManagerOptions;
    runtimePkgs: string[];
    remoteAliasMap: Record<string, Required<RemoteInfo>>;
    loadedRemoteAPIAlias: Set<string>;
    extraOptions: Record<string, any>;
    updatedRemoteInfos: Record<string, Required<RemoteInfo>>;
    constructor(options: DTSManagerOptions);
    generateAPITypes(mapComponentsToExpose: Record<string, string>): string;
    extractRemoteTypes(options: ReturnType<typeof retrieveRemoteConfig>): Promise<void>;
    generateTypes(): Promise<void>;
    requestRemoteManifest(remoteInfo: RemoteInfo): Promise<Required<RemoteInfo>>;
    consumeTargetRemotes(hostOptions: Required<HostOptions>, remoteInfo: Required<RemoteInfo>): Promise<[string, string]>;
    downloadAPITypes(remoteInfo: Required<RemoteInfo>, destinationPath: string): Promise<void>;
    consumeAPITypes(hostOptions: Required<HostOptions>): void;
    consumeArchiveTypes(options: HostOptions): Promise<{
        hostOptions: Required<HostOptions>;
        downloadPromisesResult: PromiseSettledResult<[string, string]>[];
    }>;
    consumeTypes(): Promise<void>;
    updateTypes(options: UpdateTypesOptions): Promise<void>;
}

declare enum RpcGMCallTypes {
    CALL = "mf_call",
    RESOLVE = "mf_resolve",
    REJECT = "mf_reject",
    EXIT = "mf_exit"
}
interface RpcCallMessage {
    type: RpcGMCallTypes.CALL;
    id: string;
    args: unknown[];
}
interface RpcResolveMessage {
    type: RpcGMCallTypes.RESOLVE;
    id: string;
    value: unknown;
}
interface RpcRejectMessage {
    type: RpcGMCallTypes.REJECT;
    id: string;
    error: unknown;
}
interface RpcExitMessage {
    type: RpcGMCallTypes.EXIT;
    id: string;
}
type RpcMessage = RpcCallMessage | RpcResolveMessage | RpcRejectMessage | RpcExitMessage;
type RpcMethod = (...args: any[]) => any;
type RpcRemoteMethod<T extends RpcMethod> = T extends (...args: infer A) => infer R ? R extends Promise<any> ? (...args: A) => R : (...args: A) => Promise<R> : (...args: unknown[]) => Promise<unknown>;

interface RpcWorkerBase {
    connect(...args: unknown[]): any;
    terminate(): void;
    readonly connected: boolean;
    readonly id: string;
    readonly process: ChildProcess | undefined;
}
type RpcWorker<T extends RpcMethod = RpcMethod> = RpcWorkerBase & RpcRemoteMethod<T>;
declare function createRpcWorker<T extends RpcMethod>(modulePath: string, data: unknown, memoryLimit?: number, once?: boolean): RpcWorker<T>;
declare function getRpcWorkerData(): unknown;

type DtsWorkerOptions = DTSManagerOptions;
declare class DtsWorker {
    rpcWorker: RpcWorker<RpcMethod>;
    private _options;
    private _res;
    constructor(options: DtsWorkerOptions);
    removeUnSerializationOptions(): void;
    get controlledPromise(): ReturnType<DTSManager['generateTypes']>;
    exit(): void;
}

export { DTSManager as D, RpcRemoteMethod as R, TsConfigJson as T, RpcCallMessage as a, RpcGMCallTypes as b, RpcMessage as c, RpcMethod as d, RpcRejectMessage as e, RpcResolveMessage as f, RpcWorker as g, createRpcWorker as h, getRpcWorkerData as i, DtsWorker as j, DtsWorkerOptions as k, retrieveRemoteConfig as r };
