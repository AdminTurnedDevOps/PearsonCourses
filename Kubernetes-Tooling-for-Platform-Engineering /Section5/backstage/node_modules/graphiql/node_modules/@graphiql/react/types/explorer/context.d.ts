import type { GraphQLArgument, GraphQLField, GraphQLInputField, GraphQLNamedType } from 'graphql';
import { ReactNode } from 'react';
export declare type ExplorerFieldDef = GraphQLField<{}, {}, {}> | GraphQLInputField | GraphQLArgument;
export declare type ExplorerNavStackItem = {
    /**
     * The name of the item.
     */
    name: string;
    /**
     * The definition object of the item, this can be a named type, a field, an
     * input field or an argument.
     */
    def?: GraphQLNamedType | ExplorerFieldDef;
};
export declare type ExplorerNavStack = [
    ExplorerNavStackItem,
    ...ExplorerNavStackItem[]
];
export declare type ExplorerContextType = {
    /**
     * A stack of navigation items. The last item in the list is the current one.
     * This list always contains at least one item.
     */
    explorerNavStack: ExplorerNavStack;
    /**
     * Push an item to the navigation stack.
     * @param item The item that should be pushed to the stack.
     */
    push(item: ExplorerNavStackItem): void;
    /**
     * Pop the last item from the navigation stack.
     */
    pop(): void;
    /**
     * Reset the navigation stack to its initial state, this will remove all but
     * the initial stack item.
     */
    reset(): void;
};
export declare const ExplorerContext: import("react").Context<ExplorerContextType | null>;
export declare type ExplorerContextProviderProps = {
    children: ReactNode;
};
export declare function ExplorerContextProvider(props: ExplorerContextProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const useExplorerContext: {
    (options: {
        nonNull: true;
        caller?: Function | undefined;
    }): ExplorerContextType;
    (options: {
        nonNull?: boolean | undefined;
        caller?: Function | undefined;
    }): ExplorerContextType | null;
    (): ExplorerContextType | null;
};
