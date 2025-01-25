import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import Form from './components/Form';
/** A Higher-Order component that creates a wrapper around a `Form` with the overrides from the `WithThemeProps` */
export default function withTheme(themeProps) {
    return forwardRef(({ fields, widgets, templates, ...directProps }, ref) => {
        var _a;
        fields = { ...themeProps === null || themeProps === void 0 ? void 0 : themeProps.fields, ...fields };
        widgets = { ...themeProps === null || themeProps === void 0 ? void 0 : themeProps.widgets, ...widgets };
        templates = {
            ...themeProps === null || themeProps === void 0 ? void 0 : themeProps.templates,
            ...templates,
            ButtonTemplates: {
                ...(_a = themeProps === null || themeProps === void 0 ? void 0 : themeProps.templates) === null || _a === void 0 ? void 0 : _a.ButtonTemplates,
                ...templates === null || templates === void 0 ? void 0 : templates.ButtonTemplates,
            },
        };
        return (_jsx(Form, { ...themeProps, ...directProps, fields: fields, widgets: widgets, templates: templates, ref: ref }));
    });
}
//# sourceMappingURL=withTheme.js.map