import { IWindowStorage } from "./IWindowStorage.js";
/**
 * @deprecated This class will be removed in a future major version
 */
export declare class BrowserStorage implements IWindowStorage<string> {
    private windowStorage;
    constructor(cacheLocation: string);
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    getKeys(): string[];
    containsKey(key: string): boolean;
}
//# sourceMappingURL=BrowserStorage.d.ts.map