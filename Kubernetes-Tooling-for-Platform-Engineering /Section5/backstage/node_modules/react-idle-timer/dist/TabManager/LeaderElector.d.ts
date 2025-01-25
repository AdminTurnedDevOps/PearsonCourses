interface ILeaderElectorOptions {
    /**
     * How often renegotiation for leader will occur.
     *
     * @default 2000
     */
    fallbackInterval?: number;
    /**
     * How long tab instances will have to respond.
     *
     * @default 100
     */
    responseTime?: number;
}
export declare class LeaderElector {
    private options;
    private channel;
    token: string;
    isLeader: boolean;
    private isDead;
    private isApplying;
    private reApply;
    private intervals;
    private listeners;
    deferred: Promise<void>;
    constructor(channel: any, options: ILeaderElectorOptions);
    private apply;
    private awaitLeadership;
    private sendAction;
    private assumeLead;
    waitForLeadership(): Promise<void>;
    close(): void;
}
export {};
