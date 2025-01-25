"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _apidomCore = require("@swagger-api/apidom-core");
var _apidomNsOpenapi = require("@swagger-api/apidom-ns-openapi-3-1");
var _toPath = _interopRequireDefault(require("../utils/to-path.js"));
class AllOfVisitor {
  options;
  SchemaElement = {
    leave(schemaElement, key, parent, path, ancestors) {
      // do nothing
      if (typeof schemaElement.allOf === 'undefined') return undefined;

      // collect error and return if allOf keyword is not an array
      if (!(0, _apidomCore.isArrayElement)(schemaElement.allOf)) {
        var _this$options$derefer;
        const error = new TypeError('allOf must be an array');
        error.fullPath = [...(0, _toPath.default)([...ancestors, parent, schemaElement]), 'allOf'];
        (_this$options$derefer = this.options.dereference.dereferenceOpts) == null || (_this$options$derefer = _this$options$derefer.errors) == null || _this$options$derefer.push == null || _this$options$derefer.push(error);
        return undefined;
      }

      // remove allOf keyword if empty
      if (schemaElement.allOf.isEmpty) {
        schemaElement.remove('allOf');
        return undefined;
      }

      // collect errors if allOf keyword contains anything else than Schema Object
      const includesSchemaElementOnly = schemaElement.allOf.content.every(_apidomNsOpenapi.isSchemaElement);
      if (!includesSchemaElementOnly) {
        var _this$options$derefer2;
        const error = new TypeError('Elements in allOf must be objects');
        error.fullPath = [...(0, _toPath.default)([...ancestors, parent, schemaElement]), 'allOf'];
        (_this$options$derefer2 = this.options.dereference.dereferenceOpts) == null || (_this$options$derefer2 = _this$options$derefer2.errors) == null || _this$options$derefer2.push == null || _this$options$derefer2.push(error);
        return undefined;
      }
      while (schemaElement.hasKey('allOf')) {
        const {
          allOf
        } = schemaElement;
        schemaElement.remove('allOf');
        const allOfMerged = _apidomCore.deepmerge.all([...allOf.content, schemaElement]);

        /**
         * If there was not an original $$ref value, make sure to remove
         * any $$ref value that may exist from the result of `allOf` merges.
         */
        if (!schemaElement.hasKey('$$ref')) {
          allOfMerged.remove('$$ref');
        }

        /**
         * If there was an example keyword in the original schema,
         * keep it instead of merging with example from other schema.
         */
        if (schemaElement.hasKey('example')) {
          const member = allOfMerged.getMember('example');
          if (member) {
            member.value = schemaElement.get('example');
          }
        }

        /**
         * If there was an examples keyword in the original schema,
         * keep it instead of merging with examples from other schema.
         */
        if (schemaElement.hasKey('examples')) {
          const member = allOfMerged.getMember('examples');
          if (member) {
            member.value = schemaElement.get('examples');
          }
        }
        schemaElement.content = allOfMerged.content;
      }
      return undefined;
    }
  };
  constructor({
    options
  }) {
    this.options = options;
  }
}
var _default = exports.default = AllOfVisitor;