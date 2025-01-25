"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _LookupField = _interopRequireDefault(require("./LookupField"));

var _BooleanField = _interopRequireDefault(require("./BooleanField"));

var _DateField = _interopRequireDefault(require("./DateField"));

var _TimeField = _interopRequireDefault(require("./TimeField"));

var _TextField = _interopRequireDefault(require("./TextField"));

var _DateTimeField = _interopRequireDefault(require("./DateTimeField"));

var _CurrencyField = _interopRequireDefault(require("./CurrencyField"));

function MTableEditField(_ref) {
  var forwardedRef = _ref.forwardedRef,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["forwardedRef"]);
  var component = 'ok';

  if (props.columnDef.editComponent) {
    component = props.columnDef.editComponent(props);
  } else if (props.columnDef.lookup) {
    component = /*#__PURE__*/_react["default"].createElement(_LookupField["default"], (0, _extends2["default"])({}, props, {
      ref: forwardedRef
    }));
  } else if (props.columnDef.type === 'boolean') {
    component = /*#__PURE__*/_react["default"].createElement(_BooleanField["default"], (0, _extends2["default"])({}, props, {
      ref: forwardedRef
    }));
  } else if (props.columnDef.type === 'date') {
    component = /*#__PURE__*/_react["default"].createElement(_DateField["default"], (0, _extends2["default"])({}, props, {
      ref: forwardedRef
    }));
  } else if (props.columnDef.type === 'time') {
    component = /*#__PURE__*/_react["default"].createElement(_TimeField["default"], (0, _extends2["default"])({}, props, {
      ref: forwardedRef
    }));
  } else if (props.columnDef.type === 'datetime') {
    component = /*#__PURE__*/_react["default"].createElement(_DateTimeField["default"], (0, _extends2["default"])({}, props, {
      ref: forwardedRef
    }));
  } else if (props.columnDef.type === 'currency') {
    component = /*#__PURE__*/_react["default"].createElement(_CurrencyField["default"], (0, _extends2["default"])({}, props, {
      ref: forwardedRef
    }));
  } else {
    component = /*#__PURE__*/_react["default"].createElement(_TextField["default"], (0, _extends2["default"])({}, props, {
      ref: forwardedRef
    }));
  }

  return component;
}

MTableEditField.propTypes = {
  value: _propTypes["default"].any,
  onChange: _propTypes["default"].func.isRequired,
  columnDef: _propTypes["default"].object.isRequired,
  locale: _propTypes["default"].object
};

var _default = /*#__PURE__*/_react["default"].forwardRef(function MTableEditFieldRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTableEditField, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;