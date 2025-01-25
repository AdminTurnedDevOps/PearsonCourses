export declare class PKGJsonManager {
    private _pkg?;
    setPKGJson(pkg: Record<string, any>): void;
    readPKGJson(ctx?: string): Record<string, any>;
    getExposeGarfishModuleType(ctx?: string): string;
}
