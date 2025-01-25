"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("@material-ui/core/Icon"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function MTableAction(props) {
  function render() {
    var action = props.action;

    if (typeof action === 'function') {
      action = action(props.data);

      if (!action) {
        return null;
      }
    }

    if (action.action) {
      action = action.action(props.data);

      if (!action) {
        return null;
      }
    }

    if (action.hidden) {
      return null;
    }

    var disabled = action.disabled || props.disabled;

    var handleOnClick = function handleOnClick(event) {
      if (action.onClick) {
        action.onClick(event, props.data);
        event.stopPropagation();
      }
    }; // You may provide events via the "action.handers" prop. It is an object.
    // The event name is the key, and the value is the handler func.


    var handlers = action.handlers || {};
    var eventHandlers = Object.entries(handlers).reduce(function (o, _ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      o[k] = function (e) {
        return v(e, props.data);
      };

      return o;
    }, {});
    var icon = typeof action.icon === 'string' ? /*#__PURE__*/_react["default"].createElement(_Icon["default"], action.iconProps, action.icon) : typeof action.icon === 'function' ? action.icon(_objectSpread(_objectSpread({}, action.iconProps), {}, {
      disabled: disabled
    })) : /*#__PURE__*/_react["default"].createElement(action.icon, null);

    var button = /*#__PURE__*/_react["default"].createElement(_IconButton["default"], (0, _extends2["default"])({
      ref: props.forwardedRef,
      size: props.size,
      color: "inherit",
      disabled: disabled,
      onClick: handleOnClick
    }, eventHandlers), icon);

    if (action.tooltip) {
      // fix for issue #1049
      // https://github.com/mbrn/material-table/issues/1049
      return disabled ? /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
        title: action.tooltip
      }, /*#__PURE__*/_react["default"].createElement("span", null, button)) : /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
        title: action.tooltip
      }, button);
    } else {
      return button;
    }
  }

  return render();
}

MTableAction.defaultProps = {
  action: {},
  data: {}
};
MTableAction.propTypes = {
  action: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].object]).isRequired,
  data: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].arrayOf(_propTypes["default"].object)]),
  disabled: _propTypes["default"].bool,
  size: _propTypes["default"].string
};

var _default = /*#__PURE__*/_react["default"].forwardRef(function MTableActionRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTableAction, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;