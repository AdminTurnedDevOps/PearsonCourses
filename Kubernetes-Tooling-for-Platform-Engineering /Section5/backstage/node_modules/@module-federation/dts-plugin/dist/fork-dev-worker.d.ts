import { D as DTSManagerOptions } from './DTSManagerOptions-7109e8ac.js';
import '@module-federation/sdk';

interface DevWorkerOptions extends DTSManagerOptions {
    name: string;
    disableLiveReload?: boolean;
    disableHotTypesReload?: boolean;
}

interface Options extends DevWorkerOptions {
    name: string;
}
declare function forkDevWorker(options: Options, action?: string): Promise<void>;

export { forkDevWorker };
