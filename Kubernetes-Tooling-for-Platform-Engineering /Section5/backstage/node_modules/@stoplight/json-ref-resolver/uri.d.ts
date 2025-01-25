import * as BaseURI from 'urijs';
export declare class ExtendedURI extends BaseURI {
    private readonly _value;
    constructor(_value: string);
    get length(): number;
}
