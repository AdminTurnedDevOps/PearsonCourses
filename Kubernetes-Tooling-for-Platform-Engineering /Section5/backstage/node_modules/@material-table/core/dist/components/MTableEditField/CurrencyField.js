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

function CurrencyField(_ref) {
  var forwardedRef = _ref.forwardedRef,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["forwardedRef"]);
  return /*#__PURE__*/_react["default"].createElement(_core.TextField, (0, _extends2["default"])({}, props, {
    ref: forwardedRef,
    placeholder: props.columnDef.editPlaceholder || props.columnDef.title,
    type: "number",
    value: props.value === undefined ? '' : props.value,
    onChange: function onChange(event) {
      var value = event.target.valueAsNumber;

      if (!value && value !== 0) {
        value = undefined;
      }

      return props.onChange(value);
    },
    InputProps: {
      style: {
        fontSize: 13,
        textAlign: 'right'
      }
    },
    inputProps: {
      'aria-label': props.columnDef.title,
      style: {
        textAlign: 'right'
      }
    },
    onKeyDown: props.onKeyDown,
    autoFocus: props.autoFocus
  }));
}

var _default = /*#__PURE__*/_react["default"].forwardRef(function CurrencyFieldRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(CurrencyField, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;