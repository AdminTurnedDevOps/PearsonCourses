import { JsonPath, Optional } from '@stoplight/types';
export interface ILintTarget {
    path: JsonPath;
    value: unknown;
}
export declare const getLintTargets: (targetValue: unknown, field: Optional<string>) => ILintTarget[];
