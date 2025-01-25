type EventListener = (...arguments_: any[]) => void;
declare class EventManager {
    _eventListeners: Map<string, EventListener[]>;
    _maxListeners: number;
    constructor();
    maxListeners(): number;
    addListener(event: string, listener: EventListener): void;
    on(event: string, listener: EventListener): this;
    removeListener(event: string, listener: EventListener): void;
    off(event: string, listener: EventListener): void;
    once(event: string, listener: EventListener): void;
    emit(event: string, ...arguments_: any[]): void;
    listeners(event: string): EventListener[];
    removeAllListeners(event?: string): void;
    setMaxListeners(n: number): void;
}

type HookHandler = (...arguments_: any[]) => void;
declare class HooksManager extends EventManager {
    _hookHandlers: Map<string, HookHandler[]>;
    constructor();
    addHandler(event: string, handler: HookHandler): void;
    removeHandler(event: string, handler: HookHandler): void;
    trigger(event: string, data: any): void;
    get handlers(): Map<string, HookHandler[]>;
}

declare class StatsManager extends EventManager {
    enabled: boolean;
    hits: number;
    misses: number;
    sets: number;
    deletes: number;
    errors: number;
    constructor(enabled?: boolean);
    hit(): void;
    miss(): void;
    set(): void;
    delete(): void;
    reset(): void;
}

type DeserializedData<Value> = {
    value?: Value;
    expires?: number | null;
};
interface CompressionAdapter {
    compress(value: any, options?: any): Promise<any>;
    decompress(value: any, options?: any): Promise<any>;
    serialize<Value>(data: DeserializedData<Value>): Promise<string> | string;
    deserialize<Value>(data: string): Promise<DeserializedData<Value> | undefined> | DeserializedData<Value> | undefined;
}
type Serialize = <Value>(data: DeserializedData<Value>) => Promise<string> | string;
type Deserialize = <Value>(data: string) => Promise<DeserializedData<Value> | undefined> | DeserializedData<Value> | undefined;
declare enum KeyvHooks {
    PRE_SET = "preSet",
    POST_SET = "postSet",
    PRE_GET = "preGet",
    POST_GET = "postGet",
    PRE_GET_MANY = "preGetMany",
    POST_GET_MANY = "postGetMany",
    PRE_DELETE = "preDelete",
    POST_DELETE = "postDelete"
}
type StoredDataNoRaw<Value> = Value | undefined;
type StoredDataRaw<Value> = DeserializedData<Value> | undefined;
type StoredData<Value> = StoredDataNoRaw<Value> | StoredDataRaw<Value>;
interface IEventEmitter {
    on(event: string, listener: (...arguments_: any[]) => void): this;
}
interface KeyvStoreAdapter extends IEventEmitter {
    opts: any;
    namespace?: string;
    get<Value>(key: string): Promise<StoredData<Value> | undefined>;
    set(key: string, value: any, ttl?: number): any;
    delete(key: string): Promise<boolean>;
    clear(): Promise<void>;
    has?(key: string): Promise<boolean>;
    getMany?<Value>(keys: string[]): Promise<Array<StoredData<Value | undefined>>>;
    disconnect?(): Promise<void>;
    deleteMany?(key: string[]): Promise<boolean>;
    iterator?<Value>(namespace?: string): AsyncGenerator<Array<string | Awaited<Value> | undefined>, void>;
}
type KeyvOptions = {
    /** Emit errors */
    emitErrors?: boolean;
    /** Namespace for the current instance. */
    namespace?: string;
    /** A custom serialization function. */
    serialize?: Serialize;
    /** A custom deserialization function. */
    deserialize?: Deserialize;
    /** The storage adapter instance to be used by Keyv. */
    store?: KeyvStoreAdapter | Map<any, any> | any;
    /** Default TTL. Can be overridden by specifying a TTL on `.set()`. */
    ttl?: number;
    /** Enable compression option **/
    compression?: CompressionAdapter | any;
    /** Enable or disable statistics (default is false) */
    stats?: boolean;
    /** Enable or disable key prefixing (default is true) */
    useKeyPrefix?: boolean;
};
type KeyvOptions_ = Omit<KeyvOptions, 'store'> & {
    store: KeyvStoreAdapter | Map<any, any> & KeyvStoreAdapter;
};
type IteratorFunction = (argument: any) => AsyncGenerator<any, void>;
declare class Keyv<GenericValue = any> extends EventManager {
    opts: KeyvOptions_;
    iterator?: IteratorFunction;
    hooks: HooksManager;
    stats: StatsManager;
    /**
     * Time to live in milliseconds
     */
    private _ttl?;
    /**
     * Namespace
     */
    private _namespace?;
    /**
     * Store
     */
    private _store;
    private _serialize;
    private _deserialize;
    private _compression;
    private _useKeyPrefix;
    /**
     * Keyv Constructor
     * @param {KeyvStoreAdapter | KeyvOptions | Map<any, any>} store  to be provided or just the options
     * @param {Omit<KeyvOptions, 'store'>} [options] if you provide the store you can then provide the Keyv Options
     */
    constructor(store?: KeyvStoreAdapter | KeyvOptions | Map<any, any>, options?: Omit<KeyvOptions, 'store'>);
    /**
     * Keyv Constructor
     * @param {KeyvOptions} options to be provided
     */
    constructor(options?: KeyvOptions);
    /**
     * Get the current store
     */
    get store(): KeyvStoreAdapter | Map<any, any> | any;
    /**
     * Set the current store. This will also set the namespace, event error handler, and generate the iterator. If the store is not valid it will throw an error.
     * @param {KeyvStoreAdapter | Map<any, any> | any} store the store to set
     */
    set store(store: KeyvStoreAdapter | Map<any, any> | any);
    /**
     * Get the current compression function
     * @returns {CompressionAdapter} The current compression function
     */
    get compression(): CompressionAdapter | undefined;
    /**
     * Set the current compression function
     * @param {CompressionAdapter} compress The compression function to set
     */
    set compression(compress: CompressionAdapter | undefined);
    /**
     * Get the current namespace.
     * @returns {string | undefined} The current namespace.
     */
    get namespace(): string | undefined;
    /**
     * Set the current namespace.
     * @param {string | undefined} namespace The namespace to set.
     */
    set namespace(namespace: string | undefined);
    /**
     * Get the current TTL.
     * @returns {number} The current TTL.
     */
    get ttl(): number | undefined;
    /**
     * Set the current TTL.
     * @param {number} ttl The TTL to set.
     */
    set ttl(ttl: number | undefined);
    /**
     * Get the current serialize function.
     * @returns {Serialize} The current serialize function.
     */
    get serialize(): Serialize | undefined;
    /**
     * Set the current serialize function.
     * @param {Serialize} serialize The serialize function to set.
     */
    set serialize(serialize: Serialize | undefined);
    /**
     * Get the current deserialize function.
     * @returns {Deserialize} The current deserialize function.
     */
    get deserialize(): Deserialize | undefined;
    /**
     * Set the current deserialize function.
     * @param {Deserialize} deserialize The deserialize function to set.
     */
    set deserialize(deserialize: Deserialize | undefined);
    /**
     * Get the current useKeyPrefix value. This will enable or disable key prefixing.
     * @returns {boolean} The current useKeyPrefix value.
     * @default true
     */
    get useKeyPrefix(): boolean;
    /**
     * Set the current useKeyPrefix value. This will enable or disable key prefixing.
     * @param {boolean} value The useKeyPrefix value to set.
     */
    set useKeyPrefix(value: boolean);
    generateIterator(iterator: IteratorFunction): IteratorFunction;
    _checkIterableAdapter(): boolean;
    _getKeyPrefix(key: string): string;
    _getKeyPrefixArray(keys: string[]): string[];
    _getKeyUnprefix(key: string): string;
    _isValidStorageAdapter(store: KeyvStoreAdapter | any): boolean;
    /**
     * Get the Value of a Key
     * @param {string | string[]} key passing in a single key or multiple as an array
     * @param [options] can pass in to return the raw value by setting { raw: true }
     */
    get<Value = GenericValue>(key: string, options?: {
        raw: false;
    }): Promise<StoredDataNoRaw<Value>>;
    get<Value = GenericValue>(key: string, options?: {
        raw: true;
    }): Promise<StoredDataRaw<Value>>;
    get<Value = GenericValue>(key: string[], options?: {
        raw: false;
    }): Promise<Array<StoredDataNoRaw<Value>>>;
    get<Value = GenericValue>(key: string[], options?: {
        raw: true;
    }): Promise<Array<StoredDataRaw<Value>>>;
    /**
     * Set an item to the store
     * @param {string} key the key to use
     * @param {Value} value the value of the key
     * @param {number} [ttl] time to live in milliseconds
     * @returns {boolean} if it sets then it will return a true. On failure will return false.
     */
    set<Value = GenericValue>(key: string, value: Value, ttl?: number): Promise<boolean>;
    /**
     * Delete an Entry
     * @param {string | string[]} key the key to be deleted. if an array it will delete many items
     * @returns {boolean} will return true if item or items are deleted. false if there is an error
     */
    delete(key: string | string[]): Promise<boolean>;
    /**
     * Clear the store
     * @returns {void}
     */
    clear(): Promise<void>;
    /**
     * Has a key
     * @param {string} key the key to check
     * @returns {boolean} will return true if the key exists
     */
    has(key: string): Promise<boolean>;
    /**
     * Will disconnect the store. This is only available if the store has a disconnect method
     * @returns {Promise<void>}
     */
    disconnect(): Promise<void>;
    serializeData<T>(data: DeserializedData<T>): Promise<string | DeserializedData<T>>;
    deserializeData<T>(data: string | DeserializedData<T>): Promise<DeserializedData<T> | undefined>;
}

export { type CompressionAdapter, type Deserialize, type DeserializedData, type IEventEmitter, Keyv, KeyvHooks, type KeyvOptions, type KeyvStoreAdapter, type Serialize, type StoredData, type StoredDataNoRaw, type StoredDataRaw, Keyv as default };
