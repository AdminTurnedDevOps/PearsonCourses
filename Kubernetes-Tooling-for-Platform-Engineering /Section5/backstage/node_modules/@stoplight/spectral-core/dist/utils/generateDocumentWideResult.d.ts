import { DiagnosticSeverity } from '@stoplight/types';
import { IDocument } from '../document';
import { IRuleResult } from '../types/spectral';
export declare const generateDocumentWideResult: (document: IDocument, message: string, severity: DiagnosticSeverity, code: string | number) => IRuleResult;
