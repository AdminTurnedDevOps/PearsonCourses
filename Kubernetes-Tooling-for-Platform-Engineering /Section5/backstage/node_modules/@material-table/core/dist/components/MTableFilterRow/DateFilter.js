"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _utils = require("./utils");

var _pickers = require("@material-ui/pickers");

function DateFilter(_ref) {
  var columnDef = _ref.columnDef,
      onFilterChanged = _ref.onFilterChanged,
      localization = _ref.localization,
      forwardedRef = _ref.forwardedRef;

  var onDateInputChange = function onDateInputChange(date) {
    return onFilterChanged(columnDef.tableData.id, date);
  };

  var pickerProps = {
    value: columnDef.tableData.filterValue || null,
    onChange: onDateInputChange,
    placeholder: (0, _utils.getLocalizedFilterPlaceHolder)(columnDef),
    clearable: true
  };
  var dateInputElement = null;

  if (columnDef.type === 'date') {
    dateInputElement = /*#__PURE__*/_react["default"].createElement(_pickers.DatePicker, (0, _extends2["default"])({}, pickerProps, {
      ref: forwardedRef
    }));
  } else if (columnDef.type === 'datetime') {
    dateInputElement = /*#__PURE__*/_react["default"].createElement(_pickers.DateTimePicker, (0, _extends2["default"])({}, pickerProps, {
      ref: forwardedRef
    }));
  } else if (columnDef.type === 'time') {
    dateInputElement = /*#__PURE__*/_react["default"].createElement(_pickers.TimePicker, (0, _extends2["default"])({}, pickerProps, {
      ref: forwardedRef
    }));
  }

  return /*#__PURE__*/_react["default"].createElement(_pickers.MuiPickersUtilsProvider, {
    utils: _dateFns["default"],
    locale: localization.dateTimePickerLocalization
  }, dateInputElement);
}

var _default = /*#__PURE__*/_react["default"].forwardRef(function DateFilterRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(DateFilter, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;