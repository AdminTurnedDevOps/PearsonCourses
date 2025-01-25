import { jsx as _jsx } from "react/jsx-runtime";
import { getWidget, getUiOptions, optionsList, hasWidget, } from '@rjsf/utils';
/** The `StringField` component is used to render a schema field that represents a string type
 *
 * @param props - The `FieldProps` for this template
 */
function StringField(props) {
    var _a;
    const { schema, name, uiSchema, idSchema, formData, required, disabled = false, readonly = false, autofocus = false, onChange, onBlur, onFocus, registry, rawErrors, hideError, } = props;
    const { title, format } = schema;
    const { widgets, formContext, schemaUtils, globalUiOptions } = registry;
    const enumOptions = schemaUtils.isSelect(schema) ? optionsList(schema, uiSchema) : undefined;
    let defaultWidget = enumOptions ? 'select' : 'text';
    if (format && hasWidget(schema, format, widgets)) {
        defaultWidget = format;
    }
    const { widget = defaultWidget, placeholder = '', title: uiTitle, ...options } = getUiOptions(uiSchema);
    const displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema, globalUiOptions);
    const label = (_a = uiTitle !== null && uiTitle !== void 0 ? uiTitle : title) !== null && _a !== void 0 ? _a : name;
    const Widget = getWidget(schema, widget, widgets);
    return (_jsx(Widget, { options: { ...options, enumOptions }, schema: schema, uiSchema: uiSchema, id: idSchema.$id, name: name, label: label, hideLabel: !displayLabel, hideError: hideError, value: formData, onChange: onChange, onBlur: onBlur, onFocus: onFocus, required: required, disabled: disabled, readonly: readonly, formContext: formContext, autofocus: autofocus, registry: registry, placeholder: placeholder, rawErrors: rawErrors }));
}
export default StringField;
//# sourceMappingURL=StringField.js.map