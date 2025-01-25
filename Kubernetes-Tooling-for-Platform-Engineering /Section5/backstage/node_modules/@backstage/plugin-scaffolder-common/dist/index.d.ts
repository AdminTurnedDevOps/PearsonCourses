import { EntityMeta, UserEntity, Entity, KindValidator } from '@backstage/catalog-model';
import { JsonObject, JsonArray, JsonValue } from '@backstage/types';

/**
 * Information about a template that is stored on a task specification.
 * Includes a stringified entityRef, and the baseUrl which is usually the relative path of the template definition
 *
 * @public
 */
type TemplateInfo = {
    /**
     * The entityRef of the template
     */
    entityRef: string;
    /**
     * Where the template is stored, so we can resolve relative paths for things like `fetch:template` paths.
     */
    baseUrl?: string;
    /**
     * the Template entity
     */
    entity?: {
        /**
         * The metadata of the Template
         */
        metadata: EntityMeta;
    };
};
/**
 *
 * none - not recover, let the task be marked as failed
 * startOver - do recover, start the execution of the task from the first step.
 *
 * @public
 */
type TaskRecoverStrategy = 'none' | 'startOver';
/**
 * When task didn't have a chance to complete due to system restart you can define the strategy what to do with such tasks,
 * by defining a strategy.
 *
 * By default, it is none, what means to not recover but updating the status from 'processing' to 'failed'.
 *
 * @public
 */
interface TaskRecovery {
    /**
     * Depends on how you designed your task you might tailor the behaviour for each of them.
     */
    EXPERIMENTAL_strategy?: TaskRecoverStrategy;
}
/**
 * An individual step of a scaffolder task, as stored in the database.
 *
 * @public
 */
interface TaskStep {
    /**
     * A unique identifier for this step.
     */
    id: string;
    /**
     * A display name to show the user.
     */
    name: string;
    /**
     * The underlying action ID that will be called as part of running this step.
     */
    action: string;
    /**
     * Additional data that will be passed to the action.
     */
    input?: JsonObject;
    /**
     * When this is false, or if the templated value string evaluates to something that is falsy the step will be skipped.
     */
    if?: string | boolean;
    /**
     * Run step repeatedly
     */
    each?: string | JsonArray;
}
/**
 * A scaffolder task as stored in the database, generated from a v1beta3
 * apiVersion Template.
 *
 * @public
 */
interface TaskSpecV1beta3 {
    /**
     * The apiVersion string of the TaskSpec.
     */
    apiVersion: 'scaffolder.backstage.io/v1beta3';
    /**
     * This is a JSONSchema which is used to render a form in the frontend
     * to collect user input and validate it against that schema. This can then be used in the `steps` part below to template
     * variables passed from the user into each action in the template.
     */
    parameters: JsonObject;
    /**
     * A list of steps to be executed in sequence which are defined by the template. These steps are a list of the underlying
     * javascript action and some optional input parameters that may or may not have been collected from the end user.
     */
    steps: TaskStep[];
    /**
     * The output is an object where template authors can pull out information from template actions and return them in a known standard way.
     */
    output: {
        [name: string]: JsonValue;
    };
    /**
     * Some information about the template that is stored on the task spec.
     */
    templateInfo?: TemplateInfo;
    /**
     * Some decoration of the author of the task that should be available in the context
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
     * How to recover the task after system restart or system crash.
     */
    EXPERIMENTAL_recovery?: TaskRecovery;
}
/**
 * A scaffolder task as stored in the database, generated from a Template.
 *
 * @public
 */
type TaskSpec = TaskSpecV1beta3;

/**
 * Backstage catalog Template kind Entity. Templates are used by the Scaffolder
 * plugin to create new entities, such as Components.
 *
 * @public
 */
interface TemplateEntityV1beta3 extends Entity {
    /**
     * The apiVersion string of the TaskSpec.
     */
    apiVersion: 'scaffolder.backstage.io/v1beta3';
    /**
     * The kind of the entity
     */
    kind: 'Template';
    /**
     * The specification of the Template Entity
     */
    spec: {
        /**
         * The type that the Template will create. For example service, website or library.
         */
        type: string;
        /**
         * Template specific configuration of the presentation layer.
         */
        presentation?: TemplatePresentationV1beta3;
        /**
         * Recovery strategy for the template
         */
        EXPERIMENTAL_recovery?: TemplateRecoveryV1beta3;
        /**
         * Form hooks to be run
         */
        EXPERIMENTAL_formDecorators?: {
            id: string;
            input?: JsonObject;
        }[];
        /**
         * This is a JSONSchema or an array of JSONSchema's which is used to render a form in the frontend
         * to collect user input and validate it against that schema. This can then be used in the `steps` part below to template
         * variables passed from the user into each action in the template.
         */
        parameters?: TemplateParametersV1beta3 | TemplateParametersV1beta3[];
        /**
         * A list of steps to be executed in sequence which are defined by the template. These steps are a list of the underlying
         * javascript action and some optional input parameters that may or may not have been collected from the end user.
         */
        steps: Array<TemplateEntityStepV1beta3>;
        /**
         * The output is an object where template authors can pull out information from template actions and return them in a known standard way.
         */
        output?: {
            [name: string]: string;
        };
        /**
         * The owner entityRef of the TemplateEntity
         */
        owner?: string;
    };
}
/**
 * Depends on how you designed your task you might tailor the behaviour for each of them.
 *
 * @public
 */
interface TemplateRecoveryV1beta3 extends JsonObject {
    /**
     *
     * none - not recover, let the task be marked as failed
     * startOver - do recover, start the execution of the task from the first step.
     *
     * @public
     */
    EXPERIMENTAL_strategy?: 'none' | 'startOver';
}
/**
 * The presentation of the template.
 *
 * @public
 */
interface TemplatePresentationV1beta3 extends JsonObject {
    /**
     * Overrides default buttons' text
     */
    buttonLabels?: {
        /**
         * The text for the button which leads to the previous template page
         */
        backButtonText?: string;
        /**
         * The text for the button which starts the execution of the template
         */
        createButtonText?: string;
        /**
         * The text for the button which opens template's review/summary
         */
        reviewButtonText?: string;
    };
}
/**
 * Step that is part of a Template Entity.
 *
 * @public
 */
interface TemplateEntityStepV1beta3 extends JsonObject {
    id?: string;
    name?: string;
    action: string;
    input?: JsonObject;
    if?: string | boolean;
    'backstage:permissions'?: TemplatePermissionsV1beta3;
}
/**
 * Parameter that is part of a Template Entity.
 *
 * @public
 */
interface TemplateParametersV1beta3 extends JsonObject {
    'backstage:permissions'?: TemplatePermissionsV1beta3;
}
/**
 *  Access control properties for parts of a template.
 *
 * @public
 */
interface TemplatePermissionsV1beta3 extends JsonObject {
    tags?: string[];
}
/**
 * Entity data validator for {@link TemplateEntityV1beta3}.
 *
 * @public
 */
declare const templateEntityV1beta3Validator: KindValidator;
/**
 * Typeguard for filtering entities and ensuring v1beta3 entities
 * @public
 */
declare const isTemplateEntityV1beta3: (entity: Entity) => entity is TemplateEntityV1beta3;

export { type TaskRecoverStrategy, type TaskRecovery, type TaskSpec, type TaskSpecV1beta3, type TaskStep, type TemplateEntityStepV1beta3, type TemplateEntityV1beta3, type TemplateInfo, type TemplateParametersV1beta3, type TemplatePermissionsV1beta3, type TemplatePresentationV1beta3, type TemplateRecoveryV1beta3, isTemplateEntityV1beta3, templateEntityV1beta3Validator };
