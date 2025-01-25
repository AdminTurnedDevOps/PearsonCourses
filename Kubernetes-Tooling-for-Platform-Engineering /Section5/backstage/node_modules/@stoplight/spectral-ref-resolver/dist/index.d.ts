/// <reference types="node" />
import { Resolver } from '@stoplight/json-ref-resolver';
import type { IGraphNodeData } from '@stoplight/json-ref-resolver/types';
import type { Agent } from 'http';
import { DepGraph } from 'dependency-graph';
export interface IHttpAndFileResolverOptions {
    agent?: Agent;
}
export * from './types';
export declare const httpAndFileResolver: Resolver;
export { Resolver };
export declare const ResolverDepGraph: {
    new (): DepGraph<IGraphNodeData>;
};
export declare function createHttpAndFileResolver(opts?: IHttpAndFileResolverOptions): Resolver;
