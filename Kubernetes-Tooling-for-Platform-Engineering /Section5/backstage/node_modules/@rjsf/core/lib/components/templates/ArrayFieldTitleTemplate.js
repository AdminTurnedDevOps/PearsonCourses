import { jsx as _jsx } from "react/jsx-runtime";
import { getTemplate, getUiOptions, titleId, } from '@rjsf/utils';
/** The `ArrayFieldTitleTemplate` component renders a `TitleFieldTemplate` with an `id` derived from
 * the `idSchema`.
 *
 * @param props - The `ArrayFieldTitleProps` for the component
 */
export default function ArrayFieldTitleTemplate(props) {
    const { idSchema, title, schema, uiSchema, required, registry } = props;
    const options = getUiOptions(uiSchema, registry.globalUiOptions);
    const { label: displayLabel = true } = options;
    if (!title || !displayLabel) {
        return null;
    }
    const TitleFieldTemplate = getTemplate('TitleFieldTemplate', registry, options);
    return (_jsx(TitleFieldTemplate, { id: titleId(idSchema), title: title, required: required, schema: schema, uiSchema: uiSchema, registry: registry }));
}
//# sourceMappingURL=ArrayFieldTitleTemplate.js.map