import { ModuleInfo } from '@module-federation/sdk';
export declare const getScope: () => string;
export declare const getPrefetchId: (id: string) => string;
export declare const compatGetPrefetchId: (id: string) => string;
export declare const getSignalFromManifest: (remoteSnapshot: ModuleInfo) => boolean;
