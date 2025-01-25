import * as _backstage_plugin_scaffolder_node from '@backstage/plugin-scaffolder-node';
import * as _backstage_types from '@backstage/types';
import { Config } from '@backstage/config';
import { ScmIntegrationRegistry } from '@backstage/integration';
import * as _backstage_backend_plugin_api from '@backstage/backend-plugin-api';

/**
 * Creates a new action that initializes a git repository of the content in the workspace
 * and publishes it to a Gerrit instance.
 * @public
 */
declare function createPublishGerritAction(options: {
    integrations: ScmIntegrationRegistry;
    config: Config;
}): _backstage_plugin_scaffolder_node.TemplateAction<{
    repoUrl: string;
    description: string;
    defaultBranch?: string | undefined;
    gitCommitMessage?: string | undefined;
    gitAuthorName?: string | undefined;
    gitAuthorEmail?: string | undefined;
    sourcePath?: string | undefined;
}, _backstage_types.JsonObject>;

/**
 * Creates a new action that creates a Gerrit review
 * @public
 */
declare function createPublishGerritReviewAction(options: {
    integrations: ScmIntegrationRegistry;
    config: Config;
}): _backstage_plugin_scaffolder_node.TemplateAction<{
    repoUrl: string;
    branch?: string | undefined;
    sourcePath?: string | undefined;
    gitCommitMessage?: string | undefined;
    gitAuthorName?: string | undefined;
    gitAuthorEmail?: string | undefined;
}, _backstage_types.JsonObject>;

/**
 * @public
 * The Gerrit Module for the Scaffolder Backend
 */
declare const gerritModule: _backstage_backend_plugin_api.BackendFeature;

export { createPublishGerritAction, createPublishGerritReviewAction, gerritModule as default };
