"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.keyMap = exports.isNode = exports.default = void 0;
var _apidomAst = require("@swagger-api/apidom-ast");
var _TreeCursorSyntaxNode = _interopRequireDefault(require("../../TreeCursorSyntaxNode.cjs"));
const keyMap = exports.keyMap = {
  stream: ['children'],
  document: ['children'],
  mapping: ['children'],
  keyValuePair: ['children'],
  sequence: ['children'],
  error: ['children']
};
const isNode = node => Array.isArray(node) || (0, _apidomAst.isNode)(node);

/* eslint-disable no-param-reassign */
exports.isNode = isNode;
class CstVisitor {
  static isScalar = this.isKind('scalar');
  static isMapping = this.isKind('mapping');
  static isSequence = this.isKind('sequence');
  static isKind(ending) {
    return node => node != null && typeof node === 'object' && 'type' in node && typeof node.type === 'string' && node.type.endsWith(ending);
  }
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
  static kindNodeToYamlAnchor(node) {
    const {
      anchor: anchorNode
    } = node;
    if (typeof anchorNode === 'undefined') return undefined;
    return new _apidomAst.YamlAnchor({
      name: anchorNode.text,
      position: CstVisitor.toPosition(anchorNode)
    });
  }
  static hasKeyValuePairEmptyKey(node) {
    if (node.type !== 'block_mapping_pair' && node.type !== 'flow_pair') {
      return false;
    }
    // keyNode was not explicitly provided; tag and anchor are missing too
    return typeof node.keyNode === 'undefined';
  }
  static hasKeyValuePairEmptyValue(node) {
    if (node.type !== 'block_mapping_pair' && node.type !== 'flow_pair') {
      return false;
    }
    // valueNode was not explicitly provided; tag and anchor are missing too
    return typeof node.valueNode === 'undefined';
  }
  static kindNodeToYamlTag(node) {
    const {
      tag: tagNode
    } = node;
    const explicitName = (tagNode == null ? void 0 : tagNode.text) || (node.type === 'plain_scalar' ? '?' : '!');
    const kind = node.type.endsWith('mapping') ? _apidomAst.YamlNodeKind.Mapping : node.type.endsWith('sequence') ? _apidomAst.YamlNodeKind.Sequence : _apidomAst.YamlNodeKind.Scalar;
    const position = tagNode ? CstVisitor.toPosition(tagNode) : undefined;
    return new _apidomAst.YamlTag({
      explicitName,
      kind,
      position
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema;
  referenceManager;
  stream = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      return new _apidomAst.YamlStream({
        children: node.children,
        position,
        isMissing: node.isMissing
      });
    },
    leave: stream => {
      return new _apidomAst.ParseResult({
        children: [stream]
      });
    }
  };
  yaml_directive = {
    enter: node => {
      var _node$firstNamedChild;
      const position = CstVisitor.toPosition(node);
      const version = node == null || (_node$firstNamedChild = node.firstNamedChild) == null ? void 0 : _node$firstNamedChild.text;
      return new _apidomAst.YamlDirective({
        position,
        name: '%YAML',
        parameters: {
          version
        }
      });
    }
  };
  tag_directive = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      const tagHandleNode = node.children[0];
      const tagPrefixNode = node.children[1];
      const tagDirective = new _apidomAst.YamlDirective({
        position,
        name: '%TAG',
        parameters: {
          handle: tagHandleNode == null ? void 0 : tagHandleNode.text,
          prefix: tagPrefixNode == null ? void 0 : tagPrefixNode.text
        }
      });
      this.schema.registerTagDirective(tagDirective);
      return tagDirective;
    }
  };
  reserved_directive = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      const directiveNameNode = node.children[0];
      const directiveParameter1Node = node.children[1];
      const directiveParameter2Node = node.children[2];
      return new _apidomAst.YamlDirective({
        position,
        name: directiveNameNode == null ? void 0 : directiveNameNode.text,
        parameters: {
          handle: directiveParameter1Node == null ? void 0 : directiveParameter1Node.text,
          prefix: directiveParameter2Node == null ? void 0 : directiveParameter2Node.text
        }
      });
    }
  };
  document = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      return new _apidomAst.YamlDocument({
        children: node.children,
        position,
        isMissing: node.isMissing
      });
    },
    leave: node => {
      node.children = node.children.flat();
    }
  };
  block_node = {
    enter: node => {
      return node.children;
    }
  };
  flow_node = {
    enter: node => {
      const [kindCandidate] = node.children.slice(-1);

      // kind node is present in flow node
      if (CstVisitor.isScalar(kindCandidate) || CstVisitor.isMapping(kindCandidate) || CstVisitor.isSequence(kindCandidate)) {
        return node.children;
      }

      // kind node not present in flow node, creating empty node
      const emptyPoint = new _apidomAst.Point({
        row: kindCandidate.endPosition.row,
        column: kindCandidate.endPosition.column,
        char: kindCandidate.endIndex
      });
      const emptyScalarNode = new _apidomAst.YamlScalar({
        content: '',
        anchor: CstVisitor.kindNodeToYamlAnchor(kindCandidate),
        tag: CstVisitor.kindNodeToYamlTag(kindCandidate),
        position: new _apidomAst.Position({
          start: emptyPoint,
          end: emptyPoint
        }),
        styleGroup: _apidomAst.YamlStyleGroup.Flow,
        style: _apidomAst.YamlStyle.Plain
      });
      this.registerAnchor(emptyScalarNode);
      return [...node.children, emptyScalarNode];
    }
  };
  tag = {
    enter: () => {
      return null;
    }
  };
  anchor = {
    enter: () => {
      return null;
    }
  };
  block_mapping = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const mappingNode = new _apidomAst.YamlMapping({
        children: node.children,
        position,
        anchor,
        tag,
        styleGroup: _apidomAst.YamlStyleGroup.Block,
        style: _apidomAst.YamlStyle.NextLine,
        isMissing: node.isMissing
      });
      this.registerAnchor(mappingNode);
      return this.schema.resolve(mappingNode);
    }
  };
  block_mapping_pair = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      const children = [...node.children];
      if (CstVisitor.hasKeyValuePairEmptyKey(node)) {
        const keyNode = this.createKeyValuePairEmptyKey(node);
        children.unshift(keyNode);
      }
      if (CstVisitor.hasKeyValuePairEmptyValue(node)) {
        const valueNode = this.createKeyValuePairEmptyValue(node);
        children.push(valueNode);
      }
      return new _apidomAst.YamlKeyValuePair({
        children,
        position,
        styleGroup: _apidomAst.YamlStyleGroup.Block,
        isMissing: node.isMissing
      });
    }
  };
  flow_mapping = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const mappingNode = new _apidomAst.YamlMapping({
        children: node.children,
        position,
        anchor,
        tag,
        styleGroup: _apidomAst.YamlStyleGroup.Flow,
        style: _apidomAst.YamlStyle.Explicit,
        isMissing: node.isMissing
      });
      this.registerAnchor(mappingNode);
      return this.schema.resolve(mappingNode);
    }
  };
  flow_pair = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      const children = [...node.children];
      if (CstVisitor.hasKeyValuePairEmptyKey(node)) {
        const keyNode = this.createKeyValuePairEmptyKey(node);
        children.unshift(keyNode);
      }
      if (CstVisitor.hasKeyValuePairEmptyValue(node)) {
        const valueNode = this.createKeyValuePairEmptyValue(node);
        children.push(valueNode);
      }
      return new _apidomAst.YamlKeyValuePair({
        children,
        position,
        styleGroup: _apidomAst.YamlStyleGroup.Flow,
        isMissing: node.isMissing
      });
    }
  };
  keyValuePair = {
    leave: node => {
      node.children = node.children.flat();
    }
  };
  block_sequence = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const sequenceNode = new _apidomAst.YamlSequence({
        children: node.children,
        position,
        anchor,
        tag,
        styleGroup: _apidomAst.YamlStyleGroup.Block,
        style: _apidomAst.YamlStyle.NextLine
      });
      this.registerAnchor(sequenceNode);
      return this.schema.resolve(sequenceNode);
    }
  };
  block_sequence_item = {
    enter: node => {
      // flow or block node present; first node is always `-` literal
      if (node.children.length > 1) {
        return node.children;
      }

      // create empty node
      const emptyPoint = new _apidomAst.Point({
        row: node.endPosition.row,
        column: node.endPosition.column,
        char: node.endIndex
      });
      const emptyScalarNode = new _apidomAst.YamlScalar({
        content: '',
        tag: new _apidomAst.YamlTag({
          explicitName: '?',
          kind: _apidomAst.YamlNodeKind.Scalar
        }),
        position: new _apidomAst.Position({
          start: emptyPoint,
          end: emptyPoint
        }),
        styleGroup: _apidomAst.YamlStyleGroup.Flow,
        style: _apidomAst.YamlStyle.Plain
      });
      return [emptyScalarNode];
    }
  };
  flow_sequence = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const sequenceNode = new _apidomAst.YamlSequence({
        children: node.children.flat(),
        position,
        anchor,
        tag,
        styleGroup: _apidomAst.YamlStyleGroup.Flow,
        style: _apidomAst.YamlStyle.Explicit
      });
      this.registerAnchor(sequenceNode);
      return this.schema.resolve(sequenceNode);
    }
  };
  sequence = {
    leave: node => {
      node.children = node.children.flat(+Infinity);
    }
  };
  plain_scalar = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const scalarNode = new _apidomAst.YamlScalar({
        content: node.text,
        anchor,
        tag,
        position,
        styleGroup: _apidomAst.YamlStyleGroup.Flow,
        style: _apidomAst.YamlStyle.Plain
      });
      this.registerAnchor(scalarNode);
      return this.schema.resolve(scalarNode);
    }
  };
  single_quote_scalar = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const scalarNode = new _apidomAst.YamlScalar({
        content: node.text,
        anchor,
        tag,
        position,
        styleGroup: _apidomAst.YamlStyleGroup.Flow,
        style: _apidomAst.YamlStyle.SingleQuoted
      });
      this.registerAnchor(scalarNode);
      return this.schema.resolve(scalarNode);
    }
  };
  double_quote_scalar = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const scalarNode = new _apidomAst.YamlScalar({
        content: node.text,
        anchor,
        tag,
        position,
        styleGroup: _apidomAst.YamlStyleGroup.Flow,
        style: _apidomAst.YamlStyle.DoubleQuoted
      });
      this.registerAnchor(scalarNode);
      return this.schema.resolve(scalarNode);
    }
  };
  block_scalar = {
    enter: node => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const style = node.text.startsWith('|') ? _apidomAst.YamlStyle.Literal : node.text.startsWith('>') ? _apidomAst.YamlStyle.Folded : _apidomAst.YamlStyle.Plain;
      const scalarNode = new _apidomAst.YamlScalar({
        content: node.text,
        anchor,
        tag,
        position,
        styleGroup: _apidomAst.YamlStyleGroup.Block,
        style
      });
      this.registerAnchor(scalarNode);
      return this.schema.resolve(scalarNode);
    }
  };
  comment = {
    enter: node => {
      return new _apidomAst.YamlComment({
        content: node.text
      });
    }
  };
  alias = {
    enter: node => {
      const alias = new _apidomAst.YamlAlias({
        content: node.text
      });
      return this.referenceManager.resolveAlias(alias);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(schema) {
    this.schema = schema;
  }

  // eslint-disable-next-line class-methods-use-this
  enter(node) {
    // missing anonymous literals from CST transformed into AST literal nodes
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

  // eslint-disable-next-line class-methods-use-this
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
  registerAnchor(node) {
    if (node.anchor !== undefined) {
      this.referenceManager.addAnchor(node);
    }
  }
  createKeyValuePairEmptyKey(node) {
    const emptyPoint = new _apidomAst.Point({
      row: node.startPosition.row,
      column: node.startPosition.column,
      char: node.startIndex
    });
    const {
      keyNode
    } = node;
    const children = (keyNode == null ? void 0 : keyNode.children) || [];
    const tagNode = children.find(CstVisitor.isKind('tag'));
    const anchorNode = children.find(CstVisitor.isKind('anchor'));
    const tag = typeof tagNode !== 'undefined' ? new _apidomAst.YamlTag({
      explicitName: tagNode.text,
      kind: _apidomAst.YamlNodeKind.Scalar,
      position: CstVisitor.toPosition(tagNode)
    }) : new _apidomAst.YamlTag({
      explicitName: '?',
      kind: _apidomAst.YamlNodeKind.Scalar
    });
    const anchor = typeof anchorNode !== 'undefined' ? new _apidomAst.YamlAnchor({
      name: anchorNode.text,
      position: CstVisitor.toPosition(anchorNode)
    }) : undefined;
    const scalarNode = new _apidomAst.YamlScalar({
      content: '',
      position: new _apidomAst.Position({
        start: emptyPoint,
        end: emptyPoint
      }),
      tag,
      anchor,
      styleGroup: _apidomAst.YamlStyleGroup.Flow,
      style: _apidomAst.YamlStyle.Plain
    });
    this.registerAnchor(scalarNode);
    return scalarNode;
  }
  createKeyValuePairEmptyValue(node) {
    const emptyPoint = new _apidomAst.Point({
      row: node.endPosition.row,
      column: node.endPosition.column,
      char: node.endIndex
    });
    const {
      valueNode
    } = node;
    const children = (valueNode == null ? void 0 : valueNode.children) || [];
    const tagNode = children.find(CstVisitor.isKind('tag'));
    const anchorNode = children.find(CstVisitor.isKind('anchor'));
    const tag = typeof tagNode !== 'undefined' ? new _apidomAst.YamlTag({
      explicitName: tagNode.text,
      kind: _apidomAst.YamlNodeKind.Scalar,
      position: CstVisitor.toPosition(tagNode)
    }) : new _apidomAst.YamlTag({
      explicitName: '?',
      kind: _apidomAst.YamlNodeKind.Scalar
    });
    const anchor = typeof anchorNode !== 'undefined' ? new _apidomAst.YamlAnchor({
      name: anchorNode.text,
      position: CstVisitor.toPosition(anchorNode)
    }) : undefined;
    const scalarNode = new _apidomAst.YamlScalar({
      content: '',
      position: new _apidomAst.Position({
        start: emptyPoint,
        end: emptyPoint
      }),
      tag,
      anchor,
      styleGroup: _apidomAst.YamlStyleGroup.Flow,
      style: _apidomAst.YamlStyle.Plain
    });
    this.registerAnchor(scalarNode);
    return scalarNode;
  }
}
var _default = exports.default = CstVisitor;