import * as _backstage_plugin_scaffolder_node from '@backstage/plugin-scaffolder-node';
import * as _backstage_types from '@backstage/types';
import { ScmIntegrationRegistry } from '@backstage/integration';
import { Config } from '@backstage/config';
import * as _backstage_backend_plugin_api from '@backstage/backend-plugin-api';

/**
 * Creates a new action that initializes a git repository of the content in the workspace
 * and publishes it to Azure.
 * @public
 */
declare function createPublishAzureAction(options: {
    integrations: ScmIntegrationRegistry;
    config: Config;
}): _backstage_plugin_scaffolder_node.TemplateAction<{
    repoUrl: string;
    description?: string | undefined;
    defaultBranch?: string | undefined;
    sourcePath?: string | undefined;
    token?: string | undefined;
    gitCommitMessage?: string | undefined;
    gitAuthorName?: string | undefined;
    gitAuthorEmail?: string | undefined;
}, _backstage_types.JsonObject>;

/**
 * @public
 * The Azure Module for the Scaffolder Backend
 */
declare const azureModule: _backstage_backend_plugin_api.BackendFeature;

export { createPublishAzureAction, azureModule as default };
