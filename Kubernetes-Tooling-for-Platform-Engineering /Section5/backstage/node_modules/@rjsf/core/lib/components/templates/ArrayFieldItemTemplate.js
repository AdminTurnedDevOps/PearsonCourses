import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
export default function ArrayFieldItemTemplate(props) {
    const { children, className, disabled, hasToolbar, hasMoveDown, hasMoveUp, hasRemove, hasCopy, index, onCopyIndexClick, onDropIndexClick, onReorderClick, readonly, registry, uiSchema, } = props;
    const { CopyButton, MoveDownButton, MoveUpButton, RemoveButton } = registry.templates.ButtonTemplates;
    const btnStyle = {
        flex: 1,
        paddingLeft: 6,
        paddingRight: 6,
        fontWeight: 'bold',
    };
    return (_jsxs("div", { className: className, children: [_jsx("div", { className: hasToolbar ? 'col-xs-9' : 'col-xs-12', children: children }), hasToolbar && (_jsx("div", { className: 'col-xs-3 array-item-toolbox', children: _jsxs("div", { className: 'btn-group', style: {
                        display: 'flex',
                        justifyContent: 'space-around',
                    }, children: [(hasMoveUp || hasMoveDown) && (_jsx(MoveUpButton, { style: btnStyle, disabled: disabled || readonly || !hasMoveUp, onClick: onReorderClick(index, index - 1), uiSchema: uiSchema, registry: registry })), (hasMoveUp || hasMoveDown) && (_jsx(MoveDownButton, { style: btnStyle, disabled: disabled || readonly || !hasMoveDown, onClick: onReorderClick(index, index + 1), uiSchema: uiSchema, registry: registry })), hasCopy && (_jsx(CopyButton, { style: btnStyle, disabled: disabled || readonly, onClick: onCopyIndexClick(index), uiSchema: uiSchema, registry: registry })), hasRemove && (_jsx(RemoveButton, { style: btnStyle, disabled: disabled || readonly, onClick: onDropIndexClick(index), uiSchema: uiSchema, registry: registry }))] }) }))] }));
}
//# sourceMappingURL=ArrayFieldItemTemplate.js.map