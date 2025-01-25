"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function MTableGroupRow(props) {
  var rotateIconStyle = function rotateIconStyle(isOpen) {
    return {
      transform: isOpen ? 'rotate(90deg)' : 'none'
    };
  };

  function render() {
    var colSpan = props.columns.filter(function (columnDef) {
      return !columnDef.hidden;
    }).length;
    props.options.selection && colSpan++;
    props.detailPanel && colSpan++;
    props.actions && props.actions.length > 0 && colSpan++;
    var column = props.groups[props.level];
    var detail;

    if (props.groupData.isExpanded) {
      if (props.groups.length > props.level + 1) {
        // Is there another group
        detail = props.groupData.groups.map(function (groupData, index) {
          return /*#__PURE__*/_react["default"].createElement(props.components.GroupRow, {
            actions: props.actions,
            key: groupData.value || '' + index,
            columns: props.columns,
            components: props.components,
            detailPanel: props.detailPanel,
            getFieldValue: props.getFieldValue,
            groupData: groupData,
            groups: props.groups,
            icons: props.icons,
            level: props.level + 1,
            path: [].concat((0, _toConsumableArray2["default"])(props.path), [index]),
            onGroupExpandChanged: props.onGroupExpandChanged,
            onRowSelected: props.onRowSelected,
            onRowClick: props.onRowClick,
            onToggleDetailPanel: props.onToggleDetailPanel,
            onTreeExpandChanged: props.onTreeExpandChanged,
            onEditingCanceled: props.onEditingCanceled,
            onEditingApproved: props.onEditingApproved,
            options: props.options,
            hasAnyEditingRow: props.hasAnyEditingRow,
            isTreeData: props.isTreeData,
            cellEditable: props.cellEditable,
            onCellEditStarted: props.onCellEditStarted,
            onCellEditFinished: props.onCellEditFinished,
            scrollWidth: props.scrollWidth,
            treeDataMaxLevel: props.treeDataMaxLevel
          });
        });
      } else {
        detail = props.groupData.data.map(function (rowData, index) {
          if (rowData.tableData.editing) {
            return /*#__PURE__*/_react["default"].createElement(props.components.EditRow, {
              columns: props.columns,
              components: props.components,
              data: rowData,
              icons: props.icons,
              path: [].concat((0, _toConsumableArray2["default"])(props.path), [index]),
              localization: props.localization,
              key: index,
              mode: rowData.tableData.editing,
              options: props.options,
              isTreeData: props.isTreeData,
              detailPanel: props.detailPanel,
              onEditingCanceled: props.onEditingCanceled,
              onEditingApproved: props.onEditingApproved,
              getFieldValue: props.getFieldValue,
              onBulkEditRowChanged: props.onBulkEditRowChanged,
              scrollWidth: props.scrollWidth
            });
          } else {
            return /*#__PURE__*/_react["default"].createElement(props.components.Row, {
              actions: props.actions,
              key: index,
              columns: props.columns,
              components: props.components,
              data: rowData,
              detailPanel: props.detailPanel,
              level: (props.level || 0) + 1,
              getFieldValue: props.getFieldValue,
              icons: props.icons,
              path: [].concat((0, _toConsumableArray2["default"])(props.path), [index]),
              onRowSelected: props.onRowSelected,
              onRowClick: props.onRowClick,
              onToggleDetailPanel: props.onToggleDetailPanel,
              options: props.options,
              isTreeData: props.isTreeData,
              onTreeExpandChanged: props.onTreeExpandChanged,
              onEditingCanceled: props.onEditingCanceled,
              onEditingApproved: props.onEditingApproved,
              hasAnyEditingRow: props.hasAnyEditingRow,
              cellEditable: props.cellEditable,
              onCellEditStarted: props.onCellEditStarted,
              onCellEditFinished: props.onCellEditFinished,
              scrollWidth: props.scrollWidth,
              treeDataMaxLevel: props.treeDataMaxLevel
            });
          }
        });
      }
    }

    var freeCells = [];

    for (var i = 0; i < props.level; i++) {
      freeCells.push( /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
        padding: "checkbox",
        key: i
      }));
    }

    var value = props.groupData.value;

    if (column.lookup) {
      value = column.lookup[value];
    }

    var title = column.title;

    if (typeof props.options.groupTitle === 'function') {
      title = props.options.groupTitle(props.groupData);
    } else if (typeof title !== 'string') {
      title = /*#__PURE__*/_react["default"].cloneElement(title);
    }

    var separator = props.options.groupRowSeparator || ': ';
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_TableRow["default"], {
      ref: props.forwardedRef
    }, freeCells, /*#__PURE__*/_react["default"].createElement(props.components.Cell, {
      colSpan: colSpan,
      padding: "none",
      columnDef: column,
      value: value,
      icons: props.icons
    }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
      style: _objectSpread({
        transition: 'all ease 200ms'
      }, rotateIconStyle(props.groupData.isExpanded)),
      onClick: function onClick(event) {
        props.onGroupExpandChanged(props.path);
      }
    }, /*#__PURE__*/_react["default"].createElement(props.icons.DetailPanel, null)), /*#__PURE__*/_react["default"].createElement("b", null, title, separator)))), detail);
  }

  return render();
}

MTableGroupRow.defaultProps = {
  columns: [],
  groups: [],
  level: 0,
  options: {}
};
MTableGroupRow.propTypes = {
  actions: _propTypes["default"].array,
  columns: _propTypes["default"].arrayOf(_propTypes["default"].object),
  components: _propTypes["default"].object,
  cellEditable: _propTypes["default"].object,
  detailPanel: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].object)]),
  forwardedRef: _propTypes["default"].element,
  getFieldValue: _propTypes["default"].func,
  groupData: _propTypes["default"].object,
  groups: _propTypes["default"].arrayOf(_propTypes["default"].object),
  hasAnyEditingRow: _propTypes["default"].bool,
  icons: _propTypes["default"].object,
  isTreeData: _propTypes["default"].bool.isRequired,
  level: _propTypes["default"].number,
  localization: _propTypes["default"].object,
  onBulkEditRowChanged: _propTypes["default"].func,
  onCellEditFinished: _propTypes["default"].func,
  onCellEditStarted: _propTypes["default"].func,
  onEditingApproved: _propTypes["default"].func,
  onEditingCanceled: _propTypes["default"].func,
  onGroupExpandChanged: _propTypes["default"].func,
  onRowClick: _propTypes["default"].func,
  onRowSelected: _propTypes["default"].func,
  onToggleDetailPanel: _propTypes["default"].func.isRequired,
  onTreeExpandChanged: _propTypes["default"].func.isRequired,
  options: _propTypes["default"].object,
  path: _propTypes["default"].arrayOf(_propTypes["default"].number),
  scrollWidth: _propTypes["default"].number.isRequired,
  treeDataMaxLevel: _propTypes["default"].number
};

var _default = /*#__PURE__*/_react["default"].forwardRef(function MTableGroupRowRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTableGroupRow, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;