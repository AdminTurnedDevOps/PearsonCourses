declare class ThirdPartyExtractor {
    pkgs: Record<string, string>;
    pattern: RegExp;
    context: string;
    destDir: string;
    constructor(destDir: string, context?: string);
    addPkgs(pkgName: string, dirName: string): void;
    inferPkgDir(importPath: string): string | void;
    collectTypeImports(str: string): string[];
    collectPkgs(str: string): void;
    copyDts(): Promise<void>;
}

export { ThirdPartyExtractor };
