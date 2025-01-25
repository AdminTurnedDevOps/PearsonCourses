export declare class BasicPluginOptionsManager<T> {
    private _options?;
    get enable(): boolean;
    get options(): T;
    init(options: T, extraArgs?: Record<string, any>): void;
    setOptions(options: T): void;
}
