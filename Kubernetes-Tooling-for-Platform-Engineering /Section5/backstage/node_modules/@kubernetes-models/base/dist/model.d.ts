import { ValidateFunc } from "@kubernetes-models/validate";
import { TypeMeta } from "./meta";
export declare type ModelData<T> = T extends TypeMeta ? Omit<T, keyof TypeMeta> : T;
export declare type ModelConstructor<T> = new (data?: ModelData<T>) => Model<T>;
export declare class Model<T> {
    constructor(data?: ModelData<T>);
    protected setDefinedProps(data?: ModelData<T>): any;
    toJSON(): any;
    validate(): void;
}
export declare function setValidateFunc<T>(ctor: ModelConstructor<T>, fn: ValidateFunc<T>): void;
