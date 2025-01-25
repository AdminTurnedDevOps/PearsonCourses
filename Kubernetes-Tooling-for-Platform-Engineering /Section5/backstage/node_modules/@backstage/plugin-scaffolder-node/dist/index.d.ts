/// <reference types="node" />
import { Logger } from 'winston';
import { Writable } from 'stream';
import { JsonObject, JsonValue, Observable } from '@backstage/types';
import { BackstageCredentials, UrlReaderService } from '@backstage/backend-plugin-api';
import { TaskSpec, TemplateInfo } from '@backstage/plugin-scaffolder-common';
import { UserEntity } from '@backstage/catalog-model';
import { Schema } from 'jsonschema';
import { z } from 'zod';
import { SpawnOptionsWithoutStdio } from 'child_process';
import { ScmIntegrations, ScmIntegrationRegistry } from '@backstage/integration';

/**
 * TaskSecrets
 *
 * @public
 */
type TaskSecrets = Record<string, string> & {
    backstageToken?: string;
};
/**
 * The status of each step of the Task
 *
 * @public
 */
type TaskStatus = 'cancelled' | 'completed' | 'failed' | 'open' | 'processing';
/**
 * The state of a completed task.
 *
 * @public
 */
type TaskCompletionState = 'failed' | 'completed';
/**
 * SerializedTask
 *
 * @public
 */
type SerializedTask = {
    id: string;
    spec: TaskSpec;
    status: TaskStatus;
    createdAt: string;
    lastHeartbeatAt?: string;
    createdBy?: string;
    secrets?: TaskSecrets;
    state?: JsonObject;
};
/**
 * TaskEventType
 *
 * @public
 */
type TaskEventType = 'completion' | 'log' | 'cancelled' | 'recovered';
/**
 * SerializedTaskEvent
 *
 * @public
 */
type SerializedTaskEvent = {
    id: number;
    isTaskRecoverable?: boolean;
    taskId: string;
    body: JsonObject;
    type: TaskEventType;
    createdAt: string;
};
/**
 * The result of {@link TaskBroker.dispatch}
 *
 * @public
 */
type TaskBrokerDispatchResult = {
    taskId: string;
};
/**
 * The options passed to {@link TaskBroker.dispatch}
 * Currently a spec and optional secrets
 *
 * @public
 */
type TaskBrokerDispatchOptions = {
    spec: TaskSpec;
    secrets?: TaskSecrets;
    createdBy?: string;
};
/**
 * Task
 *
 * @public
 */
interface TaskContext {
    cancelSignal: AbortSignal;
    spec: TaskSpec;
    secrets?: TaskSecrets;
    createdBy?: string;
    done: boolean;
    isDryRun?: boolean;
    complete(result: TaskCompletionState, metadata?: JsonObject): Promise<void>;
    emitLog(message: string, logMetadata?: JsonObject): Promise<void>;
    getTaskState?(): Promise<{
        state?: JsonObject;
    } | undefined>;
    updateCheckpoint?(options: {
        key: string;
        status: 'success';
        value: JsonValue;
    } | {
        key: string;
        status: 'failed';
        reason: string;
    }): Promise<void>;
    serializeWorkspace?(options: {
        path: string;
    }): Promise<void>;
    cleanWorkspace?(): Promise<void>;
    rehydrateWorkspace?(options: {
        taskId: string;
        targetPath: string;
    }): Promise<void>;
    getWorkspaceName(): Promise<string>;
    getInitiatorCredentials(): Promise<BackstageCredentials>;
}
/**
 * TaskBroker
 *
 * @public
 */
interface TaskBroker {
    cancel?(taskId: string): Promise<void>;
    retry?(taskId: string): Promise<void>;
    claim(): Promise<TaskContext>;
    recoverTasks?(): Promise<void>;
    dispatch(options: TaskBrokerDispatchOptions): Promise<TaskBrokerDispatchResult>;
    vacuumTasks(options: {
        timeoutS: number;
    }): Promise<void>;
    event$(options: {
        taskId: string;
        after: number | undefined;
    }): Observable<{
        events: SerializedTaskEvent[];
    }>;
    get(taskId: string): Promise<SerializedTask>;
    list?(options?: {
        filters?: {
            createdBy?: string | string[];
            status?: TaskStatus | TaskStatus[];
        };
        pagination?: {
            limit?: number;
            offset?: number;
        };
        order?: {
            order: 'asc' | 'desc';
            field: string;
        }[];
    }): Promise<{
        tasks: SerializedTask[];
        totalTasks?: number;
    }>;
    /**
     * @deprecated Make sure to pass `createdBy` and `status` in the `filters` parameter instead
     */
    list?(options: {
        createdBy?: string;
        status?: TaskStatus;
    }): Promise<{
        tasks: SerializedTask[];
        totalTasks?: number;
    }>;
}

/**
 * ActionContext is passed into scaffolder actions.
 * @public
 */
type ActionContext<TActionInput extends JsonObject, TActionOutput extends JsonObject = JsonObject> = {
    logger: Logger;
    /** @deprecated - use `ctx.logger` instead */
    logStream: Writable;
    secrets?: TaskSecrets;
    workspacePath: string;
    input: TActionInput;
    checkpoint<T extends JsonValue | void>(opts: {
        key: string;
        fn: () => Promise<T> | T;
    }): Promise<T>;
    output(name: keyof TActionOutput, value: TActionOutput[keyof TActionOutput]): void;
    /**
     * Creates a temporary directory for use by the action, which is then cleaned up automatically.
     */
    createTemporaryDirectory(): Promise<string>;
    /**
     * Get the credentials for the current request
     */
    getInitiatorCredentials(): Promise<BackstageCredentials>;
    templateInfo?: TemplateInfo;
    /**
     * Whether this action invocation is a dry-run or not.
     * This will only ever be true if the actions as marked as supporting dry-runs.
     */
    isDryRun?: boolean;
    /**
     * The user which triggered the action.
     */
    user?: {
        /**
         * The decorated entity from the Catalog
         */
        entity?: UserEntity;
        /**
         * An entity ref for the author of the task
         */
        ref?: string;
    };
    /**
     * Implement the signal to make your custom step abortable https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal
     */
    signal?: AbortSignal;
    /**
     * Optional value of each invocation
     */
    each?: JsonObject;
};
/** @public */
type TemplateAction<TActionInput extends JsonObject = JsonObject, TActionOutput extends JsonObject = JsonObject> = {
    id: string;
    description?: string;
    examples?: {
        description: string;
        example: string;
    }[];
    supportsDryRun?: boolean;
    schema?: {
        input?: Schema;
        output?: Schema;
    };
    handler: (ctx: ActionContext<TActionInput, TActionOutput>) => Promise<void>;
};

/** @public */
type TemplateExample = {
    description: string;
    example: string;
};
/** @public */
type TemplateActionOptions<TActionInput extends JsonObject = {}, TActionOutput extends JsonObject = {}, TInputSchema extends Schema | z.ZodType = {}, TOutputSchema extends Schema | z.ZodType = {}> = {
    id: string;
    description?: string;
    examples?: TemplateExample[];
    supportsDryRun?: boolean;
    schema?: {
        input?: TInputSchema;
        output?: TOutputSchema;
    };
    handler: (ctx: ActionContext<TActionInput, TActionOutput>) => Promise<void>;
};
/**
 * This function is used to create new template actions to get type safety.
 * Will convert zod schemas to json schemas for use throughout the system.
 * @public
 */
declare const createTemplateAction: <TInputParams extends JsonObject = JsonObject, TOutputParams extends JsonObject = JsonObject, TInputSchema extends z.ZodType<any, z.ZodTypeDef, any> | Schema = {}, TOutputSchema extends z.ZodType<any, z.ZodTypeDef, any> | Schema = {}, TActionInput extends JsonObject = TInputSchema extends z.ZodType<any, any, infer IReturn> ? IReturn : TInputParams, TActionOutput extends JsonObject = TOutputSchema extends z.ZodType<any, any, infer IReturn_1> ? IReturn_1 : TOutputParams>(action: TemplateActionOptions<TActionInput, TActionOutput, TInputSchema, TOutputSchema>) => TemplateAction<TActionInput, TActionOutput>;

/**
 * Options for {@link executeShellCommand}.
 *
 * @public
 */
type ExecuteShellCommandOptions = {
    /** command to run */
    command: string;
    /** arguments to pass the command */
    args: string[];
    /** options to pass to spawn */
    options?: SpawnOptionsWithoutStdio;
    /** stream to capture stdout and stderr output */
    logStream?: Writable;
};
/**
 * Run a command in a sub-process, normally a shell command.
 *
 * @public
 */
declare function executeShellCommand(options: ExecuteShellCommandOptions): Promise<void>;

/**
 * A helper function that reads the contents of a directory from the given URL.
 * Can be used in your own actions, and also used behind fetch:template and fetch:plain
 *
 * @public
 */
declare function fetchContents(options: {
    reader: UrlReaderService;
    integrations: ScmIntegrations;
    baseUrl?: string;
    fetchUrl?: string;
    outputPath: string;
    token?: string;
}): Promise<void>;
/**
 * A helper function that reads the content of a single file from the given URL.
 * Can be used in your own actions, and also used behind `fetch:plain:file`
 *
 * @public
 */
declare function fetchFile(options: {
    reader: UrlReaderService;
    integrations: ScmIntegrations;
    baseUrl?: string;
    fetchUrl?: string;
    outputPath: string;
    token?: string;
}): Promise<void>;

/**
 * @public
 */
declare function initRepoAndPush(input: {
    dir: string;
    remoteUrl: string;
    auth: {
        username: string;
        password: string;
    } | {
        token: string;
    };
    logger: Logger;
    defaultBranch?: string;
    commitMessage?: string;
    gitAuthorInfo?: {
        name?: string;
        email?: string;
    };
}): Promise<{
    commitHash: string;
}>;
/**
 * @public
 */
declare function commitAndPushRepo(input: {
    dir: string;
    auth: {
        username: string;
        password: string;
    } | {
        token: string;
    };
    logger: Logger;
    commitMessage: string;
    gitAuthorInfo?: {
        name?: string;
        email?: string;
    };
    branch?: string;
    remoteRef?: string;
}): Promise<{
    commitHash: string;
}>;
/**
 * @public
 */
declare function cloneRepo(options: {
    url: string;
    dir: string;
    auth: {
        username: string;
        password: string;
    } | {
        token: string;
    };
    logger?: Logger | undefined;
    ref?: string | undefined;
    depth?: number | undefined;
    noCheckout?: boolean | undefined;
}): Promise<void>;
/**
 * @public
 */
declare function createBranch(options: {
    dir: string;
    ref: string;
    auth: {
        username: string;
        password: string;
    } | {
        token: string;
    };
    logger?: Logger | undefined;
}): Promise<void>;
/**
 * @public
 */
declare function addFiles(options: {
    dir: string;
    filepath: string;
    auth: {
        username: string;
        password: string;
    } | {
        token: string;
    };
    logger?: Logger | undefined;
}): Promise<void>;
/**
 * @public
 */
declare function commitAndPushBranch(options: {
    dir: string;
    auth: {
        username: string;
        password: string;
    } | {
        token: string;
    };
    logger?: Logger | undefined;
    commitMessage: string;
    gitAuthorInfo?: {
        name?: string;
        email?: string;
    };
    branch?: string;
    remoteRef?: string;
    remote?: string;
}): Promise<{
    commitHash: string;
}>;

/**
 * @public
 */
declare const getRepoSourceDirectory: (workspacePath: string, sourcePath: string | undefined) => string;
/**
 * @public
 */
declare const parseRepoUrl: (repoUrl: string, integrations: ScmIntegrationRegistry) => {
    repo: string;
    host: string;
    owner?: string | undefined;
    organization?: string | undefined;
    workspace?: string | undefined;
    project?: string | undefined;
};

/**
 * @public
 */
interface SerializedFile {
    path: string;
    content: Buffer;
    executable?: boolean;
    symlink?: boolean;
}

/**
 * @public
 */
declare function serializeDirectoryContents(sourcePath: string, options?: {
    gitignore?: boolean;
    globPatterns?: string[];
}): Promise<SerializedFile[]>;

/**
 * Deserializes a list of serialized files into the target directory.
 *
 * This method uses `resolveSafeChildPath` to make sure that files are
 * not written outside of the target directory.
 *
 * @public
 */
declare function deserializeDirectoryContents(targetPath: string, files: SerializedFile[]): Promise<void>;

/** @public */
type TemplateFilter = (...args: JsonValue[]) => JsonValue | undefined;
/** @public */
type TemplateGlobal = ((...args: JsonValue[]) => JsonValue | undefined) | JsonValue;

export { type ActionContext, type ExecuteShellCommandOptions, type SerializedFile, type SerializedTask, type SerializedTaskEvent, type TaskBroker, type TaskBrokerDispatchOptions, type TaskBrokerDispatchResult, type TaskCompletionState, type TaskContext, type TaskEventType, type TaskSecrets, type TaskStatus, type TemplateAction, type TemplateActionOptions, type TemplateExample, type TemplateFilter, type TemplateGlobal, addFiles, cloneRepo, commitAndPushBranch, commitAndPushRepo, createBranch, createTemplateAction, deserializeDirectoryContents, executeShellCommand, fetchContents, fetchFile, getRepoSourceDirectory, initRepoAndPush, parseRepoUrl, serializeDirectoryContents };
