import { jsx as _jsx } from "react/jsx-runtime";
/** The `DescriptionField` is the template to use to render the description of a field
 *
 * @param props - The `DescriptionFieldProps` for this component
 */
export default function DescriptionField(props) {
    const { id, description } = props;
    if (!description) {
        return null;
    }
    if (typeof description === 'string') {
        return (_jsx("p", { id: id, className: 'field-description', children: description }));
    }
    else {
        return (_jsx("div", { id: id, className: 'field-description', children: description }));
    }
}
//# sourceMappingURL=DescriptionField.js.map