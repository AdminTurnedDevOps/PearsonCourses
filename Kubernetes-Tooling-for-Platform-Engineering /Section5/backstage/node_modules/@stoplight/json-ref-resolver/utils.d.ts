import * as URI from 'urijs';
import { ExtendedURI } from './uri';
export declare const addToJSONPointer: (pointer: string, part: string) => string;
export declare const uriToJSONPointer: (uri: URI | ExtendedURI) => string;
export declare const uriIsJSONPointer: (ref: URI | ExtendedURI) => boolean;
