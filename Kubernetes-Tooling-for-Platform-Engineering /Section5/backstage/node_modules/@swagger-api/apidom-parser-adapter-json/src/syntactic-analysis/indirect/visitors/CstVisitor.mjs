import { JsonArray, JsonDocument, JsonFalse, JsonNull, JsonNumber, JsonObject, JsonKey, JsonProperty, JsonString, JsonStringContent, JsonTrue, ParseResult, Position, Point, Literal, Error } from '@swagger-api/apidom-ast';
import TreeCursorSyntaxNode from "../../TreeCursorSyntaxNode.mjs";
export const keyMap = {
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
    const start = new Point({
      row: node.startPosition.row,
      column: node.startPosition.column,
      char: node.startIndex
    });
    const end = new Point({
      row: node.endPosition.row,
      column: node.endPosition.column,
      char: node.endIndex
    });
    return new Position({
      start,
      end
    });
  }
  document = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      return new JsonDocument({
        children: node.children,
        position,
        isMissing: node.isMissing
      });
    },
    leave: document => {
      return new ParseResult({
        children: [document]
      });
    }
  };
  enter(node) {
    // anonymous literals from CST transformed into AST literal nodes
    if (node instanceof TreeCursorSyntaxNode && !node.isNamed) {
      const position = CstVisitor.toPosition(node);
      const value = node.type || node.text;
      const {
        isMissing
      } = node;
      return new Literal({
        value,
        position,
        isMissing
      });
    }
    return undefined;
  }
  object(node) {
    const position = CstVisitor.toPosition(node);
    return new JsonObject({
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
    const key = new JsonKey({
      children: (keyNode === null || keyNode === void 0 ? void 0 : keyNode.children) || [],
      position: keyNode != null ? CstVisitor.toPosition(keyNode) : undefined,
      isMissing: keyNode != null ? keyNode.isMissing : false
    });
    return new JsonProperty({
      children: [key, ...children],
      position,
      isMissing: node.isMissing
    });
  }
  array(node) {
    const position = CstVisitor.toPosition(node);
    return new JsonArray({
      children: node.children,
      position,
      isMissing: node.isMissing
    });
  }
  string(node) {
    const position = CstVisitor.toPosition(node);
    const content = new JsonStringContent({
      value: JSON.parse(node.text)
    });
    return new JsonString({
      children: [content],
      position,
      isMissing: node.isMissing
    });
  }
  number(node) {
    const position = CstVisitor.toPosition(node);
    const value = node.text;
    return new JsonNumber({
      value,
      position,
      isMissing: node.isMissing
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  null(node) {
    const position = CstVisitor.toPosition(node);
    const value = node.text;
    return new JsonNull({
      value,
      position,
      isMissing: node.isMissing
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  true(node) {
    const position = CstVisitor.toPosition(node);
    const value = node.text;
    return new JsonTrue({
      value,
      position,
      isMissing: node.isMissing
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  false(node) {
    const position = CstVisitor.toPosition(node);
    const value = node.text;
    return new JsonFalse({
      value,
      position,
      isMissing: node.isMissing
    });
  }
  ERROR(node, key, parent, path) {
    const position = CstVisitor.toPosition(node);
    const errorNode = new Error({
      children: node.children,
      position,
      isUnexpected: !node.hasError,
      isMissing: node.isMissing,
      value: node.text
    });
    if (path.length === 0) {
      return new ParseResult({
        children: [errorNode]
      });
    }
    return errorNode;
  }
}
export default CstVisitor;