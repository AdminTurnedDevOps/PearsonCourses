import { ArrayFieldTemplateItemType, FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';
/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
export default function ArrayFieldItemTemplate<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(props: ArrayFieldTemplateItemType<T, S, F>): import("react/jsx-runtime").JSX.Element;
