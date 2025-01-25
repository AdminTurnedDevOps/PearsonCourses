import type { ObjectDeserializerContext, ObjectSerializerContext } from 'webpack/lib/Dependency';
declare const Dependency: typeof import("webpack").Dependency;
declare class FallbackDependency extends Dependency {
    requests: string[];
    /**
     * @param {string[]} requests requests
     */
    constructor(requests: string[]);
    /**
     * @returns {string | null} an identifier to merge equal requests
     */
    getResourceIdentifier(): string | null;
    get type(): string;
    get category(): string;
    /**
     * @param {ObjectSerializerContext} context context
     */
    serialize(context: ObjectSerializerContext): void;
    static deserialize(context: ObjectDeserializerContext): FallbackDependency;
}
export default FallbackDependency;
