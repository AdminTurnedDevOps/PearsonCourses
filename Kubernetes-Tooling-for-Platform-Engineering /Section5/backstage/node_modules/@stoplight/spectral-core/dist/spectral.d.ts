import { IDocument, IParsedResult } from './document';
import type { IConstructorOpts, IRunOpts, ISpectralDiagnostic, ISpectralFullResult } from './types';
import type { RulesetDefinition } from './ruleset/index';
import { Ruleset } from './ruleset/ruleset';
export * from './types';
export declare class Spectral {
    protected readonly opts?: IConstructorOpts | undefined;
    private readonly _resolver;
    ruleset?: Ruleset;
    constructor(opts?: IConstructorOpts | undefined);
    protected parseDocument(target: IParsedResult | IDocument | Record<string, unknown> | string): IDocument;
    runWithResolved(target: IParsedResult | IDocument | Record<string, unknown> | string, opts?: IRunOpts): Promise<ISpectralFullResult>;
    run(target: IParsedResult | IDocument | Record<string, unknown> | string, opts?: IRunOpts): Promise<ISpectralDiagnostic[]>;
    setRuleset(ruleset: RulesetDefinition | Ruleset): void;
    private _generateUnrecognizedFormatError;
    private _filterParserErrors;
}
