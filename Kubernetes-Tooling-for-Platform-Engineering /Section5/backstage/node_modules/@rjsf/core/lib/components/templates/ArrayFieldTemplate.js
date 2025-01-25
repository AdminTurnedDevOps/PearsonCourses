import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTemplate, getUiOptions, } from '@rjsf/utils';
/** The `ArrayFieldTemplate` component is the template used to render all items in an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
export default function ArrayFieldTemplate(props) {
    const { canAdd, className, disabled, idSchema, uiSchema, items, onAddClick, readonly, registry, required, schema, title, } = props;
    const uiOptions = getUiOptions(uiSchema);
    const ArrayFieldDescriptionTemplate = getTemplate('ArrayFieldDescriptionTemplate', registry, uiOptions);
    const ArrayFieldItemTemplate = getTemplate('ArrayFieldItemTemplate', registry, uiOptions);
    const ArrayFieldTitleTemplate = getTemplate('ArrayFieldTitleTemplate', registry, uiOptions);
    // Button templates are not overridden in the uiSchema
    const { ButtonTemplates: { AddButton }, } = registry.templates;
    return (_jsxs("fieldset", { className: className, id: idSchema.$id, children: [_jsx(ArrayFieldTitleTemplate, { idSchema: idSchema, title: uiOptions.title || title, required: required, schema: schema, uiSchema: uiSchema, registry: registry }), _jsx(ArrayFieldDescriptionTemplate, { idSchema: idSchema, description: uiOptions.description || schema.description, schema: schema, uiSchema: uiSchema, registry: registry }), _jsx("div", { className: 'row array-item-list', children: items &&
                    items.map(({ key, ...itemProps }) => (_jsx(ArrayFieldItemTemplate, { ...itemProps }, key))) }), canAdd && (_jsx(AddButton, { className: 'array-item-add', onClick: onAddClick, disabled: disabled || readonly, uiSchema: uiSchema, registry: registry }))] }));
}
//# sourceMappingURL=ArrayFieldTemplate.js.map