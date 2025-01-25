import { Component, MouseEvent } from 'react';
import { ErrorSchema, FieldProps, FormContextType, IdSchema, RJSFSchema, StrictRJSFSchema, UiSchema } from '@rjsf/utils';
/** Type used to represent the keyed form data used in the state */
type KeyedFormDataType<T> = {
    key: string;
    item: T;
};
/** Type used for the state of the `ArrayField` component */
type ArrayFieldState<T> = {
    /** The keyed form data elements */
    keyedFormData: KeyedFormDataType<T>[];
    /** Flag indicating whether any of the keyed form data has been updated */
    updatedKeyedFormData: boolean;
};
/** The `ArrayField` component is used to render a field in the schema that is of type `array`. It supports both normal
 * and fixed array, allowing user to add and remove elements from the array data.
 */
declare class ArrayField<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any> extends Component<FieldProps<T[], S, F>, ArrayFieldState<T>> {
    /** Constructs an `ArrayField` from the `props`, generating the initial keyed data from the `formData`
     *
     * @param props - The `FieldProps` for this template
     */
    constructor(props: FieldProps<T[], S, F>);
    /** React lifecycle method that is called when the props are about to change allowing the state to be updated. It
     * regenerates the keyed form data and returns it
     *
     * @param nextProps - The next set of props data
     * @param prevState - The previous set of state data
     */
    static getDerivedStateFromProps<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(nextProps: Readonly<FieldProps<T[], S, F>>, prevState: Readonly<ArrayFieldState<T>>): {
        updatedKeyedFormData: boolean;
        keyedFormData?: undefined;
    } | {
        keyedFormData: KeyedFormDataType<T>[];
        updatedKeyedFormData?: undefined;
    };
    /** Returns the appropriate title for an item by getting first the title from the schema.items, then falling back to
     * the description from the schema.items, and finally the string "Item"
     */
    get itemTitle(): any;
    /** Determines whether the item described in the schema is always required, which is determined by whether any item
     * may be null.
     *
     * @param itemSchema - The schema for the item
     * @return - True if the item schema type does not contain the "null" type
     */
    isItemRequired(itemSchema: S): boolean;
    /** Determines whether more items can be added to the array. If the uiSchema indicates the array doesn't allow adding
     * then false is returned. Otherwise, if the schema indicates that there are a maximum number of items and the
     * `formData` matches that value, then false is returned, otherwise true is returned.
     *
     * @param formItems - The list of items in the form
     * @returns - True if the item is addable otherwise false
     */
    canAddItem(formItems: any[]): boolean;
    /** Returns the default form information for an item based on the schema for that item. Deals with the possibility
     * that the schema is fixed and allows additional items.
     */
    _getNewFormDataRow: () => T;
    /** Callback handler for when the user clicks on the add or add at index buttons. Creates a new row of keyed form data
     * either at the end of the list (when index is not specified) or inserted at the `index` when it is, adding it into
     * the state, and then returning `onChange()` with the plain form data converted from the keyed data
     *
     * @param event - The event for the click
     * @param [index] - The optional index at which to add the new data
     */
    _handleAddClick(event: MouseEvent, index?: number): void;
    /** Callback handler for when the user clicks on the add button. Creates a new row of keyed form data at the end of
     * the list, adding it into the state, and then returning `onChange()` with the plain form data converted from the
     * keyed data
     *
     * @param event - The event for the click
     */
    onAddClick: (event: MouseEvent) => void;
    /** Callback handler for when the user clicks on the add button on an existing array element. Creates a new row of
     * keyed form data inserted at the `index`, adding it into the state, and then returning `onChange()` with the plain
     * form data converted from the keyed data
     *
     * @param index - The index at which the add button is clicked
     */
    onAddIndexClick: (index: number) => (event: MouseEvent) => void;
    /** Callback handler for when the user clicks on the copy button on an existing array element. Clones the row of
     * keyed form data at the `index` into the next position in the state, and then returning `onChange()` with the plain
     * form data converted from the keyed data
     *
     * @param index - The index at which the copy button is clicked
     */
    onCopyIndexClick: (index: number) => (event: MouseEvent) => void;
    /** Callback handler for when the user clicks on the remove button on an existing array element. Removes the row of
     * keyed form data at the `index` in the state, and then returning `onChange()` with the plain form data converted
     * from the keyed data
     *
     * @param index - The index at which the remove button is clicked
     */
    onDropIndexClick: (index: number) => (event: MouseEvent) => void;
    /** Callback handler for when the user clicks on one of the move item buttons on an existing array element. Moves the
     * row of keyed form data at the `index` to the `newIndex` in the state, and then returning `onChange()` with the
     * plain form data converted from the keyed data
     *
     * @param index - The index of the item to move
     * @param newIndex - The index to where the item is to be moved
     */
    onReorderClick: (index: number, newIndex: number) => (event: MouseEvent<HTMLButtonElement>) => void;
    /** Callback handler used to deal with changing the value of the data in the array at the `index`. Calls the
     * `onChange` callback with the updated form data
     *
     * @param index - The index of the item being changed
     */
    onChangeForIndex: (index: number) => (value: any, newErrorSchema?: ErrorSchema<T>, id?: string) => void;
    /** Callback handler used to change the value for a checkbox */
    onSelectChange: (value: any) => void;
    /** Renders the `ArrayField` depending on the specific needs of the schema and uischema elements
     */
    render(): import("react/jsx-runtime").JSX.Element;
    /** Renders a normal array without any limitations of length
     */
    renderNormalArray(): import("react/jsx-runtime").JSX.Element;
    /** Renders an array using the custom widget provided by the user in the `uiSchema`
     */
    renderCustomWidget(): import("react/jsx-runtime").JSX.Element;
    /** Renders an array as a set of checkboxes
     */
    renderMultiSelect(): import("react/jsx-runtime").JSX.Element;
    /** Renders an array of files using the `FileWidget`
     */
    renderFiles(): import("react/jsx-runtime").JSX.Element;
    /** Renders an array that has a maximum limit of items
     */
    renderFixedArray(): import("react/jsx-runtime").JSX.Element;
    /** Renders the individual array item using a `SchemaField` along with the additional properties required to be send
     * back to the `ArrayFieldItemTemplate`.
     *
     * @param props - The props for the individual array item to be rendered
     */
    renderArrayFieldItem(props: {
        key: string;
        index: number;
        name: string;
        title: string | undefined;
        canAdd: boolean;
        canRemove?: boolean;
        canMoveUp: boolean;
        canMoveDown: boolean;
        itemSchema: S;
        itemData: T[];
        itemUiSchema: UiSchema<T[], S, F>;
        itemIdSchema: IdSchema<T[]>;
        itemErrorSchema?: ErrorSchema<T[]>;
        autofocus?: boolean;
        onBlur: FieldProps<T[], S, F>['onBlur'];
        onFocus: FieldProps<T[], S, F>['onFocus'];
        rawErrors?: string[];
        totalItems: number;
    }): {
        children: import("react/jsx-runtime").JSX.Element;
        className: string;
        disabled: boolean | undefined;
        canAdd: boolean;
        hasCopy: boolean;
        hasToolbar: boolean;
        hasMoveUp: boolean;
        hasMoveDown: boolean;
        hasRemove: boolean;
        index: number;
        totalItems: number;
        key: string;
        onAddIndexClick: (index: number) => (event: MouseEvent<Element, globalThis.MouseEvent>) => void;
        onCopyIndexClick: (index: number) => (event: MouseEvent<Element, globalThis.MouseEvent>) => void;
        onDropIndexClick: (index: number) => (event: MouseEvent<Element, globalThis.MouseEvent>) => void;
        onReorderClick: (index: number, newIndex: number) => (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
        readonly: boolean | undefined;
        registry: import("@rjsf/utils").Registry<T[], S, F>;
        schema: S;
        uiSchema: UiSchema<T[], S, F>;
    };
}
/** `ArrayField` is `React.ComponentType<FieldProps<T[], S, F>>` (necessarily) but the `registry` requires things to be a
 * `Field` which is defined as `React.ComponentType<FieldProps<T, S, F>>`, so cast it to make `registry` happy.
 */
export default ArrayField;
