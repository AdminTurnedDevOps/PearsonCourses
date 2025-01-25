"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

function BooleanField(_ref) {
  var forwardedRef = _ref.forwardedRef,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["forwardedRef"]);
  return /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
    error: Boolean(props.error),
    ref: forwardedRef,
    component: "fieldset"
  }, /*#__PURE__*/_react["default"].createElement(_core.FormGroup, null, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    label: "",
    control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, (0, _extends2["default"])({}, props, {
      value: String(props.value),
      checked: Boolean(props.value),
      onChange: function onChange(event) {
        return props.onChange(event.target.checked);
      },
      style: {
        padding: 0,
        width: 24,
        marginLeft: 9
      },
      inputProps: {
        'aria-label': props.columnDef.title
      }
    }))
  })), /*#__PURE__*/_react["default"].createElement(_core.FormHelperText, null, props.helperText));
}

var _default = /*#__PURE__*/_react["default"].forwardRef(function BooleanFieldRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(BooleanField, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;