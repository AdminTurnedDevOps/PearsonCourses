/// <reference types="node" />
import * as _backstage_backend_plugin_api from '@backstage/backend-plugin-api';
import { TemplateAction, TaskBroker, TemplateFilter, TemplateGlobal } from '@backstage/plugin-scaffolder-node';

/**
 * Serializes provided path into tar archive
 *
 * @alpha
 */
declare const serializeWorkspace: (opts: {
    path: string;
}) => Promise<{
    contents: Buffer;
}>;
/**
 * Rehydrates the provided buffer of tar archive into the provide destination path
 *
 * @alpha
 */
declare const restoreWorkspace: (opts: {
    path: string;
    buffer?: Buffer;
}) => Promise<void>;

/**
 * Extension point for managing scaffolder actions.
 *
 * @alpha
 */
interface ScaffolderActionsExtensionPoint {
    addActions(...actions: TemplateAction<any, any>[]): void;
}
/**
 * Extension point for managing scaffolder actions.
 *
 * @alpha
 */
declare const scaffolderActionsExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<ScaffolderActionsExtensionPoint>;
/**
 * Extension point for replacing the scaffolder task broker.
 *
 * @alpha
 */
interface ScaffolderTaskBrokerExtensionPoint {
    setTaskBroker(taskBroker: TaskBroker): void;
}
/**
 * Extension point for replacing the scaffolder task broker.
 *
 * @alpha
 */
declare const scaffolderTaskBrokerExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<ScaffolderTaskBrokerExtensionPoint>;
/**
 * Extension point for adding template filters and globals.
 *
 * @alpha
 */
interface ScaffolderTemplatingExtensionPoint {
    addTemplateFilters(filters: Record<string, TemplateFilter>): void;
    addTemplateGlobals(filters: Record<string, TemplateGlobal>): void;
}
/**
 * Extension point for adding template filters and globals.
 *
 * @alpha
 */
declare const scaffolderTemplatingExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<ScaffolderTemplatingExtensionPoint>;
/**
 * Autocomplete handler for the scaffolder.
 * @alpha
 */
type AutocompleteHandler = ({ resource, token, context, }: {
    resource: string;
    token: string;
    context: Record<string, string>;
}) => Promise<{
    results: {
        title?: string;
        id: string;
    }[];
}>;
/**
 * Extension point for adding autocomplete handler providers
 * @alpha
 */
interface ScaffolderAutocompleteExtensionPoint {
    addAutocompleteProvider({ id, handler, }: {
        id: string;
        handler: AutocompleteHandler;
    }): void;
}
/**
 * Extension point for adding autocomplete handlers.
 *
 * @alpha
 */
declare const scaffolderAutocompleteExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<ScaffolderAutocompleteExtensionPoint>;
/**
 * This provider has to be implemented to make it possible to serialize/deserialize scaffolder workspace.
 *
 * @alpha
 */
interface WorkspaceProvider {
    serializeWorkspace({ path, taskId, }: {
        path: string;
        taskId: string;
    }): Promise<void>;
    cleanWorkspace(options: {
        taskId: string;
    }): Promise<void>;
    rehydrateWorkspace(options: {
        taskId: string;
        targetPath: string;
    }): Promise<void>;
}
/**
 * Extension point for adding workspace providers.
 *
 * @alpha
 */
interface ScaffolderWorkspaceProviderExtensionPoint {
    addProviders(providers: Record<string, WorkspaceProvider>): void;
}
/**
 * Extension point for adding workspace providers.
 *
 * @alpha
 */
declare const scaffolderWorkspaceProviderExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<ScaffolderWorkspaceProviderExtensionPoint>;

export { type AutocompleteHandler, type ScaffolderActionsExtensionPoint, type ScaffolderAutocompleteExtensionPoint, type ScaffolderTaskBrokerExtensionPoint, type ScaffolderTemplatingExtensionPoint, type ScaffolderWorkspaceProviderExtensionPoint, type WorkspaceProvider, restoreWorkspace, scaffolderActionsExtensionPoint, scaffolderAutocompleteExtensionPoint, scaffolderTaskBrokerExtensionPoint, scaffolderTemplatingExtensionPoint, scaffolderWorkspaceProviderExtensionPoint, serializeWorkspace };
