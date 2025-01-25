import * as _backstage_plugin_scaffolder_node from '@backstage/plugin-scaffolder-node';
import * as _backstage_types from '@backstage/types';
import { ScmIntegrationRegistry } from '@backstage/integration';
import { Config } from '@backstage/config';
import * as _backstage_backend_plugin_api from '@backstage/backend-plugin-api';

/**
 * Creates a new action that initializes a git repository of the content in the workspace
 * and publishes it to Bitbucket Cloud.
 * @public
 */
declare function createPublishBitbucketCloudAction(options: {
    integrations: ScmIntegrationRegistry;
    config: Config;
}): _backstage_plugin_scaffolder_node.TemplateAction<{
    repoUrl: string;
    description?: string | undefined;
    defaultBranch?: string | undefined;
    repoVisibility?: "private" | "public" | undefined;
    gitCommitMessage?: string | undefined;
    sourcePath?: string | undefined;
    token?: string | undefined;
}, _backstage_types.JsonObject>;

/**
 * Creates a new action that triggers a run of a bitbucket pipeline
 *
 * @public
 */
declare const createBitbucketPipelinesRunAction: (options: {
    integrations: ScmIntegrationRegistry;
}) => _backstage_plugin_scaffolder_node.TemplateAction<{
    workspace: string;
    repo_slug: string;
    body?: object | undefined;
    token?: string | undefined;
}, _backstage_types.JsonObject>;

/**
 * Creates a Bitbucket Cloud Pull Request action.
 * @public
 */
declare function createPublishBitbucketCloudPullRequestAction(options: {
    integrations: ScmIntegrationRegistry;
    config: Config;
}): _backstage_plugin_scaffolder_node.TemplateAction<{
    repoUrl: string;
    title: string;
    description?: string | undefined;
    targetBranch?: string | undefined;
    sourceBranch: string;
    token?: string | undefined;
    gitAuthorName?: string | undefined;
    gitAuthorEmail?: string | undefined;
}, _backstage_types.JsonObject>;

/**
 * @public
 * The Bitbucket Cloud Module for the Scaffolder Backend
 */
declare const bitbucketCloudModule: _backstage_backend_plugin_api.BackendFeature;

export { createBitbucketPipelinesRunAction, createPublishBitbucketCloudAction, createPublishBitbucketCloudPullRequestAction, bitbucketCloudModule as default };
