"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _core = require("@material-ui/core");

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-enable no-unused-vars */
function MTablePagination(props) {
  var handleFirstPageButtonClick = function handleFirstPageButtonClick(event) {
    props.onPageChange(event, 0);
  };

  var handleBackButtonClick = function handleBackButtonClick(event) {
    props.onPageChange(event, props.page - 1);
  };

  var handleNextButtonClick = function handleNextButtonClick(event) {
    props.onPageChange(event, props.page + 1);
  };

  var handleLastPageButtonClick = function handleLastPageButtonClick(event) {
    props.onPageChange(event, Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1));
  };

  function render() {
    var classes = props.classes,
        count = props.count,
        page = props.page,
        rowsPerPage = props.rowsPerPage,
        theme = props.theme,
        showFirstLastPageButtons = props.showFirstLastPageButtons;

    var localization = _objectSpread(_objectSpread({}, MTablePagination.defaultProps.localization), props.localization);

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: classes.root,
      ref: props.forwardedRef
    }, showFirstLastPageButtons && /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
      title: localization.firstTooltip
    }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
      onClick: handleFirstPageButtonClick,
      disabled: page === 0,
      "aria-label": localization.firstAriaLabel
    }, theme.direction === 'rtl' ? /*#__PURE__*/_react["default"].createElement(props.icons.LastPage, null) : /*#__PURE__*/_react["default"].createElement(props.icons.FirstPage, null)))), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
      title: localization.previousTooltip
    }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
      onClick: handleBackButtonClick,
      disabled: page === 0,
      "aria-label": localization.previousAriaLabel
    }, theme.direction === 'rtl' ? /*#__PURE__*/_react["default"].createElement(props.icons.NextPage, null) : /*#__PURE__*/_react["default"].createElement(props.icons.PreviousPage, null)))), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      variant: "caption",
      style: {
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
        flexBasis: 'inherit'
      }
    }, localization.labelDisplayedRows.replace('{from}', props.count === 0 ? 0 : props.page * props.rowsPerPage + 1).replace('{to}', Math.min((props.page + 1) * props.rowsPerPage, props.count)).replace('{count}', props.count)), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
      title: localization.nextTooltip
    }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
      onClick: handleNextButtonClick,
      disabled: page >= Math.ceil(count / rowsPerPage) - 1,
      "aria-label": localization.nextAriaLabel
    }, theme.direction === 'rtl' ? /*#__PURE__*/_react["default"].createElement(props.icons.PreviousPage, null) : /*#__PURE__*/_react["default"].createElement(props.icons.NextPage, null)))), showFirstLastPageButtons && /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
      title: localization.lastTooltip
    }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
      onClick: handleLastPageButtonClick,
      disabled: page >= Math.ceil(count / rowsPerPage) - 1,
      "aria-label": localization.lastAriaLabel
    }, theme.direction === 'rtl' ? /*#__PURE__*/_react["default"].createElement(props.icons.FirstPage, null) : /*#__PURE__*/_react["default"].createElement(props.icons.LastPage, null)))));
  }

  return render();
}

var actionsStyles = function actionsStyles(theme) {
  return {
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      display: 'flex' // lineHeight: '48px'

    }
  };
};

MTablePagination.propTypes = {
  onPageChange: _propTypes["default"].func,
  page: _propTypes["default"].number,
  count: _propTypes["default"].number,
  rowsPerPage: _propTypes["default"].number,
  classes: _propTypes["default"].object,
  localization: _propTypes["default"].object,
  theme: _propTypes["default"].any,
  showFirstLastPageButtons: _propTypes["default"].bool
};
MTablePagination.defaultProps = {
  showFirstLastPageButtons: true,
  localization: {
    firstAriaLabel: 'First Page',
    firstTooltip: 'First Page',
    previousAriaLabel: 'Previous Page',
    previousTooltip: 'Previous Page',
    nextAriaLabel: 'Next Page',
    nextTooltip: 'Next Page',
    lastAriaLabel: 'Last Page',
    lastTooltip: 'Last Page',
    labelDisplayedRows: '{from}-{to} of {count}',
    labelRowsPerPage: 'Rows per page:'
  }
};

var MTableGroupRowRef = /*#__PURE__*/_react["default"].forwardRef(function MTablePaginationRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTablePagination, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

var MTablePaginationOuter = (0, _core.withStyles)(actionsStyles, {
  withTheme: true
})(MTableGroupRowRef);
var _default = MTablePaginationOuter;
exports["default"] = _default;