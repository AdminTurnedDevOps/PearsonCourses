import { IDiagnostic } from '@stoplight/types';
import { IDocument } from './document';
import { IRuleResult } from './types';
import { ResolveError } from '@stoplight/spectral-ref-resolver';
export declare function getDiagnosticErrorMessage(diagnostic: IDiagnostic): string;
export declare const prettyPrintResolverErrorMessage: (message: string) => string;
export declare function formatParserDiagnostics(diagnostics: ReadonlyArray<IDiagnostic>, source: string | null): IRuleResult[];
export declare const formatResolverErrors: (document: IDocument, diagnostics: ResolveError[]) => IRuleResult[];
