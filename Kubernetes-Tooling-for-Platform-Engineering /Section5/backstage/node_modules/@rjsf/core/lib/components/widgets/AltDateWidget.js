import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useReducer, useState } from 'react';
import { ariaDescribedByIds, dateRangeOptions, parseDateString, toDateString, TranslatableString, getDateElementProps, } from '@rjsf/utils';
function readyForChange(state) {
    return Object.values(state).every((value) => value !== -1);
}
function DateElement({ type, range, value, select, rootId, name, disabled, readonly, autofocus, registry, onBlur, onFocus, }) {
    const id = rootId + '_' + type;
    const { SelectWidget } = registry.widgets;
    return (_jsx(SelectWidget, { schema: { type: 'integer' }, id: id, name: name, className: 'form-control', options: { enumOptions: dateRangeOptions(range[0], range[1]) }, placeholder: type, value: value, disabled: disabled, readonly: readonly, autofocus: autofocus, onChange: (value) => select(type, value), onBlur: onBlur, onFocus: onFocus, registry: registry, label: '', "aria-describedby": ariaDescribedByIds(rootId) }));
}
/** The `AltDateWidget` is an alternative widget for rendering date properties.
 * @param props - The `WidgetProps` for this component
 */
function AltDateWidget({ time = false, disabled = false, readonly = false, autofocus = false, options, id, name, registry, onBlur, onFocus, onChange, value, }) {
    const { translateString } = registry;
    const [lastValue, setLastValue] = useState(value);
    const [state, setState] = useReducer((state, action) => {
        return { ...state, ...action };
    }, parseDateString(value, time));
    useEffect(() => {
        const stateValue = toDateString(state, time);
        if (readyForChange(state) && stateValue !== value) {
            // The user changed the date to a new valid data via the comboboxes, so call onChange
            onChange(stateValue);
        }
        else if (lastValue !== value) {
            // We got a new value in the props
            setLastValue(value);
            setState(parseDateString(value, time));
        }
    }, [time, value, onChange, state, lastValue]);
    const handleChange = useCallback((property, value) => {
        setState({ [property]: value });
    }, []);
    const handleSetNow = useCallback((event) => {
        event.preventDefault();
        if (disabled || readonly) {
            return;
        }
        const nextState = parseDateString(new Date().toJSON(), time);
        onChange(toDateString(nextState, time));
    }, [disabled, readonly, time]);
    const handleClear = useCallback((event) => {
        event.preventDefault();
        if (disabled || readonly) {
            return;
        }
        onChange(undefined);
    }, [disabled, readonly, onChange]);
    return (_jsxs("ul", { className: 'list-inline', children: [getDateElementProps(state, time, options.yearsRange, options.format).map((elemProps, i) => (_jsx("li", { className: 'list-inline-item', children: _jsx(DateElement, { rootId: id, name: name, select: handleChange, ...elemProps, disabled: disabled, readonly: readonly, registry: registry, onBlur: onBlur, onFocus: onFocus, autofocus: autofocus && i === 0 }) }, i))), (options.hideNowButton !== 'undefined' ? !options.hideNowButton : true) && (_jsx("li", { className: 'list-inline-item', children: _jsx("a", { href: '#', className: 'btn btn-info btn-now', onClick: handleSetNow, children: translateString(TranslatableString.NowLabel) }) })), (options.hideClearButton !== 'undefined' ? !options.hideClearButton : true) && (_jsx("li", { className: 'list-inline-item', children: _jsx("a", { href: '#', className: 'btn btn-warning btn-clear', onClick: handleClear, children: translateString(TranslatableString.ClearLabel) }) }))] }));
}
export default AltDateWidget;
//# sourceMappingURL=AltDateWidget.js.map