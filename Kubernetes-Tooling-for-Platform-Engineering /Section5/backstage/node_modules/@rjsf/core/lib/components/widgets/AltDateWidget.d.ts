import { FormContextType, RJSFSchema, StrictRJSFSchema, WidgetProps } from '@rjsf/utils';
/** The `AltDateWidget` is an alternative widget for rendering date properties.
 * @param props - The `WidgetProps` for this component
 */
declare function AltDateWidget<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({ time, disabled, readonly, autofocus, options, id, name, registry, onBlur, onFocus, onChange, value, }: WidgetProps<T, S, F>): import("react/jsx-runtime").JSX.Element;
export default AltDateWidget;
