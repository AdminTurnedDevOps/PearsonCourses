import { IWindowStorage } from "./IWindowStorage.js";
export declare class SessionStorage implements IWindowStorage<string> {
    constructor();
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    getKeys(): string[];
    containsKey(key: string): boolean;
}
//# sourceMappingURL=SessionStorage.d.ts.map