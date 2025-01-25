import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ADDITIONAL_PROPERTY_FLAG, TranslatableString, } from '@rjsf/utils';
import Label from './FieldTemplate/Label';
/** The `WrapIfAdditional` component is used by the `FieldTemplate` to rename, or remove properties that are
 * part of an `additionalProperties` part of a schema.
 *
 * @param props - The `WrapIfAdditionalProps` for this component
 */
export default function WrapIfAdditionalTemplate(props) {
    const { id, classNames, style, disabled, label, onKeyChange, onDropPropertyClick, readonly, required, schema, children, uiSchema, registry, } = props;
    const { templates, translateString } = registry;
    // Button templates are not overridden in the uiSchema
    const { RemoveButton } = templates.ButtonTemplates;
    const keyLabel = translateString(TranslatableString.KeyLabel, [label]);
    const additional = ADDITIONAL_PROPERTY_FLAG in schema;
    if (!additional) {
        return (_jsx("div", { className: classNames, style: style, children: children }));
    }
    return (_jsx("div", { className: classNames, style: style, children: _jsxs("div", { className: 'row', children: [_jsx("div", { className: 'col-xs-5 form-additional', children: _jsxs("div", { className: 'form-group', children: [_jsx(Label, { label: keyLabel, required: required, id: `${id}-key` }), _jsx("input", { className: 'form-control', type: 'text', id: `${id}-key`, onBlur: ({ target }) => onKeyChange(target && target.value), defaultValue: label })] }) }), _jsx("div", { className: 'form-additional form-group col-xs-5', children: children }), _jsx("div", { className: 'col-xs-2', children: _jsx(RemoveButton, { className: 'array-item-remove btn-block', style: { border: '0' }, disabled: disabled || readonly, onClick: onDropPropertyClick(label), uiSchema: uiSchema, registry: registry }) })] }) }));
}
//# sourceMappingURL=WrapIfAdditionalTemplate.js.map