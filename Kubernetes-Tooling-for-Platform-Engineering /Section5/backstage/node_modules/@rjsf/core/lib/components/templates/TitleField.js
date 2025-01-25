import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const REQUIRED_FIELD_SYMBOL = '*';
/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
export default function TitleField(props) {
    const { id, title, required } = props;
    return (_jsxs("legend", { id: id, children: [title, required && _jsx("span", { className: 'required', children: REQUIRED_FIELD_SYMBOL })] }));
}
//# sourceMappingURL=TitleField.js.map