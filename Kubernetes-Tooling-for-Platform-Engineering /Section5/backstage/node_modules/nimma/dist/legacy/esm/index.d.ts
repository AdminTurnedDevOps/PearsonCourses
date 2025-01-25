import type Fallback from './codegen/fallback';

export type Callback = (scope: EmittedScope) => void;

type JsonPath = (string | number)[];
type Input = Record<string, unknown> | unknown[];

export type EmittedScope = {
  readonly path: JsonPath;
  readonly value: unknown;
};

declare class Nimma {
  public readonly sourceCode: string;

  constructor(
    expressions: string[],
    opts?: {
      customShorthands: Record<string, string> | null;
      fallback: Fallback | null;
      unsafe: boolean;
      output: 'ES2018' | 'ES2021' | 'auto';
    },
  ): Nimma;

  public query(input: Input, callbacks: Record<string, Callback>): void;
}

export default Nimma;
