"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MTableSummaryRow = MTableSummaryRow;
exports["default"] = exports.styles = void 0;

var React = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _utils = require("../MTableCell/utils");

var CommonValues = _interopRequireWildcard(require("../../utils/common-values"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function MTableSummaryRow(_ref) {
  var data = _ref.data,
      columns = _ref.columns,
      currentData = _ref.currentData,
      rowProps = _ref.rowProps,
      renderSummaryRow = _ref.renderSummaryRow;

  if (!renderSummaryRow) {
    return null;
  }

  function renderPlaceholderColumn(key) {
    var numIcons = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var size = CommonValues.elementSize(rowProps);
    var width = numIcons * CommonValues.baseIconSize(rowProps);
    return /*#__PURE__*/React.createElement(_core.TableCell, {
      key: "placeholder.".concat(key),
      size: size,
      padding: "none",
      style: {
        width: width,
        padding: '0px 5px',
        boxSizing: 'border-box'
      }
    });
  }

  var placeholderLeftColumns = [];
  var placeholderRightColumns = [];
  var placeholderKey = 0; // Create empty columns corresponding to selection, actions, detail panel, and tree data icons

  if (rowProps.options.selection) {
    placeholderLeftColumns.push(renderPlaceholderColumn(placeholderKey++));
  }

  if (rowProps.actions && rowProps.actions.filter(function (a) {
    return a.position === 'row' || typeof a === 'function';
  }).length > 0) {
    var numRowActions = CommonValues.rowActions(rowProps).length;

    if (rowProps.options.actionsColumnIndex === -1) {
      placeholderRightColumns.push(renderPlaceholderColumn(placeholderKey++, numRowActions));
    } else if (rowProps.options.actionsColumnIndex >= 0) {
      placeholderLeftColumns.push(renderPlaceholderColumn(placeholderKey++, numRowActions));
    }
  }

  if (rowProps.detailPanel && rowProps.options.showDetailPanelIcon) {
    if (rowProps.options.detailPanelColumnAlignment === 'right') {
      placeholderRightColumns.push(renderPlaceholderColumn(placeholderKey++));
    } else {
      placeholderLeftColumns.push(renderPlaceholderColumn(placeholderKey++));
    }
  }

  if (rowProps.isTreeData) {
    placeholderLeftColumns.push(renderPlaceholderColumn(placeholderKey++));
  }

  return /*#__PURE__*/React.createElement(_core.TableRow, null, placeholderLeftColumns, columns.map(function (column, index) {
    var summaryColumn = renderSummaryRow({
      index: index,
      column: column,
      data: data,
      currentData: currentData,
      columns: columns
    });
    var cellAlignment = column.align !== undefined ? column.align : ['numeric', 'currency'].indexOf(column.type) !== -1 ? 'right' : 'left';
    var value = '';
    var style = (0, _utils.getStyle)({
      columnDef: column,
      scrollWidth: 0
    });

    if (summaryColumn && summaryColumn.value) {
      value = summaryColumn.value;
      style = summaryColumn.style;
    } else {
      value = summaryColumn;
    }

    return /*#__PURE__*/React.createElement(_core.TableCell, {
      key: index,
      style: style,
      align: cellAlignment
    }, value);
  }), placeholderRightColumns);
}

MTableSummaryRow.propTypes = {
  data: _propTypes["default"].array,
  currentData: _propTypes["default"].array,
  columns: _propTypes["default"].array,
  renderSummaryRow: _propTypes["default"].func
};

var styles = function styles(theme) {
  return {};
};

exports.styles = styles;

var _default = (0, _core.withStyles)(styles)(MTableSummaryRow);

exports["default"] = _default;