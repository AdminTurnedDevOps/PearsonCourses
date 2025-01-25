import type { IPosition } from '@stoplight/types';
import type { ISpectralDiagnostic } from '../../types';
export declare const prepareResults: (results: ISpectralDiagnostic[]) => ISpectralDiagnostic[];
export declare const comparePosition: (left: IPosition, right: IPosition) => -1 | 0 | 1;
export declare const compareResults: (left: ISpectralDiagnostic, right: ISpectralDiagnostic) => -1 | 0 | 1;
export declare const sortResults: (results: ISpectralDiagnostic[]) => ISpectralDiagnostic[];
