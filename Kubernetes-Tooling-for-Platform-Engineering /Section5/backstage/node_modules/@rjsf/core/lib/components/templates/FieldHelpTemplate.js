import { jsx as _jsx } from "react/jsx-runtime";
import { helpId } from '@rjsf/utils';
/** The `FieldHelpTemplate` component renders any help desired for a field
 *
 * @param props - The `FieldHelpProps` to be rendered
 */
export default function FieldHelpTemplate(props) {
    const { idSchema, help } = props;
    if (!help) {
        return null;
    }
    const id = helpId(idSchema);
    if (typeof help === 'string') {
        return (_jsx("p", { id: id, className: 'help-block', children: help }));
    }
    return (_jsx("div", { id: id, className: 'help-block', children: help }));
}
//# sourceMappingURL=FieldHelpTemplate.js.map