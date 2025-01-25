import { Segment } from '@stoplight/types';
export declare type MessageVars = {
    property: Segment;
    error: string;
    description: string | null;
    value: unknown;
    path: string;
};
export declare type MessageInterpolator = (str: string, values: MessageVars) => string;
export declare const message: MessageInterpolator;
