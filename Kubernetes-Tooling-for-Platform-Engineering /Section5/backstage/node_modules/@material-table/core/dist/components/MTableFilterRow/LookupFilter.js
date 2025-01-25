"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

var _core = require("@material-ui/core");

var ITEM_HEIGHT = 48;
var ITEM_PADDING_TOP = 8;
var MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function LookupFilter(_ref) {
  var columnDef = _ref.columnDef,
      onFilterChanged = _ref.onFilterChanged,
      forwardedRef = _ref.forwardedRef;

  var _useState = (0, _react.useState)(columnDef.tableData.filterValue || []),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      selectedFilter = _useState2[0],
      setSelectedFilter = _useState2[1];

  (0, _react.useEffect)(function () {
    setSelectedFilter(columnDef.tableData.filterValue || []);
  }, [columnDef.tableData.filterValue]);
  return /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
    style: {
      width: '100%'
    },
    ref: forwardedRef
  }, /*#__PURE__*/_react["default"].createElement(_core.InputLabel, {
    htmlFor: 'select-multiple-checkbox' + columnDef.tableData.id,
    style: {
      marginTop: -16
    }
  }, (0, _utils.getLocalizedFilterPlaceHolder)(columnDef)), /*#__PURE__*/_react["default"].createElement(_core.Select, {
    multiple: true,
    value: selectedFilter,
    onClose: function onClose() {
      if (columnDef.filterOnItemSelect !== true) {
        onFilterChanged(columnDef.tableData.id, selectedFilter);
      }
    },
    onChange: function onChange(event) {
      setSelectedFilter(event.target.value);

      if (columnDef.filterOnItemSelect === true) {
        onFilterChanged(columnDef.tableData.id, event.target.value);
      }
    },
    input: /*#__PURE__*/_react["default"].createElement(_core.Input, {
      id: 'select-multiple-checkbox' + columnDef.tableData.id
    }),
    renderValue: function renderValue(selectedArr) {
      return selectedArr.map(function (selected) {
        return columnDef.lookup[selected];
      }).join(', ');
    },
    MenuProps: MenuProps,
    style: {
      marginTop: 0
    }
  }, Object.keys(columnDef.lookup).map(function (key) {
    return /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
      key: key,
      value: key
    }, /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      checked: selectedFilter.indexOf(key.toString()) > -1
    }), /*#__PURE__*/_react["default"].createElement(_core.ListItemText, {
      primary: columnDef.lookup[key]
    }));
  })));
}

var _default = /*#__PURE__*/_react["default"].forwardRef(function LookupFilterRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(LookupFilter, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;