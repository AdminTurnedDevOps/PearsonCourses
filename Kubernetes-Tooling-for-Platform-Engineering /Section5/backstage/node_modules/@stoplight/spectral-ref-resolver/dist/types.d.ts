import { IResolveResult, IResolveError } from '@stoplight/json-ref-resolver/types';
export declare type ResolveResult = Omit<IResolveResult, 'runner'>;
export declare type ResolveError = IResolveError;
