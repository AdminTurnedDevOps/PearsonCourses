import { jsx as _jsx } from "react/jsx-runtime";
import { descriptionId, getTemplate, getUiOptions, } from '@rjsf/utils';
/** The `ArrayFieldDescriptionTemplate` component renders a `DescriptionFieldTemplate` with an `id` derived from
 * the `idSchema`.
 *
 * @param props - The `ArrayFieldDescriptionProps` for the component
 */
export default function ArrayFieldDescriptionTemplate(props) {
    const { idSchema, description, registry, schema, uiSchema } = props;
    const options = getUiOptions(uiSchema, registry.globalUiOptions);
    const { label: displayLabel = true } = options;
    if (!description || !displayLabel) {
        return null;
    }
    const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, options);
    return (_jsx(DescriptionFieldTemplate, { id: descriptionId(idSchema), description: description, schema: schema, uiSchema: uiSchema, registry: registry }));
}
//# sourceMappingURL=ArrayFieldDescriptionTemplate.js.map