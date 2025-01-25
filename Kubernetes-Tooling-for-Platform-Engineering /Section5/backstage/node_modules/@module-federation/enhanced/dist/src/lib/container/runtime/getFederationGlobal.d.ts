import type RuntimeGlobals from 'webpack/lib/RuntimeGlobals';
import { NormalizedRuntimeInitOptionsWithOutShared } from '../../../types/runtime';
declare const Template: typeof import("webpack").Template;
declare function getFederationGlobal(template: typeof Template, runtimeGlobals: typeof RuntimeGlobals, matcher: string | boolean, rootOutputDir: string | undefined, initOptionsWithoutShared: NormalizedRuntimeInitOptionsWithOutShared): string;
export default getFederationGlobal;
