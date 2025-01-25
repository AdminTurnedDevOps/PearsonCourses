import { GraphQLNamedType, GraphQLType } from 'graphql';
import { ExplorerContextType, ExplorerNavStackItem } from '../../context';
export declare function mockExplorerContextValue(navStackItem: ExplorerNavStackItem): ExplorerContextType;
export declare function unwrapType(type: GraphQLType): GraphQLNamedType;
