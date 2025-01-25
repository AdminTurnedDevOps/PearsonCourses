import { DiagnosticSeverity } from '@stoplight/types';
import { HumanReadableDiagnosticSeverity } from '../types';
export declare const DEFAULT_SEVERITY_LEVEL = DiagnosticSeverity.Warning;
export declare function getDiagnosticSeverity(severity: DiagnosticSeverity | HumanReadableDiagnosticSeverity): DiagnosticSeverity | -1;
