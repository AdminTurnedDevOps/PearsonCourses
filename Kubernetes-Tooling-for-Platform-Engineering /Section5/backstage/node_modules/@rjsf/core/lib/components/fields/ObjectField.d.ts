import { Component } from 'react';
import { ErrorSchema, FieldProps, FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';
/** Type used for the state of the `ObjectField` component */
type ObjectFieldState = {
    /** Flag indicating whether an additional property key was modified */
    wasPropertyKeyModified: boolean;
    /** The set of additional properties */
    additionalProperties: object;
};
/** The `ObjectField` component is used to render a field in the schema that is of type `object`. It tracks whether an
 * additional property key was modified and what it was modified to
 *
 * @param props - The `FieldProps` for this template
 */
declare class ObjectField<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any> extends Component<FieldProps<T, S, F>, ObjectFieldState> {
    /** Set up the initial state */
    state: {
        wasPropertyKeyModified: boolean;
        additionalProperties: {};
    };
    /** Returns a flag indicating whether the `name` field is required in the object schema
     *
     * @param name - The name of the field to check for required-ness
     * @returns - True if the field `name` is required, false otherwise
     */
    isRequired(name: string): boolean;
    /** Returns the `onPropertyChange` handler for the `name` field. Handles the special case where a user is attempting
     * to clear the data for a field added as an additional property. Calls the `onChange()` handler with the updated
     * formData.
     *
     * @param name - The name of the property
     * @param addedByAdditionalProperties - Flag indicating whether this property is an additional property
     * @returns - The onPropertyChange callback for the `name` property
     */
    onPropertyChange: (name: string, addedByAdditionalProperties?: boolean) => (value: T | undefined, newErrorSchema?: ErrorSchema<T>, id?: string) => void;
    /** Returns a callback to handle the onDropPropertyClick event for the given `key` which removes the old `key` data
     * and calls the `onChange` callback with it
     *
     * @param key - The key for which the drop callback is desired
     * @returns - The drop property click callback
     */
    onDropPropertyClick: (key: string) => (event: DragEvent) => void;
    /** Computes the next available key name from the `preferredKey`, indexing through the already existing keys until one
     * that is already not assigned is found.
     *
     * @param preferredKey - The preferred name of a new key
     * @param [formData] - The form data in which to check if the desired key already exists
     * @returns - The name of the next available key from `preferredKey`
     */
    getAvailableKey: (preferredKey: string, formData?: T) => string;
    /** Returns a callback function that deals with the rename of a key for an additional property for a schema. That
     * callback will attempt to rename the key and move the existing data to that key, calling `onChange` when it does.
     *
     * @param oldValue - The old value of a field
     * @returns - The key change callback function
     */
    onKeyChange: (oldValue: any) => (value: any, newErrorSchema: ErrorSchema<T>) => void;
    /** Returns a default value to be used for a new additional schema property of the given `type`
     *
     * @param type - The type of the new additional schema property
     */
    getDefaultValue(type?: RJSFSchema['type']): {} | null;
    /** Handles the adding of a new additional property on the given `schema`. Calls the `onChange` callback once the new
     * default data for that field has been added to the formData.
     *
     * @param schema - The schema element to which the new property is being added
     */
    handleAddClick: (schema: S) => () => void;
    /** Renders the `ObjectField` from the given props
     */
    render(): import("react/jsx-runtime").JSX.Element;
}
export default ObjectField;
