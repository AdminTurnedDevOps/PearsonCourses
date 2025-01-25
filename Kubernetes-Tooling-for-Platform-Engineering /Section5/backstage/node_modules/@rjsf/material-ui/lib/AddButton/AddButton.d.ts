import { FormContextType, IconButtonProps, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';
/** The `AddButton` renders a button that represent the `Add` action on a form
 */
export default function AddButton<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({ uiSchema, registry, ...props }: IconButtonProps<T, S, F>): import("react/jsx-runtime").JSX.Element;
