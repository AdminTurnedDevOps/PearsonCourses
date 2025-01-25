import { LRUCache } from "lru-cache";
import type { InstallationAuthOptions, Cache, CacheData, InstallationAccessTokenData } from "./types";
export declare function getCache(): LRUCache<number, string, unknown>;
export declare function get(cache: Cache, options: InstallationAuthOptions): Promise<InstallationAccessTokenData | void>;
export declare function set(cache: Cache, options: InstallationAuthOptions, data: CacheData): Promise<void>;
