export declare type Storage = {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
    length: number;
};
export declare class StorageAPI {
    storage: Storage | null;
    constructor(storage?: Storage | null);
    get(name: string): string | null;
    set(name: string, value: string): {
        isQuotaError: boolean;
        error: Error | null;
    };
    clear(): void;
}
//# sourceMappingURL=base.d.ts.map