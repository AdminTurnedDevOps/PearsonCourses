import { IPosition as TPosition } from '../types';
import { ASTNode } from 'graphql';
export declare function getASTNodeAtPosition(query: string, ast: ASTNode, point: TPosition): ASTNode | undefined;
export declare function pointToOffset(text: string, point: TPosition): number;
//# sourceMappingURL=getASTNodeAtPosition.d.ts.map