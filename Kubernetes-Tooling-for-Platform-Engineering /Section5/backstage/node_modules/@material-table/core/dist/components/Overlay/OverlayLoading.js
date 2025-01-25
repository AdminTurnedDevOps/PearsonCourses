"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

function OverlayLoading(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: props.forwardedRef,
    style: {
      display: 'table',
      width: '100%',
      height: '100%',
      backgroundColor: props.theme.palette.background.paper,
      opacity: 0.7
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'table-cell',
      width: '100%',
      height: '100%',
      verticalAlign: 'middle',
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.CircularProgress, null)));
}

OverlayLoading.propTypes = {
  theme: _propTypes["default"].any
};

var _default = /*#__PURE__*/_react["default"].forwardRef(function OverlayLoadingRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(OverlayLoading, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;