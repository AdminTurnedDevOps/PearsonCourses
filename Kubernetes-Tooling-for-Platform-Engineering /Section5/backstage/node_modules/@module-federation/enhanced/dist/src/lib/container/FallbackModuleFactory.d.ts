import type { ModuleFactoryCreateData, ModuleFactoryResult } from 'webpack/lib/ModuleFactory';
declare const ModuleFactory: typeof import("webpack/lib/ModuleFactory");
export default class FallbackModuleFactory extends ModuleFactory {
    /**
     * @param {ModuleFactoryCreateData} data data object
     * @param {function((Error | null)=, ModuleFactoryResult=): void} callback callback
     * @returns {void}
     */
    create(data: ModuleFactoryCreateData, callback: (error: Error | null, result?: ModuleFactoryResult) => void): void;
}
export {};
