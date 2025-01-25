"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.keyMap = exports.default = void 0;
var _apidomAst = require("@swagger-api/apidom-ast");
var _TreeCursorSyntaxNode = _interopRequireDefault(require("../../TreeCursorSyntaxNode.cjs"));
const keyMap = exports.keyMap = {
  document: ['children'],
  object: ['children'],
  array: ['children'],
  string: ['children'],
  property: ['children'],
  key: ['children'],
  error: ['children']
};

/* eslint-disable class-methods-use-this */

class CstVisitor {
  static toPosition(node) {
    const start = new _apidomAst.Point({
      row: node.startPosition.row,
      column: node.startPosition.column,
      char: node.startIndex
    });
    const end = new _apidomAst.Point({
      row: node.endPosition.row,
      column: node.endPosition.column,
      char: node.endIndex
    });
    return new _apidomAst.Position({
      start,
      end
    });
  }
  document = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      return new _apidomAst.JsonDocument({
        children: node.children,
        position,
        isMissing: node.isMissing
      });
    },
    leave: document => {
      return new _apidomAst.ParseResult({
        children: [document]
      });
    }
  };
  enter(node) {
    // anonymous literals from CST transformed into AST literal nodes
    if (node instanceof _TreeCursorSyntaxNode.default && !node.isNamed) {
      const position = CstVisitor.toPosition(node);
      const value = node.type || node.text;
      const {
        isMissing
      } = node;
      return new _apidomAst.Literal({
        value,
        position,
        isMissing
      });
    }
    return undefined;
  }
  object(node) {
    const position = CstVisitor.toPosition(node);
    return new _apidomAst.JsonObject({
      children: node.children,
      position,
      isMissing: node.isMissing
    });
  }
  pair(node) {
    const position = CstVisitor.toPosition(node);
    const children = node.children.slice(1);
    const {
      keyNode
    } = node;
    const key = new _apidomAst.JsonKey({
      children: (keyNode == null ? void 0 : keyNode.children) || [],
      position: keyNode != null ? CstVisitor.toPosition(keyNode) : undefined,
      isMissing: keyNode != null ? keyNode.isMissing : false
    });
    return new _apidomAst.JsonProperty({
      children: [key, ...children],
      position,
      isMissing: node.isMissing
    });
  }
  array(node) {
    const position = CstVisitor.toPosition(node);
    return new _apidomAst.JsonArray({
      children: node.children,
      position,
      isMissing: node.isMissing
    });
  }
  string(node) {
    const position = CstVisitor.toPosition(node);
    const content = new _apidomAst.JsonStringContent({
      value: JSON.parse(node.text)
    });
    return new _apidomAst.JsonString({
      children: [content],
      position,
      isMissing: node.isMissing
    });
  }
  number(node) {
    const position = CstVisitor.toPosition(node);
    const value = node.text;
    return new _apidomAst.JsonNumber({
      value,
      position,
      isMissing: node.isMissing
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  null(node) {
    const position = CstVisitor.toPosition(node);
    const value = node.text;
    return new _apidomAst.JsonNull({
      value,
      position,
      isMissing: node.isMissing
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  true(node) {
    const position = CstVisitor.toPosition(node);
    const value = node.text;
    return new _apidomAst.JsonTrue({
      value,
      position,
      isMissing: node.isMissing
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  false(node) {
    const position = CstVisitor.toPosition(node);
    const value = node.text;
    return new _apidomAst.JsonFalse({
      value,
      position,
      isMissing: node.isMissing
    });
  }
  ERROR(node, key, parent, path) {
    const position = CstVisitor.toPosition(node);
    const errorNode = new _apidomAst.Error({
      children: node.children,
      position,
      isUnexpected: !node.hasError,
      isMissing: node.isMissing,
      value: node.text
    });
    if (path.length === 0) {
      return new _apidomAst.ParseResult({
        children: [errorNode]
      });
    }
    return errorNode;
  }
}
var _default = exports.default = CstVisitor;