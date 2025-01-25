import type { Format } from './format';
export declare class Formats<T extends Format = Format> extends Set<T> {
    toJSON(): string[];
}
