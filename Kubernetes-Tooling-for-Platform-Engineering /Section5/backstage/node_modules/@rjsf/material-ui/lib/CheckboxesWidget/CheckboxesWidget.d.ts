import { FormContextType, WidgetProps, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';
/** The `CheckboxesWidget` is a widget for rendering checkbox groups.
 *  It is typically used to represent an array of enums.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function CheckboxesWidget<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({ label, hideLabel, id, disabled, options, value, autofocus, readonly, required, onChange, onBlur, onFocus, }: WidgetProps<T, S, F>): import("react/jsx-runtime").JSX.Element;
