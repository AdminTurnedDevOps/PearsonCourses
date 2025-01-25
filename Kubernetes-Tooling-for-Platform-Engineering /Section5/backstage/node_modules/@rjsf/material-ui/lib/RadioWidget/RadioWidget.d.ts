import { FormContextType, RJSFSchema, StrictRJSFSchema, WidgetProps } from '@rjsf/utils';
/** The `RadioWidget` is a widget for rendering a radio group.
 *  It is typically used with a string property constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function RadioWidget<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({ id, options, value, required, disabled, readonly, label, hideLabel, onChange, onBlur, onFocus, }: WidgetProps<T, S, F>): import("react/jsx-runtime").JSX.Element;
