import { Dispute, SingleMergeInput } from './data';
export declare function getDispute(input: SingleMergeInput): Dispute | undefined;
export declare type DisputeStatus = 'disputed' | 'undisputed';
export declare function applyDispute(dispute: Dispute | undefined, input: string, status: DisputeStatus): string;
//# sourceMappingURL=dispute.d.ts.map