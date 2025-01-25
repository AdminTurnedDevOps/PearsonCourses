"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProps = void 0;

var _props = _interopRequireDefault(require("./props.components"));

var _props2 = _interopRequireDefault(require("./props.icons"));

var _props3 = _interopRequireDefault(require("./props.localization"));

var _props4 = _interopRequireDefault(require("./props.options"));

var defaultProps = {
  actions: [],
  classes: {},
  columns: [],
  components: _props["default"],
  data: [],
  icons: _props2["default"],
  isLoading: false,
  title: 'Table Title',
  options: _props4["default"],
  localization: _props3["default"],
  style: {}
};
exports.defaultProps = defaultProps;