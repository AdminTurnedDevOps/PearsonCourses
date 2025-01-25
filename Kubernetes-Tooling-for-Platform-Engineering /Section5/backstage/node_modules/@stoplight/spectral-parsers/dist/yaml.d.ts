import type { YamlParserResult as _YamlParserResult } from '@stoplight/yaml';
import type { IParser } from './types';
export declare type YamlParserResult<T> = Omit<_YamlParserResult<T>, 'comments'>;
export declare const parseYaml: (input: string) => YamlParserResult<unknown>;
export declare const Yaml: IParser<YamlParserResult<unknown>>;
