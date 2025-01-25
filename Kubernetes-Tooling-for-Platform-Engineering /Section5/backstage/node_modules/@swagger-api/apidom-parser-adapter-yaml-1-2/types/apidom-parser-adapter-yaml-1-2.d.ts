import { MediaTypes } from '@swagger-api/apidom-core';
import { Namespace } from '@swagger-api/apidom-core';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { Tree as Tree_2 } from 'web-tree-sitter';
import { Tree as Tree_3 } from 'tree-sitter';

/**
 * @public
 */
export declare const detect: (source: string) => Promise<boolean>;

/**
 * Lexical Analysis of source string using WebTreeSitter.
 * This is WebAssembly version of TreeSitters Lexical Analysis.
 *
 * Given JavaScript doesn't support true parallelism, this
 * code should be as lazy as possible and temporal safety should be fine.
 * @public
 */
export declare const lexicalAnalysis: (source: string) => Promise<Tree_2>;

/**
 * @public
 */
export declare const mediaTypes: YamlMediaTypes;

/**
 * @public
 */
export declare const namespace: Namespace;

/**
 * @public
 */
export declare const parse: ParseFunction;

/**
 * @public
 */
export declare type ParseFunction = (source: string, options?: ParseFunctionOptions) => Promise<ParseResultElement>;

/**
 * @public
 */
export declare interface ParseFunctionOptions {
    sourceMap?: boolean;
}

/**
 * This version of syntactic analysis does following transformations:
 *   `TreeSitter CST -> YAML AST -> ApiDOM`
 * Two traversals passes are needed to get from CST to ApiDOM.
 * @public
 */
export declare const syntacticAnalysis: (cst: Tree, { sourceMap }?: {
    sourceMap?: boolean | undefined;
}) => ParseResultElement;

/**
 * @public
 */
export declare type Tree = Tree_2 | Tree_3;

/**
 * @public
 */
export declare class YamlMediaTypes extends MediaTypes<string> {
    latest(): string;
}

export { }
