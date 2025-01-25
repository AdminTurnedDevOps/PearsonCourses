import { IWindowStorage } from "./IWindowStorage.js";
export declare class CookieStorage implements IWindowStorage<string> {
    getItem(key: string): string | null;
    setItem(key: string, value: string, cookieLifeDays?: number, secure?: boolean): void;
    removeItem(key: string): void;
    getKeys(): string[];
    containsKey(key: string): boolean;
}
/**
 * Get cookie expiration time
 * @param cookieLifeDays
 */
export declare function getCookieExpirationTime(cookieLifeDays: number): string;
//# sourceMappingURL=CookieStorage.d.ts.map