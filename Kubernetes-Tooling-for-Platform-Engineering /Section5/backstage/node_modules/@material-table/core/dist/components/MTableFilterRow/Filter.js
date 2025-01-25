"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

function Filter(_ref) {
  var columnDef = _ref.columnDef,
      onFilterChanged = _ref.onFilterChanged,
      forwardedRef = _ref.forwardedRef;
  return /*#__PURE__*/(0, _react.createElement)(columnDef.filterComponent, {
    columnDef: columnDef,
    onFilterChanged: onFilterChanged,
    forwardedRef: forwardedRef
  });
}

var _default = /*#__PURE__*/_react["default"].forwardRef(function FilterRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(Filter, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;