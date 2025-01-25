declare const Dependency: typeof import("webpack").Dependency;
import type { ObjectDeserializerContext, ObjectSerializerContext } from 'webpack/lib/Dependency';
declare class ProvideSharedDependency extends Dependency {
    shareScope: string;
    name: string;
    version: string | false;
    request: string;
    eager: boolean;
    requiredVersion: string | false;
    strictVersion: boolean;
    singleton: boolean;
    /**
     * @param {string} shareScope share scope
     * @param {string} name module name
     * @param {string | false} version version
     * @param {string} request request
     * @param {boolean} eager true, if this is an eager dependency
     * @param {boolean} requiredVersion version requirement
     * @param {boolean} strictVersion don't use shared version even if version isn't valid
     * @param {boolean} singleton use single global version
     */
    constructor(shareScope: string, name: string, version: string | false, request: string, eager: boolean, requiredVersion: string | false, strictVersion: boolean, singleton: boolean);
    get type(): string;
    /**
     * @returns {string | null} an identifier to merge equal requests
     */
    getResourceIdentifier(): string | null;
    /**
     * @param {ObjectSerializerContext} context context
     */
    serialize(context: ObjectSerializerContext): void;
    /**
     * @param {ObjectDeserializerContext} context context
     * @returns {ProvideSharedDependency} deserialize fallback dependency
     */
    static deserialize(context: ObjectDeserializerContext): ProvideSharedDependency;
}
export default ProvideSharedDependency;
