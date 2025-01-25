import { KubeConfig } from './config';
import { KubernetesListObject, KubernetesObject } from './types';
export type ObjectCallback<T extends KubernetesObject> = (obj: T) => void;
export type ErrorCallback = (err?: any) => void;
export type ListCallback<T extends KubernetesObject> = (list: T[], ResourceVersion: string) => void;
export type ListPromise<T extends KubernetesObject> = () => Promise<KubernetesListObject<T>>;
export declare const ADD: string;
export declare const UPDATE: string;
export declare const CHANGE: string;
export declare const DELETE: string;
export declare const CONNECT: string;
export declare const ERROR: string;
export interface Informer<T extends KubernetesObject> {
    on(verb: string, fn: ObjectCallback<T>): void;
    off(verb: string, fn: ObjectCallback<T>): void;
    start(): Promise<void>;
    stop(): Promise<void>;
}
export declare function makeInformer<T extends KubernetesObject>(kubeconfig: KubeConfig, path: string, listPromiseFn: ListPromise<T>, labelSelector?: string): Informer<T>;
