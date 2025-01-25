"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _pickers = require("@material-ui/pickers");

function DateField(_ref) {
  var columnDef = _ref.columnDef,
      value = _ref.value,
      onChange = _ref.onChange,
      locale = _ref.locale,
      forwardedRef = _ref.forwardedRef,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["columnDef", "value", "onChange", "locale", "forwardedRef"]);

  var getProps = function getProps() {
    var columnDef = rest.columnDef,
        rowData = rest.rowData,
        onRowDataChange = rest.onRowDataChange,
        errorState = rest.errorState,
        onBulkEditRowChanged = rest.onBulkEditRowChanged,
        scrollWidth = rest.scrollWidth,
        remaining = (0, _objectWithoutProperties2["default"])(rest, ["columnDef", "rowData", "onRowDataChange", "errorState", "onBulkEditRowChanged", "scrollWidth"]);
    return remaining;
  };

  var dateFormat = columnDef.dateSetting && columnDef.dateSetting.format ? columnDef.dateSetting.format : 'dd.MM.yyyy';
  var datePickerProps = getProps();
  return /*#__PURE__*/_react["default"].createElement(_pickers.MuiPickersUtilsProvider, {
    utils: _dateFns["default"],
    locale: locale
  }, /*#__PURE__*/_react["default"].createElement(_pickers.DatePicker, (0, _extends2["default"])({}, datePickerProps, {
    ref: forwardedRef,
    format: dateFormat,
    value: value || null,
    onChange: onChange,
    clearable: true,
    InputProps: {
      style: {
        fontSize: 13
      }
    },
    inputProps: {
      'aria-label': "".concat(columnDef.title, ": press space to edit")
    }
  })));
}

var _default = /*#__PURE__*/_react["default"].forwardRef(function DateFieldRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(DateField, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;