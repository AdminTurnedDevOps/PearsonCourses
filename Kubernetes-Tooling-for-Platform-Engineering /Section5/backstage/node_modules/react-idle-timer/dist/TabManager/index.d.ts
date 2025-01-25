import { MessageActionType } from '../types/MessageActionType';
interface ITabManagerOptions {
    channelName: string;
    leaderElection: boolean;
    onPrompt: (event?: Event) => void;
    onIdle: (event?: Event) => void;
    onActive: (event?: Event) => void;
    onMessage: (data: any) => void;
    start: (remote?: boolean) => void;
    reset: (remote?: boolean) => void;
    activate: (remote?: boolean) => void;
    pause: (remote?: boolean) => void;
    resume: (remote?: boolean) => void;
}
declare enum RegistryState {
    PROMPTED = 0,
    ACTIVE = 1,
    IDLE = 2
}
export declare class TabManager {
    private channel;
    private options;
    private elector;
    token: string;
    registry: Map<string, RegistryState>;
    allIdle: boolean;
    isLastActive: boolean;
    constructor(options: ITabManagerOptions);
    get isLeader(): boolean;
    prompt(token?: string): void;
    idle(token?: string): void;
    active(token?: string): void;
    start(token?: string): void;
    reset(token?: string): void;
    activate(token?: string): void;
    pause(token?: string): void;
    resume(token?: string): void;
    message(data: any): void;
    send(action: MessageActionType): void;
    close(): void;
}
export {};
