import { Storage, StorageAPI } from '@graphiql/toolkit';
import { ReactNode } from 'react';
export declare type StorageContextType = StorageAPI;
export declare const StorageContext: import("react").Context<StorageAPI | null>;
export declare type StorageContextProviderProps = {
    children: ReactNode;
    /**
     * Provide a custom storage API.
     * @default `localStorage``
     * @see {@link https://graphiql-test.netlify.app/typedoc/modules/graphiql_toolkit.html#storage-2|API docs}
     * for details on the required interface.
     */
    storage?: Storage;
};
export declare function StorageContextProvider(props: StorageContextProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const useStorageContext: {
    (options: {
        nonNull: true;
        caller?: Function | undefined;
    }): StorageAPI;
    (options: {
        nonNull?: boolean | undefined;
        caller?: Function | undefined;
    }): StorageAPI | null;
    (): StorageAPI | null;
};
