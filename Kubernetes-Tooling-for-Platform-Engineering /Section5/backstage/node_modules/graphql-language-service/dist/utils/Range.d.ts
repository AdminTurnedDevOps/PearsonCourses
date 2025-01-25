import { Location } from 'graphql';
import { IRange, IPosition } from '../types';
export declare class Range implements IRange {
    start: IPosition;
    end: IPosition;
    constructor(start: IPosition, end: IPosition);
    setStart(line: number, character: number): void;
    setEnd(line: number, character: number): void;
    containsPosition: (position: IPosition) => boolean;
}
export declare class Position implements IPosition {
    line: number;
    character: number;
    constructor(line: number, character: number);
    setLine(line: number): void;
    setCharacter(character: number): void;
    lessThanOrEqualTo: (position: IPosition) => boolean;
}
export declare function offsetToPosition(text: string, loc: number): Position;
export declare function locToRange(text: string, loc: Location): Range;
//# sourceMappingURL=Range.d.ts.map