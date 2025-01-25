"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

function BooleanFilter(_ref) {
  var forwardedRef = _ref.forwardedRef,
      columnDef = _ref.columnDef,
      onFilterChanged = _ref.onFilterChanged;
  return /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
    ref: forwardedRef,
    inputProps: {
      'aria-label': "Filter of ".concat(columnDef.title)
    },
    indeterminate: columnDef.tableData.filterValue === undefined,
    checked: columnDef.tableData.filterValue === 'checked',
    onChange: function onChange() {
      var val;

      if (columnDef.tableData.filterValue === undefined) {
        val = 'checked';
      } else if (columnDef.tableData.filterValue === 'checked') {
        val = 'unchecked';
      }

      onFilterChanged(columnDef.tableData.id, val);
    }
  });
}

var _default = /*#__PURE__*/_react["default"].forwardRef(function BooleanFilterRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(BooleanFilter, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;