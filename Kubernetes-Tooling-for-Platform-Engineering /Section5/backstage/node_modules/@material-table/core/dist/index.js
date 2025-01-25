"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MTableAction", {
  enumerable: true,
  get: function get() {
    return _components.MTableAction;
  }
});
Object.defineProperty(exports, "MTableActions", {
  enumerable: true,
  get: function get() {
    return _components.MTableActions;
  }
});
Object.defineProperty(exports, "MTableBody", {
  enumerable: true,
  get: function get() {
    return _components.MTableBody;
  }
});
Object.defineProperty(exports, "MTableBodyRow", {
  enumerable: true,
  get: function get() {
    return _components.MTableBodyRow;
  }
});
Object.defineProperty(exports, "MTableCell", {
  enumerable: true,
  get: function get() {
    return _components.MTableCell;
  }
});
Object.defineProperty(exports, "MTableEditCell", {
  enumerable: true,
  get: function get() {
    return _components.MTableEditCell;
  }
});
Object.defineProperty(exports, "MTableEditField", {
  enumerable: true,
  get: function get() {
    return _components.MTableEditField;
  }
});
Object.defineProperty(exports, "MTableEditRow", {
  enumerable: true,
  get: function get() {
    return _components.MTableEditRow;
  }
});
Object.defineProperty(exports, "MTableFilterRow", {
  enumerable: true,
  get: function get() {
    return _components.MTableFilterRow;
  }
});
Object.defineProperty(exports, "MTableGroupRow", {
  enumerable: true,
  get: function get() {
    return _components.MTableGroupRow;
  }
});
Object.defineProperty(exports, "MTableGroupbar", {
  enumerable: true,
  get: function get() {
    return _components.MTableGroupbar;
  }
});
Object.defineProperty(exports, "MTableHeader", {
  enumerable: true,
  get: function get() {
    return _components.MTableHeader;
  }
});
Object.defineProperty(exports, "MTablePagination", {
  enumerable: true,
  get: function get() {
    return _components.MTablePagination;
  }
});
Object.defineProperty(exports, "MTableSteppedPagination", {
  enumerable: true,
  get: function get() {
    return _components.MTableSteppedPagination;
  }
});
Object.defineProperty(exports, "MTableToolbar", {
  enumerable: true,
  get: function get() {
    return _components.MTableToolbar;
  }
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("./utils/polyfill");

var _react = _interopRequireDefault(require("react"));

var _defaults = require("./defaults");

var _propTypes = require("./prop-types");

var _materialTable = _interopRequireDefault(require("./material-table"));

var _core = require("@material-ui/core");

var _components = require("./components");

_materialTable["default"].defaultProps = _defaults.defaultProps;
_materialTable["default"].propTypes = _propTypes.propTypes;

var styles = function styles(theme) {
  return {
    paginationRoot: {
      width: '100%'
    },
    paginationToolbar: {
      padding: 0,
      width: '100%'
    },
    paginationCaption: {
      display: 'none'
    },
    paginationSelectRoot: {
      margin: 0
    }
  };
};

var _default = (0, _core.withStyles)(styles, {
  withTheme: true
})(function (props) {
  return /*#__PURE__*/_react["default"].createElement(_materialTable["default"], (0, _extends2["default"])({}, props, {
    ref: props.tableRef
  }));
});

exports["default"] = _default;