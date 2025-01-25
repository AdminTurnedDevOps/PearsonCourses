import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from 'react';
import { getTemplate, getWidget, getUiOptions, isFixedItems, allowAdditionalItems, isCustomWidget, optionsList, TranslatableString, ITEMS_KEY, } from '@rjsf/utils';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import set from 'lodash/set';
import { nanoid } from 'nanoid';
/** Used to generate a unique ID for an element in a row */
function generateRowId() {
    return nanoid();
}
/** Converts the `formData` into `KeyedFormDataType` data, using the `generateRowId()` function to create the key
 *
 * @param formData - The data for the form
 * @returns - The `formData` converted into a `KeyedFormDataType` element
 */
function generateKeyedFormData(formData) {
    return !Array.isArray(formData)
        ? []
        : formData.map((item) => {
            return {
                key: generateRowId(),
                item,
            };
        });
}
/** Converts `KeyedFormDataType` data into the inner `formData`
 *
 * @param keyedFormData - The `KeyedFormDataType` to be converted
 * @returns - The inner `formData` item(s) in the `keyedFormData`
 */
function keyedToPlainFormData(keyedFormData) {
    if (Array.isArray(keyedFormData)) {
        return keyedFormData.map((keyedItem) => keyedItem.item);
    }
    return [];
}
/** The `ArrayField` component is used to render a field in the schema that is of type `array`. It supports both normal
 * and fixed array, allowing user to add and remove elements from the array data.
 */
class ArrayField extends Component {
    /** Constructs an `ArrayField` from the `props`, generating the initial keyed data from the `formData`
     *
     * @param props - The `FieldProps` for this template
     */
    constructor(props) {
        super(props);
        /** Returns the default form information for an item based on the schema for that item. Deals with the possibility
         * that the schema is fixed and allows additional items.
         */
        this._getNewFormDataRow = () => {
            const { schema, registry } = this.props;
            const { schemaUtils } = registry;
            let itemSchema = schema.items;
            if (isFixedItems(schema) && allowAdditionalItems(schema)) {
                itemSchema = schema.additionalItems;
            }
            // Cast this as a T to work around schema utils being for T[] caused by the FieldProps<T[], S, F> call on the class
            return schemaUtils.getDefaultFormState(itemSchema);
        };
        /** Callback handler for when the user clicks on the add button. Creates a new row of keyed form data at the end of
         * the list, adding it into the state, and then returning `onChange()` with the plain form data converted from the
         * keyed data
         *
         * @param event - The event for the click
         */
        this.onAddClick = (event) => {
            this._handleAddClick(event);
        };
        /** Callback handler for when the user clicks on the add button on an existing array element. Creates a new row of
         * keyed form data inserted at the `index`, adding it into the state, and then returning `onChange()` with the plain
         * form data converted from the keyed data
         *
         * @param index - The index at which the add button is clicked
         */
        this.onAddIndexClick = (index) => {
            return (event) => {
                this._handleAddClick(event, index);
            };
        };
        /** Callback handler for when the user clicks on the copy button on an existing array element. Clones the row of
         * keyed form data at the `index` into the next position in the state, and then returning `onChange()` with the plain
         * form data converted from the keyed data
         *
         * @param index - The index at which the copy button is clicked
         */
        this.onCopyIndexClick = (index) => {
            return (event) => {
                if (event) {
                    event.preventDefault();
                }
                const { onChange, errorSchema } = this.props;
                const { keyedFormData } = this.state;
                // refs #195: revalidate to ensure properly reindexing errors
                let newErrorSchema;
                if (errorSchema) {
                    newErrorSchema = {};
                    for (const idx in errorSchema) {
                        const i = parseInt(idx);
                        if (i <= index) {
                            set(newErrorSchema, [i], errorSchema[idx]);
                        }
                        else if (i > index) {
                            set(newErrorSchema, [i + 1], errorSchema[idx]);
                        }
                    }
                }
                const newKeyedFormDataRow = {
                    key: generateRowId(),
                    item: cloneDeep(keyedFormData[index].item),
                };
                const newKeyedFormData = [...keyedFormData];
                if (index !== undefined) {
                    newKeyedFormData.splice(index + 1, 0, newKeyedFormDataRow);
                }
                else {
                    newKeyedFormData.push(newKeyedFormDataRow);
                }
                this.setState({
                    keyedFormData: newKeyedFormData,
                    updatedKeyedFormData: true,
                }, () => onChange(keyedToPlainFormData(newKeyedFormData), newErrorSchema));
            };
        };
        /** Callback handler for when the user clicks on the remove button on an existing array element. Removes the row of
         * keyed form data at the `index` in the state, and then returning `onChange()` with the plain form data converted
         * from the keyed data
         *
         * @param index - The index at which the remove button is clicked
         */
        this.onDropIndexClick = (index) => {
            return (event) => {
                if (event) {
                    event.preventDefault();
                }
                const { onChange, errorSchema } = this.props;
                const { keyedFormData } = this.state;
                // refs #195: revalidate to ensure properly reindexing errors
                let newErrorSchema;
                if (errorSchema) {
                    newErrorSchema = {};
                    for (const idx in errorSchema) {
                        const i = parseInt(idx);
                        if (i < index) {
                            set(newErrorSchema, [i], errorSchema[idx]);
                        }
                        else if (i > index) {
                            set(newErrorSchema, [i - 1], errorSchema[idx]);
                        }
                    }
                }
                const newKeyedFormData = keyedFormData.filter((_, i) => i !== index);
                this.setState({
                    keyedFormData: newKeyedFormData,
                    updatedKeyedFormData: true,
                }, () => onChange(keyedToPlainFormData(newKeyedFormData), newErrorSchema));
            };
        };
        /** Callback handler for when the user clicks on one of the move item buttons on an existing array element. Moves the
         * row of keyed form data at the `index` to the `newIndex` in the state, and then returning `onChange()` with the
         * plain form data converted from the keyed data
         *
         * @param index - The index of the item to move
         * @param newIndex - The index to where the item is to be moved
         */
        this.onReorderClick = (index, newIndex) => {
            return (event) => {
                if (event) {
                    event.preventDefault();
                    event.currentTarget.blur();
                }
                const { onChange, errorSchema } = this.props;
                let newErrorSchema;
                if (errorSchema) {
                    newErrorSchema = {};
                    for (const idx in errorSchema) {
                        const i = parseInt(idx);
                        if (i == index) {
                            set(newErrorSchema, [newIndex], errorSchema[index]);
                        }
                        else if (i == newIndex) {
                            set(newErrorSchema, [index], errorSchema[newIndex]);
                        }
                        else {
                            set(newErrorSchema, [idx], errorSchema[i]);
                        }
                    }
                }
                const { keyedFormData } = this.state;
                function reOrderArray() {
                    // Copy item
                    const _newKeyedFormData = keyedFormData.slice();
                    // Moves item from index to newIndex
                    _newKeyedFormData.splice(index, 1);
                    _newKeyedFormData.splice(newIndex, 0, keyedFormData[index]);
                    return _newKeyedFormData;
                }
                const newKeyedFormData = reOrderArray();
                this.setState({
                    keyedFormData: newKeyedFormData,
                }, () => onChange(keyedToPlainFormData(newKeyedFormData), newErrorSchema));
            };
        };
        /** Callback handler used to deal with changing the value of the data in the array at the `index`. Calls the
         * `onChange` callback with the updated form data
         *
         * @param index - The index of the item being changed
         */
        this.onChangeForIndex = (index) => {
            return (value, newErrorSchema, id) => {
                const { formData, onChange, errorSchema } = this.props;
                const arrayData = Array.isArray(formData) ? formData : [];
                const newFormData = arrayData.map((item, i) => {
                    // We need to treat undefined items as nulls to have validation.
                    // See https://github.com/tdegrunt/jsonschema/issues/206
                    const jsonValue = typeof value === 'undefined' ? null : value;
                    return index === i ? jsonValue : item;
                });
                onChange(newFormData, errorSchema &&
                    errorSchema && {
                    ...errorSchema,
                    [index]: newErrorSchema,
                }, id);
            };
        };
        /** Callback handler used to change the value for a checkbox */
        this.onSelectChange = (value) => {
            const { onChange, idSchema } = this.props;
            onChange(value, undefined, idSchema && idSchema.$id);
        };
        const { formData = [] } = props;
        const keyedFormData = generateKeyedFormData(formData);
        this.state = {
            keyedFormData,
            updatedKeyedFormData: false,
        };
    }
    /** React lifecycle method that is called when the props are about to change allowing the state to be updated. It
     * regenerates the keyed form data and returns it
     *
     * @param nextProps - The next set of props data
     * @param prevState - The previous set of state data
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        // Don't call getDerivedStateFromProps if keyed formdata was just updated.
        if (prevState.updatedKeyedFormData) {
            return {
                updatedKeyedFormData: false,
            };
        }
        const nextFormData = Array.isArray(nextProps.formData) ? nextProps.formData : [];
        const previousKeyedFormData = prevState.keyedFormData || [];
        const newKeyedFormData = nextFormData.length === previousKeyedFormData.length
            ? previousKeyedFormData.map((previousKeyedFormDatum, index) => {
                return {
                    key: previousKeyedFormDatum.key,
                    item: nextFormData[index],
                };
            })
            : generateKeyedFormData(nextFormData);
        return {
            keyedFormData: newKeyedFormData,
        };
    }
    /** Returns the appropriate title for an item by getting first the title from the schema.items, then falling back to
     * the description from the schema.items, and finally the string "Item"
     */
    get itemTitle() {
        const { schema, registry } = this.props;
        const { translateString } = registry;
        return get(schema, [ITEMS_KEY, 'title'], get(schema, [ITEMS_KEY, 'description'], translateString(TranslatableString.ArrayItemTitle)));
    }
    /** Determines whether the item described in the schema is always required, which is determined by whether any item
     * may be null.
     *
     * @param itemSchema - The schema for the item
     * @return - True if the item schema type does not contain the "null" type
     */
    isItemRequired(itemSchema) {
        if (Array.isArray(itemSchema.type)) {
            // While we don't yet support composite/nullable jsonschema types, it's
            // future-proof to check for requirement against these.
            return !itemSchema.type.includes('null');
        }
        // All non-null array item types are inherently required by design
        return itemSchema.type !== 'null';
    }
    /** Determines whether more items can be added to the array. If the uiSchema indicates the array doesn't allow adding
     * then false is returned. Otherwise, if the schema indicates that there are a maximum number of items and the
     * `formData` matches that value, then false is returned, otherwise true is returned.
     *
     * @param formItems - The list of items in the form
     * @returns - True if the item is addable otherwise false
     */
    canAddItem(formItems) {
        const { schema, uiSchema, registry } = this.props;
        let { addable } = getUiOptions(uiSchema, registry.globalUiOptions);
        if (addable !== false) {
            // if ui:options.addable was not explicitly set to false, we can add
            // another item if we have not exceeded maxItems yet
            if (schema.maxItems !== undefined) {
                addable = formItems.length < schema.maxItems;
            }
            else {
                addable = true;
            }
        }
        return addable;
    }
    /** Callback handler for when the user clicks on the add or add at index buttons. Creates a new row of keyed form data
     * either at the end of the list (when index is not specified) or inserted at the `index` when it is, adding it into
     * the state, and then returning `onChange()` with the plain form data converted from the keyed data
     *
     * @param event - The event for the click
     * @param [index] - The optional index at which to add the new data
     */
    _handleAddClick(event, index) {
        if (event) {
            event.preventDefault();
        }
        const { onChange, errorSchema } = this.props;
        const { keyedFormData } = this.state;
        // refs #195: revalidate to ensure properly reindexing errors
        let newErrorSchema;
        if (errorSchema) {
            newErrorSchema = {};
            for (const idx in errorSchema) {
                const i = parseInt(idx);
                if (index === undefined || i < index) {
                    set(newErrorSchema, [i], errorSchema[idx]);
                }
                else if (i >= index) {
                    set(newErrorSchema, [i + 1], errorSchema[idx]);
                }
            }
        }
        const newKeyedFormDataRow = {
            key: generateRowId(),
            item: this._getNewFormDataRow(),
        };
        const newKeyedFormData = [...keyedFormData];
        if (index !== undefined) {
            newKeyedFormData.splice(index, 0, newKeyedFormDataRow);
        }
        else {
            newKeyedFormData.push(newKeyedFormDataRow);
        }
        this.setState({
            keyedFormData: newKeyedFormData,
            updatedKeyedFormData: true,
        }, () => onChange(keyedToPlainFormData(newKeyedFormData), newErrorSchema));
    }
    /** Renders the `ArrayField` depending on the specific needs of the schema and uischema elements
     */
    render() {
        const { schema, uiSchema, idSchema, registry } = this.props;
        const { schemaUtils, translateString } = registry;
        if (!(ITEMS_KEY in schema)) {
            const uiOptions = getUiOptions(uiSchema);
            const UnsupportedFieldTemplate = getTemplate('UnsupportedFieldTemplate', registry, uiOptions);
            return (_jsx(UnsupportedFieldTemplate, { schema: schema, idSchema: idSchema, reason: translateString(TranslatableString.MissingItems), registry: registry }));
        }
        if (schemaUtils.isMultiSelect(schema)) {
            // If array has enum or uniqueItems set to true, call renderMultiSelect() to render the default multiselect widget or a custom widget, if specified.
            return this.renderMultiSelect();
        }
        if (isCustomWidget(uiSchema)) {
            return this.renderCustomWidget();
        }
        if (isFixedItems(schema)) {
            return this.renderFixedArray();
        }
        if (schemaUtils.isFilesArray(schema, uiSchema)) {
            return this.renderFiles();
        }
        return this.renderNormalArray();
    }
    /** Renders a normal array without any limitations of length
     */
    renderNormalArray() {
        const { schema, uiSchema = {}, errorSchema, idSchema, name, title, disabled = false, readonly = false, autofocus = false, required = false, registry, onBlur, onFocus, idPrefix, idSeparator = '_', rawErrors, } = this.props;
        const { keyedFormData } = this.state;
        const fieldTitle = schema.title || title || name;
        const { schemaUtils, formContext } = registry;
        const uiOptions = getUiOptions(uiSchema);
        const _schemaItems = isObject(schema.items) ? schema.items : {};
        const itemsSchema = schemaUtils.retrieveSchema(_schemaItems);
        const formData = keyedToPlainFormData(this.state.keyedFormData);
        const canAdd = this.canAddItem(formData);
        const arrayProps = {
            canAdd,
            items: keyedFormData.map((keyedItem, index) => {
                const { key, item } = keyedItem;
                // While we are actually dealing with a single item of type T, the types require a T[], so cast
                const itemCast = item;
                const itemSchema = schemaUtils.retrieveSchema(_schemaItems, itemCast);
                const itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
                const itemIdPrefix = idSchema.$id + idSeparator + index;
                const itemIdSchema = schemaUtils.toIdSchema(itemSchema, itemIdPrefix, itemCast, idPrefix, idSeparator);
                return this.renderArrayFieldItem({
                    key,
                    index,
                    name: name && `${name}-${index}`,
                    title: fieldTitle ? `${fieldTitle}-${index + 1}` : undefined,
                    canAdd,
                    canMoveUp: index > 0,
                    canMoveDown: index < formData.length - 1,
                    itemSchema,
                    itemIdSchema,
                    itemErrorSchema,
                    itemData: itemCast,
                    itemUiSchema: uiSchema.items,
                    autofocus: autofocus && index === 0,
                    onBlur,
                    onFocus,
                    rawErrors,
                    totalItems: keyedFormData.length,
                });
            }),
            className: `field field-array field-array-of-${itemsSchema.type}`,
            disabled,
            idSchema,
            uiSchema,
            onAddClick: this.onAddClick,
            readonly,
            required,
            schema,
            title: fieldTitle,
            formContext,
            formData,
            rawErrors,
            registry,
        };
        const Template = getTemplate('ArrayFieldTemplate', registry, uiOptions);
        return _jsx(Template, { ...arrayProps });
    }
    /** Renders an array using the custom widget provided by the user in the `uiSchema`
     */
    renderCustomWidget() {
        var _a;
        const { schema, idSchema, uiSchema, disabled = false, readonly = false, autofocus = false, required = false, hideError, placeholder, onBlur, onFocus, formData: items = [], registry, rawErrors, name, } = this.props;
        const { widgets, formContext, globalUiOptions, schemaUtils } = registry;
        const { widget, title: uiTitle, ...options } = getUiOptions(uiSchema, globalUiOptions);
        const Widget = getWidget(schema, widget, widgets);
        const label = (_a = uiTitle !== null && uiTitle !== void 0 ? uiTitle : schema.title) !== null && _a !== void 0 ? _a : name;
        const displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema, globalUiOptions);
        return (_jsx(Widget, { id: idSchema.$id, name: name, multiple: true, onChange: this.onSelectChange, onBlur: onBlur, onFocus: onFocus, options: options, schema: schema, uiSchema: uiSchema, registry: registry, value: items, disabled: disabled, readonly: readonly, hideError: hideError, required: required, label: label, hideLabel: !displayLabel, placeholder: placeholder, formContext: formContext, autofocus: autofocus, rawErrors: rawErrors }));
    }
    /** Renders an array as a set of checkboxes
     */
    renderMultiSelect() {
        var _a;
        const { schema, idSchema, uiSchema, formData: items = [], disabled = false, readonly = false, autofocus = false, required = false, placeholder, onBlur, onFocus, registry, rawErrors, name, } = this.props;
        const { widgets, schemaUtils, formContext, globalUiOptions } = registry;
        const itemsSchema = schemaUtils.retrieveSchema(schema.items, items);
        const enumOptions = optionsList(itemsSchema, uiSchema);
        const { widget = 'select', title: uiTitle, ...options } = getUiOptions(uiSchema, globalUiOptions);
        const Widget = getWidget(schema, widget, widgets);
        const label = (_a = uiTitle !== null && uiTitle !== void 0 ? uiTitle : schema.title) !== null && _a !== void 0 ? _a : name;
        const displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema, globalUiOptions);
        return (_jsx(Widget, { id: idSchema.$id, name: name, multiple: true, onChange: this.onSelectChange, onBlur: onBlur, onFocus: onFocus, options: { ...options, enumOptions }, schema: schema, uiSchema: uiSchema, registry: registry, value: items, disabled: disabled, readonly: readonly, required: required, label: label, hideLabel: !displayLabel, placeholder: placeholder, formContext: formContext, autofocus: autofocus, rawErrors: rawErrors }));
    }
    /** Renders an array of files using the `FileWidget`
     */
    renderFiles() {
        var _a;
        const { schema, uiSchema, idSchema, name, disabled = false, readonly = false, autofocus = false, required = false, onBlur, onFocus, registry, formData: items = [], rawErrors, } = this.props;
        const { widgets, formContext, globalUiOptions, schemaUtils } = registry;
        const { widget = 'files', title: uiTitle, ...options } = getUiOptions(uiSchema, globalUiOptions);
        const Widget = getWidget(schema, widget, widgets);
        const label = (_a = uiTitle !== null && uiTitle !== void 0 ? uiTitle : schema.title) !== null && _a !== void 0 ? _a : name;
        const displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema, globalUiOptions);
        return (_jsx(Widget, { options: options, id: idSchema.$id, name: name, multiple: true, onChange: this.onSelectChange, onBlur: onBlur, onFocus: onFocus, schema: schema, uiSchema: uiSchema, value: items, disabled: disabled, readonly: readonly, required: required, registry: registry, formContext: formContext, autofocus: autofocus, rawErrors: rawErrors, label: label, hideLabel: !displayLabel }));
    }
    /** Renders an array that has a maximum limit of items
     */
    renderFixedArray() {
        const { schema, uiSchema = {}, formData = [], errorSchema, idPrefix, idSeparator = '_', idSchema, name, title, disabled = false, readonly = false, autofocus = false, required = false, registry, onBlur, onFocus, rawErrors, } = this.props;
        const { keyedFormData } = this.state;
        let { formData: items = [] } = this.props;
        const fieldTitle = schema.title || title || name;
        const uiOptions = getUiOptions(uiSchema);
        const { schemaUtils, formContext } = registry;
        const _schemaItems = isObject(schema.items) ? schema.items : [];
        const itemSchemas = _schemaItems.map((item, index) => schemaUtils.retrieveSchema(item, formData[index]));
        const additionalSchema = isObject(schema.additionalItems)
            ? schemaUtils.retrieveSchema(schema.additionalItems, formData)
            : null;
        if (!items || items.length < itemSchemas.length) {
            // to make sure at least all fixed items are generated
            items = items || [];
            items = items.concat(new Array(itemSchemas.length - items.length));
        }
        // These are the props passed into the render function
        const canAdd = this.canAddItem(items) && !!additionalSchema;
        const arrayProps = {
            canAdd,
            className: 'field field-array field-array-fixed-items',
            disabled,
            idSchema,
            formData,
            items: keyedFormData.map((keyedItem, index) => {
                const { key, item } = keyedItem;
                // While we are actually dealing with a single item of type T, the types require a T[], so cast
                const itemCast = item;
                const additional = index >= itemSchemas.length;
                const itemSchema = (additional && isObject(schema.additionalItems)
                    ? schemaUtils.retrieveSchema(schema.additionalItems, itemCast)
                    : itemSchemas[index]) || {};
                const itemIdPrefix = idSchema.$id + idSeparator + index;
                const itemIdSchema = schemaUtils.toIdSchema(itemSchema, itemIdPrefix, itemCast, idPrefix, idSeparator);
                const itemUiSchema = additional
                    ? uiSchema.additionalItems || {}
                    : Array.isArray(uiSchema.items)
                        ? uiSchema.items[index]
                        : uiSchema.items || {};
                const itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
                return this.renderArrayFieldItem({
                    key,
                    index,
                    name: name && `${name}-${index}`,
                    title: fieldTitle ? `${fieldTitle}-${index + 1}` : undefined,
                    canAdd,
                    canRemove: additional,
                    canMoveUp: index >= itemSchemas.length + 1,
                    canMoveDown: additional && index < items.length - 1,
                    itemSchema,
                    itemData: itemCast,
                    itemUiSchema,
                    itemIdSchema,
                    itemErrorSchema,
                    autofocus: autofocus && index === 0,
                    onBlur,
                    onFocus,
                    rawErrors,
                    totalItems: keyedFormData.length,
                });
            }),
            onAddClick: this.onAddClick,
            readonly,
            required,
            registry,
            schema,
            uiSchema,
            title: fieldTitle,
            formContext,
            errorSchema,
            rawErrors,
        };
        const Template = getTemplate('ArrayFieldTemplate', registry, uiOptions);
        return _jsx(Template, { ...arrayProps });
    }
    /** Renders the individual array item using a `SchemaField` along with the additional properties required to be send
     * back to the `ArrayFieldItemTemplate`.
     *
     * @param props - The props for the individual array item to be rendered
     */
    renderArrayFieldItem(props) {
        const { key, index, name, canAdd, canRemove = true, canMoveUp, canMoveDown, itemSchema, itemData, itemUiSchema, itemIdSchema, itemErrorSchema, autofocus, onBlur, onFocus, rawErrors, totalItems, title, } = props;
        const { disabled, hideError, idPrefix, idSeparator, readonly, uiSchema, registry, formContext } = this.props;
        const { fields: { ArraySchemaField, SchemaField }, globalUiOptions, } = registry;
        const ItemSchemaField = ArraySchemaField || SchemaField;
        const { orderable = true, removable = true, copyable = false } = getUiOptions(uiSchema, globalUiOptions);
        const has = {
            moveUp: orderable && canMoveUp,
            moveDown: orderable && canMoveDown,
            copy: copyable && canAdd,
            remove: removable && canRemove,
            toolbar: false,
        };
        has.toolbar = Object.keys(has).some((key) => has[key]);
        return {
            children: (_jsx(ItemSchemaField, { name: name, title: title, index: index, schema: itemSchema, uiSchema: itemUiSchema, formData: itemData, formContext: formContext, errorSchema: itemErrorSchema, idPrefix: idPrefix, idSeparator: idSeparator, idSchema: itemIdSchema, required: this.isItemRequired(itemSchema), onChange: this.onChangeForIndex(index), onBlur: onBlur, onFocus: onFocus, registry: registry, disabled: disabled, readonly: readonly, hideError: hideError, autofocus: autofocus, rawErrors: rawErrors })),
            className: 'array-item',
            disabled,
            canAdd,
            hasCopy: has.copy,
            hasToolbar: has.toolbar,
            hasMoveUp: has.moveUp,
            hasMoveDown: has.moveDown,
            hasRemove: has.remove,
            index,
            totalItems,
            key,
            onAddIndexClick: this.onAddIndexClick,
            onCopyIndexClick: this.onCopyIndexClick,
            onDropIndexClick: this.onDropIndexClick,
            onReorderClick: this.onReorderClick,
            readonly,
            registry,
            schema: itemSchema,
            uiSchema: itemUiSchema,
        };
    }
}
/** `ArrayField` is `React.ComponentType<FieldProps<T[], S, F>>` (necessarily) but the `registry` requires things to be a
 * `Field` which is defined as `React.ComponentType<FieldProps<T, S, F>>`, so cast it to make `registry` happy.
 */
export default ArrayField;
//# sourceMappingURL=ArrayField.js.map