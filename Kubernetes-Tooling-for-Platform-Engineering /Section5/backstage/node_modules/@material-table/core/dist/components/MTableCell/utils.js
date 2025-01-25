"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmptyValue = getEmptyValue;
exports.getCurrencyValue = getCurrencyValue;
exports.getStyle = getStyle;
exports.getRenderValue = getRenderValue;
exports.isoDateRegex = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _parseISO = _interopRequireDefault(require("date-fns/parseISO"));

var CommonValues = _interopRequireWildcard(require("../../utils/common-values"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-disable no-useless-escape */
var isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])([T\s](([01]\d|2[0-3])\:[0-5]\d|24\:00)(\:[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3])\:?([0-5]\d)?)?)?$/;
/* eslint-enable no-useless-escape */

exports.isoDateRegex = isoDateRegex;

function getEmptyValue() {
  var emptyValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof emptyValue === 'function') {
    return props.columnDef.emptyValue(props.rowData);
  } else {
    return emptyValue;
  }
}

function getCurrencyValue(currencySetting, value) {
  if (currencySetting !== undefined) {
    return new Intl.NumberFormat(currencySetting.locale !== undefined ? currencySetting.locale : 'en-US', {
      style: 'currency',
      currency: currencySetting.currencyCode !== undefined ? currencySetting.currencyCode : 'USD',
      minimumFractionDigits: currencySetting.minimumFractionDigits !== undefined ? currencySetting.minimumFractionDigits : 2,
      maximumFractionDigits: currencySetting.maximumFractionDigits !== undefined ? currencySetting.maximumFractionDigits : 2
    }).format(value !== undefined ? value : 0);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value !== undefined ? value : 0);
  }
}

function getStyle(props) {
  var width = CommonValues.reducePercentsInCalc(props.columnDef.tableData.width, props.scrollWidth);
  var cellStyle = {
    color: 'inherit',
    width: width,
    maxWidth: props.columnDef.maxWidth,
    minWidth: props.columnDef.minWidth,
    boxSizing: 'border-box',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    fontWeight: 'inherit'
  };

  if (typeof props.columnDef.cellStyle === 'function') {
    cellStyle = _objectSpread(_objectSpread({}, cellStyle), props.columnDef.cellStyle(props.value, props.rowData));
  } else {
    cellStyle = _objectSpread(_objectSpread({}, cellStyle), props.columnDef.cellStyle);
  }

  if (props.columnDef.disableClick) {
    cellStyle.cursor = 'default';
  }

  return _objectSpread(_objectSpread({}, props.style), cellStyle);
}

function getRenderValue(props) {
  var dateLocale = props.columnDef.dateSetting && props.columnDef.dateSetting.locale ? props.columnDef.dateSetting.locale : undefined;

  if (props.columnDef.emptyValue !== undefined && (props.value === undefined || props.value === null)) {
    return getEmptyValue(props.columnDef.emptyValue, props);
  }

  if (props.columnDef.render) {
    if (props.rowData) {
      return props.columnDef.render(props.rowData, 'row');
    } else if (props.value) {
      return props.columnDef.render(props.value, 'group');
    }
  } else if (props.columnDef.type === 'boolean') {
    var style = {
      textAlign: 'left',
      verticalAlign: 'middle',
      width: 48
    };

    if (props.value) {
      return /*#__PURE__*/_react["default"].createElement(props.icons.Check, {
        style: style
      });
    } else {
      return /*#__PURE__*/_react["default"].createElement(props.icons.ThirdStateCheck, {
        style: style
      });
    }
  } else if (props.columnDef.type === 'date') {
    if (props.value instanceof Date) {
      return props.value.toLocaleDateString(dateLocale);
    } else if (isoDateRegex.exec(props.value)) {
      return (0, _parseISO["default"])(props.value).toLocaleDateString(dateLocale);
    } else {
      return props.value;
    }
  } else if (props.columnDef.type === 'time') {
    if (props.value instanceof Date) {
      return props.value.toLocaleTimeString();
    } else if (isoDateRegex.exec(props.value)) {
      return (0, _parseISO["default"])(props.value).toLocaleTimeString(dateLocale);
    } else {
      return props.value;
    }
  } else if (props.columnDef.type === 'datetime') {
    if (props.value instanceof Date) {
      return props.value.toLocaleString();
    } else if (isoDateRegex.exec(props.value)) {
      return (0, _parseISO["default"])(props.value).toLocaleString(dateLocale);
    } else {
      return props.value;
    }
  } else if (props.columnDef.type === 'currency') {
    return getCurrencyValue(props.columnDef.currencySetting, props.value);
  } else if (typeof props.value === 'boolean') {
    // To avoid forwardref boolean children.
    return props.value.toString();
  }

  return props.value;
}