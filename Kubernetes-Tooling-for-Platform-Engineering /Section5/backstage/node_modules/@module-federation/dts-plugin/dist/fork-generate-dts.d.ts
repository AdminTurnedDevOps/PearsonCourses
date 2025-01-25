import { k as DtsWorkerOptions } from './DtsWorker-17de6ba4.js';
import 'child_process';
import './DTSManagerOptions-7109e8ac.js';
import '@module-federation/sdk';
import 'typescript';

declare function forkGenerateDts(options: DtsWorkerOptions): Promise<void>;

export { forkGenerateDts };
