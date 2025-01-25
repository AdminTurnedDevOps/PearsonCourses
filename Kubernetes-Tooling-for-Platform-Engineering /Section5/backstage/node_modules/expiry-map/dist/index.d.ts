declare class ExpiryMap<K = any, V = any> implements Map<K, V> {
    private readonly maxAge;
    private readonly data;
    readonly [Symbol.toStringTag]: 'Map';
    constructor(maxAge: number);
    constructor(maxAge: number, entries: ReadonlyArray<[K, V]> | null | undefined);
    constructor(maxAge: number, iterable: Iterable<[K, V]>);
    get size(): number;
    clear(): void;
    delete(key: K): boolean;
    has(key: K): boolean;
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    values(): Generator<V, void, unknown>;
    keys(): IterableIterator<K>;
    entries(): Generator<[K, V], void, unknown>;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    [Symbol.iterator](): Generator<[K, V], void, unknown>;
    private createIterator;
}
export = ExpiryMap;
