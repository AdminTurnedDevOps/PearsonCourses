import { EditorContextProviderProps } from './editor';
import { ExecutionContextProviderProps } from './execution';
import { ExplorerContextProviderProps } from './explorer/context';
import { HistoryContextProviderProps } from './history';
import { PluginContextProviderProps } from './plugin';
import { SchemaContextProviderProps } from './schema';
import { StorageContextProviderProps } from './storage';
export declare type GraphiQLProviderProps = EditorContextProviderProps & ExecutionContextProviderProps & ExplorerContextProviderProps & HistoryContextProviderProps & PluginContextProviderProps & SchemaContextProviderProps & StorageContextProviderProps;
export declare function GraphiQLProvider({ children, dangerouslyAssumeSchemaIsValid, defaultQuery, defaultHeaders, defaultTabs, externalFragments, fetcher, getDefaultFieldNames, headers, inputValueDeprecation, introspectionQueryName, maxHistoryLength, onEditOperationName, onSchemaChange, onTabChange, onTogglePluginVisibility, operationName, plugins, query, response, schema, schemaDescription, shouldPersistHeaders, storage, validationRules, variables, visiblePlugin, }: GraphiQLProviderProps): import("react/jsx-runtime").JSX.Element;
