import * as _backstage_plugin_scaffolder_node from '@backstage/plugin-scaffolder-node';
import * as _backstage_types from '@backstage/types';
import { ScmIntegrationRegistry } from '@backstage/integration';
import { Config } from '@backstage/config';
import * as _backstage_backend_plugin_api from '@backstage/backend-plugin-api';

/**
 * Creates a new action that initializes a git repository of the content in the workspace
 * and publishes it to Bitbucket Server.
 * @public
 */
declare function createPublishBitbucketServerAction(options: {
    integrations: ScmIntegrationRegistry;
    config: Config;
}): _backstage_plugin_scaffolder_node.TemplateAction<{
    repoUrl: string;
    description?: string | undefined;
    defaultBranch?: string | undefined;
    repoVisibility?: "private" | "public" | undefined;
    sourcePath?: string | undefined;
    enableLFS?: boolean | undefined;
    token?: string | undefined;
    gitCommitMessage?: string | undefined;
    gitAuthorName?: string | undefined;
    gitAuthorEmail?: string | undefined;
}, _backstage_types.JsonObject>;

/**
 * Creates a BitbucketServer Pull Request action.
 * @public
 */
declare function createPublishBitbucketServerPullRequestAction(options: {
    integrations: ScmIntegrationRegistry;
    config: Config;
}): _backstage_plugin_scaffolder_node.TemplateAction<{
    repoUrl: string;
    title: string;
    description?: string | undefined;
    targetBranch?: string | undefined;
    sourceBranch: string;
    reviewers?: string[] | undefined;
    token?: string | undefined;
    gitAuthorName?: string | undefined;
    gitAuthorEmail?: string | undefined;
}, _backstage_types.JsonObject>;

/**
 * @public
 * The Bitbucket Server Module for the Scaffolder Backend
 */
declare const bitbucketServerModule: _backstage_backend_plugin_api.BackendFeature;

export { createPublishBitbucketServerAction, createPublishBitbucketServerPullRequestAction, bitbucketServerModule as default };
