import { JsonParserResult } from '@stoplight/json';
import { IParser } from './types';
export { JsonParserResult };
export declare const parseJson: (input: string) => JsonParserResult<unknown>;
export declare const Json: IParser<JsonParserResult<unknown>>;
