import { ADD, CHANGE, CONNECT, DELETE, ERROR, ErrorCallback, Informer, ListPromise, ObjectCallback, UPDATE } from './informer';
import { KubernetesObject } from './types';
import { Watch } from './watch';
export interface ObjectCache<T> {
    get(name: string, namespace?: string): T | undefined;
    list(namespace?: string): ReadonlyArray<T>;
}
export type CacheMap<T extends KubernetesObject> = Map<string, Map<string, T>>;
export declare class ListWatch<T extends KubernetesObject> implements ObjectCache<T>, Informer<T> {
    private readonly path;
    private readonly watch;
    private readonly listFn;
    private readonly labelSelector?;
    private readonly fieldSelector?;
    private objects;
    private resourceVersion;
    private readonly callbackCache;
    private request;
    private stopped;
    constructor(path: string, watch: Watch, listFn: ListPromise<T>, autoStart?: boolean, labelSelector?: string | undefined, fieldSelector?: string | undefined);
    start(): Promise<void>;
    stop(): Promise<void>;
    on(verb: ADD | UPDATE | DELETE | CHANGE, cb: ObjectCallback<T>): void;
    on(verb: ERROR | CONNECT, cb: ErrorCallback): void;
    off(verb: ADD | UPDATE | DELETE | CHANGE, cb: ObjectCallback<T>): void;
    off(verb: ERROR | CONNECT, cb: ErrorCallback): void;
    get(name: string, namespace?: string): T | undefined;
    list(namespace?: string | undefined): ReadonlyArray<T>;
    latestResourceVersion(): string;
    private _stop;
    private doneHandler;
    private addOrUpdateItems;
    private watchHandler;
}
export declare function cacheMapFromList<T extends KubernetesObject>(newObjects: T[]): CacheMap<T>;
export declare function deleteItems<T extends KubernetesObject>(oldObjects: CacheMap<T>, newObjects: T[], deleteCallback?: ObjectCallback<T>[]): CacheMap<T>;
export declare function addOrUpdateObject<T extends KubernetesObject>(objects: CacheMap<T>, obj: T, addCallbacks?: ObjectCallback<T>[], updateCallbacks?: ObjectCallback<T>[]): void;
export declare function deleteObject<T extends KubernetesObject>(objects: CacheMap<T>, obj: T, deleteCallbacks?: ObjectCallback<T>[]): void;
