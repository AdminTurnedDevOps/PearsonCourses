import { DocumentNode, FragmentDefinitionNode, GraphQLSchema, SourceLocation, ValidationRule } from 'graphql';
import { DiagnosticSeverity, Diagnostic } from 'vscode-languageserver-types';
import { IRange } from '../types';
export declare const SEVERITY: {
    readonly Error: "Error";
    readonly Warning: "Warning";
    readonly Information: "Information";
    readonly Hint: "Hint";
};
export declare type Severity = typeof SEVERITY;
export declare type SeverityEnum = keyof Severity;
export declare const DIAGNOSTIC_SEVERITY: {
    Error: DiagnosticSeverity;
    Warning: DiagnosticSeverity;
    Information: DiagnosticSeverity;
    Hint: DiagnosticSeverity;
};
export declare function getDiagnostics(query: string, schema?: GraphQLSchema | null | undefined, customRules?: Array<ValidationRule>, isRelayCompatMode?: boolean, externalFragments?: FragmentDefinitionNode[] | string): Array<Diagnostic>;
export declare function validateQuery(ast: DocumentNode, schema?: GraphQLSchema | null | undefined, customRules?: Array<ValidationRule> | null, isRelayCompatMode?: boolean): Array<Diagnostic>;
export declare function getRange(location: SourceLocation, queryText: string): IRange;
//# sourceMappingURL=getDiagnostics.d.ts.map