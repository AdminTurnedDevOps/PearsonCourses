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

var _Hidden = _interopRequireDefault(require("@material-ui/core/Hidden"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-enable no-unused-vars */
function MTablePaginationInner(props) {
  var handleFirstPageButtonClick = function handleFirstPageButtonClick(event) {
    props.onPageChange(event, 0);
  };

  var handleBackButtonClick = function handleBackButtonClick(event) {
    props.onPageChange(event, props.page - 1);
  };

  var handleNextButtonClick = function handleNextButtonClick(event) {
    props.onPageChange(event, props.page + 1);
  };

  var handleNumberButtonClick = function handleNumberButtonClick(number) {
    return function (event) {
      props.onPageChange(event, number);
    };
  };

  var handleLastPageButtonClick = function handleLastPageButtonClick(event) {
    props.onPageChange(event, Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1));
  };

  function renderPagesButton(start, end) {
    var buttons = [];

    for (var p = start; p <= end; p++) {
      var buttonVariant = p === props.page ? 'contained' : 'text';
      buttons.push( /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        size: "small",
        style: {
          boxShadow: 'none',
          maxWidth: '30px',
          maxHeight: '30px',
          minWidth: '30px',
          minHeight: '30px'
        },
        disabled: p === props.page,
        variant: buttonVariant,
        onClick: handleNumberButtonClick(p),
        key: p
      }, p + 1));
    }

    return /*#__PURE__*/_react["default"].createElement("span", null, buttons);
  }

  function render() {
    var classes = props.classes,
        count = props.count,
        page = props.page,
        rowsPerPage = props.rowsPerPage,
        theme = props.theme,
        showFirstLastPageButtons = props.showFirstLastPageButtons;

    var localization = _objectSpread(_objectSpread({}, MTablePaginationInner.defaultProps.localization), props.localization);

    var maxPages = Math.ceil(count / rowsPerPage) - 1;
    var pageStart = Math.max(page - 1, 0);
    var pageEnd = Math.min(maxPages, page + 1);
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
    }, /*#__PURE__*/_react["default"].createElement(props.icons.PreviousPage, null)))), /*#__PURE__*/_react["default"].createElement(_Hidden["default"], {
      smDown: true
    }, renderPagesButton(pageStart, pageEnd)), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
      title: localization.nextTooltip
    }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
      onClick: handleNextButtonClick,
      disabled: page >= maxPages,
      "aria-label": localization.nextAriaLabel
    }, /*#__PURE__*/_react["default"].createElement(props.icons.NextPage, null)))), showFirstLastPageButtons && /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
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
      marginLeft: theme.spacing(2.5)
    }
  };
};

MTablePaginationInner.propTypes = {
  onPageChange: _propTypes["default"].func,
  page: _propTypes["default"].number,
  count: _propTypes["default"].number,
  rowsPerPage: _propTypes["default"].number,
  classes: _propTypes["default"].object,
  localization: _propTypes["default"].object,
  theme: _propTypes["default"].any,
  showFirstLastPageButtons: _propTypes["default"].bool
};
MTablePaginationInner.defaultProps = {
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

var MTableSteppedPaginationRef = /*#__PURE__*/_react["default"].forwardRef(function MTableSteppedPaginationRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTablePaginationInner, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

var MTableSteppedPagination = (0, _core.withStyles)(actionsStyles, {
  withTheme: true
})(MTableSteppedPaginationRef);
var _default = MTableSteppedPagination;
exports["default"] = _default;