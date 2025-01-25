import { Options, Result } from "./types";
export declare function githubAppJwt<T extends number | string = number>({ id, privateKey, now, }: Options<T>): Promise<Result<T>>;
