import type { Format } from '@stoplight/spectral-core';
export declare class Formats extends Map<string, Format> {
    filterByMajorVersions(majorsToInclude: string[]): Formats;
    excludeByVersions(versionsToExclude: string[]): Formats;
    find(version: string): Format | undefined;
    formats(): Format[];
}
export declare const AsyncAPIFormats: Formats;
