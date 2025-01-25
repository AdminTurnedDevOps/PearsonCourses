"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

var _core = require("@material-ui/core");

function DefaultFilter(_ref) {
  var columnDef = _ref.columnDef,
      icons = _ref.icons,
      localization = _ref.localization,
      hideFilterIcons = _ref.hideFilterIcons,
      onFilterChanged = _ref.onFilterChanged,
      forwardedRef = _ref.forwardedRef;

  var _localization = (0, _utils.getLocalizationData)(localization);

  var FilterIcon = icons.Filter;
  return /*#__PURE__*/_react["default"].createElement(_core.TextField, {
    ref: forwardedRef,
    style: columnDef.type === 'numeric' ? {
      "float": 'right'
    } : {},
    type: columnDef.type === 'numeric' ? 'number' : 'search',
    value: columnDef.tableData.filterValue || '',
    placeholder: (0, _utils.getLocalizedFilterPlaceHolder)(columnDef),
    onChange: function onChange(event) {
      onFilterChanged(columnDef.tableData.id, event.target.value);
    },
    inputProps: {
      'aria-label': "filter data by ".concat(columnDef.title)
    },
    InputProps: hideFilterIcons || columnDef.hideFilterIcon ? undefined : {
      startAdornment: /*#__PURE__*/_react["default"].createElement(_core.InputAdornment, {
        position: "start"
      }, /*#__PURE__*/_react["default"].createElement(_core.Tooltip, {
        title: _localization.filterTooltip
      }, /*#__PURE__*/_react["default"].createElement(FilterIcon, null)))
    }
  });
}

var _default = /*#__PURE__*/_react["default"].forwardRef(function DefaultFilterRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(DefaultFilter, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;