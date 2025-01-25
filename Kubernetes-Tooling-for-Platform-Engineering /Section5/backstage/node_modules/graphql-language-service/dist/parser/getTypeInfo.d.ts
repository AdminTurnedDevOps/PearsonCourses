import { GraphQLSchema, GraphQLField, GraphQLType } from 'graphql';
import { AllTypeInfo } from '../types';
import { State } from '.';
export declare function getFieldDef(schema: GraphQLSchema, type: GraphQLType, fieldName: string): GraphQLField<any, any> | null | undefined;
export declare function forEachState(stack: State, fn: (state: State) => AllTypeInfo | null | void): void;
export declare function getDefinitionState(tokenState: State): State | null | undefined;
export declare function getTypeInfo(schema: GraphQLSchema, tokenState: State): AllTypeInfo;
//# sourceMappingURL=getTypeInfo.d.ts.map