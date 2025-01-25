"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function MTableEditCell(props) {
  var _useState = (0, _react.useState)(function () {
    return {
      isLoading: false,
      value: props.rowData[props.columnDef.field]
    };
  }),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  (0, _react.useEffect)(function () {
    props.cellEditable.onCellEditApproved(state.value, // newValue
    props.rowData[props.columnDef.field], // oldValue
    props.rowData, // rowData with old value
    props.columnDef // columnDef
    ).then(function () {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        isLoading: false
      }));
      props.onCellEditFinished(props.rowData, props.columnDef);
    })["catch"](function () {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        isLoading: false
      }));
    });
  }, []);

  var getStyle = function getStyle() {
    var cellStyle = {
      boxShadow: '2px 0px 15px rgba(125,147,178,.25)',
      color: 'inherit',
      width: props.columnDef.tableData.width,
      boxSizing: 'border-box',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      padding: '0 16px'
    };

    if (typeof props.columnDef.cellStyle === 'function') {
      cellStyle = _objectSpread(_objectSpread({}, cellStyle), props.columnDef.cellStyle(state.value, props.rowData));
    } else {
      cellStyle = _objectSpread(_objectSpread({}, cellStyle), props.columnDef.cellStyle);
    }

    if (typeof props.cellEditable.cellStyle === 'function') {
      cellStyle = _objectSpread(_objectSpread({}, cellStyle), props.cellEditable.cellStyle(state.value, props.rowData, props.columnDef));
    } else {
      cellStyle = _objectSpread(_objectSpread({}, cellStyle), props.cellEditable.cellStyle);
    }

    return cellStyle;
  };

  var handleKeyDown = function handleKeyDown(e) {
    if (e.keyCode === 13) {
      onApprove();
    } else if (e.keyCode === 27) {
      onCancel();
    }
  };

  var onApprove = function onApprove() {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      isLoading: true
    }));
  };

  var onCancel = function onCancel() {
    props.onCellEditFinished(props.rowData, props.columnDef);
  };

  function renderActions() {
    if (state.isLoading) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'center',
          width: 60
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.CircularProgress, {
        size: 20
      }));
    }

    var actions = [{
      icon: props.icons.Check,
      tooltip: props.localization && props.localization.saveTooltip,
      onClick: onApprove,
      disabled: state.isLoading
    }, {
      icon: props.icons.Clear,
      tooltip: props.localization && props.localization.cancelTooltip,
      onClick: onCancel,
      disabled: state.isLoading
    }];
    return /*#__PURE__*/_react["default"].createElement(props.components.Actions, {
      actions: actions,
      components: props.components,
      size: "small"
    });
  }

  return /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
    size: props.size,
    style: getStyle(),
    padding: "none",
    ref: props.forwardedRef
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      flex: 1,
      marginRight: 4
    }
  }, /*#__PURE__*/_react["default"].createElement(props.components.EditField, {
    columnDef: props.columnDef,
    value: state.value,
    onChange: function onChange(prevState, value) {
      return setState(_objectSpread(_objectSpread({}, prevState), {}, {
        value: value
      }));
    },
    onKeyDown: handleKeyDown,
    disabled: state.isLoading,
    rowData: props.rowData,
    autoFocus: true
  })), renderActions()));
}

MTableEditCell.defaultProps = {
  columnDef: {},
  localization: {
    saveTooltip: 'Save',
    cancelTooltip: 'Cancel'
  }
};
MTableEditCell.propTypes = {
  cellEditable: _propTypes["default"].object.isRequired,
  columnDef: _propTypes["default"].object.isRequired,
  components: _propTypes["default"].object.isRequired,
  errorState: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].bool]),
  icons: _propTypes["default"].object.isRequired,
  localization: _propTypes["default"].object.isRequired,
  onCellEditFinished: _propTypes["default"].func.isRequired,
  rowData: _propTypes["default"].object.isRequired,
  size: _propTypes["default"].string,
  forwardedRef: _propTypes["default"].element
};

var _default = /*#__PURE__*/_react["default"].forwardRef(function MTableEditCellRef(props, ref) {
  return (0, _core.withTheme)( /*#__PURE__*/_react["default"].createElement(MTableEditCell, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  })));
});

exports["default"] = _default;