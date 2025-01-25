"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _apidomCore = require("@swagger-api/apidom-core");
var _TreeCursorSyntaxNode = _interopRequireDefault(require("../../TreeCursorSyntaxNode.cjs"));
/* eslint-disable no-underscore-dangle */

class CstVisitor {
  static toPosition(node) {
    const start = new _apidomCore.ArrayElement([node.startPosition.row, node.startPosition.column, node.startIndex]);
    const end = new _apidomCore.ArrayElement([node.endPosition.row, node.endPosition.column, node.endIndex]);
    start.classes.push('position');
    end.classes.push('position');
    return [start, end];
  }
  sourceMap = false;
  annotations;
  ParseResultElement = {
    leave: element => {
      // mark first-non Annotation element as result
      // @ts-ignore
      const elements = element.findElements(_apidomCore.isPrimitiveElement);
      if (elements.length > 0) {
        const resultElement = elements[0];
        resultElement.classes.push('result');
      }

      // provide annotations
      this.annotations.forEach(annotationElement => {
        element.push(annotationElement);
      });
      this.annotations = [];
    }
  };
  constructor() {
    this.annotations = [];
  }
  enter(node) {
    // missing anonymous literals from CST transformed into AnnotationElements.
    if (node instanceof _TreeCursorSyntaxNode.default && !node.isNamed && node.isMissing) {
      // collect annotations from missing literals
      const value = node.type || node.text;
      const message = `(Missing ${value})`;
      const element = new _apidomCore.AnnotationElement(message);
      element.classes.push('warning');
      this.maybeAddSourceMap(node, element);
      this.annotations.push(element);
    }
    return null; // remove everything unrecognized
  }
  document(node) {
    const element = new _apidomCore.ParseResultElement();
    // @ts-ignore
    element._content = node.children;
    this.maybeAddSourceMap(node, element);
    return element;
  }
  object(node) {
    const element = new _apidomCore.ObjectElement();
    // @ts-ignore
    element._content = node.children;
    this.maybeAddSourceMap(node, element);
    return element;
  }
  array(node) {
    const element = new _apidomCore.ArrayElement();
    // @ts-ignore
    element._content = node.children;
    this.maybeAddSourceMap(node, element);
    return element;
  }
  pair(node) {
    const element = new _apidomCore.MemberElement();
    // @ts-ignore
    element.content.key = node.keyNode;
    // @ts-ignore
    element.content.value = node.valueNode;
    this.maybeAddSourceMap(node, element);

    /**
     * Process possible errors here that may be present in pair node children as we're using direct field access.
     * There are usually 3 children here found: "key", ":", "value".
     */
    if (node.children.length > 3) {
      node.children.filter(child => child.type === 'ERROR').forEach(errorNode => {
        this.ERROR(errorNode, node, [], [node]);
      });
    }
    return element;
  }
  string(node) {
    const element = new _apidomCore.StringElement(JSON.parse(node.text));
    this.maybeAddSourceMap(node, element);
    return element;
  }
  number(node) {
    const element = new _apidomCore.NumberElement(Number(node.text));
    this.maybeAddSourceMap(node, element);
    return element;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  null(node) {
    const element = new _apidomCore.NullElement();
    this.maybeAddSourceMap(node, element);
    return element;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  true(node) {
    const element = new _apidomCore.BooleanElement(true);
    this.maybeAddSourceMap(node, element);
    return element;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  false(node) {
    const element = new _apidomCore.BooleanElement(false);
    this.maybeAddSourceMap(node, element);
    return element;
  }
  ERROR(node, key, parent, path) {
    // collect errors as annotations
    const isUnexpected = !node.hasError;
    const value = node.text;
    const message = isUnexpected ? `(Unexpected ${value})` : `(Error ${value})`;
    const element = new _apidomCore.AnnotationElement(message);
    element.classes.push('error');
    this.maybeAddSourceMap(node, element);
    if (path.length === 0) {
      // no document to visit, only error is present in CST
      const parseResultElement = new _apidomCore.ParseResultElement();
      parseResultElement.push(element);
      return parseResultElement;
    }

    // we have CST node for document
    this.annotations.push(element);
    return null;
  }
  maybeAddSourceMap(node, element) {
    if (!this.sourceMap) {
      return;
    }
    const sourceMap = new _apidomCore.SourceMapElement();
    const position = CstVisitor.toPosition(node);
    if (position !== null) {
      const [start, end] = position;
      sourceMap.push(start);
      sourceMap.push(end);
    }
    // @ts-ignore
    sourceMap.astNode = node;
    element.meta.set('sourceMap', sourceMap);
  }
}

/* eslint-enable no-underscore-dangle */
var _default = exports.default = CstVisitor;