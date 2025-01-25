import { defineProperty as _defineProperty, classPrivateFieldSet as _classPrivateFieldSet, classPrivateFieldGet as _classPrivateFieldGet } from '../_virtual/_rollupPluginBabelHelpers.js';
import { isWildcardExpression, isDeep, isModifierExpression, isMemberExpression } from './guards.mjs';

let _Symbol$iterator;

function isBailable(nodes) {
  let deep = false;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!isDeep(node)) continue;

    if (deep) {
      return true;
    } else if (isMemberExpression(node)) {
      i++;
      let hadFlatMemberExpressions = false;
      let deepNodes = 1;

      for (; i < nodes.length - 1; i++) {
        const node = nodes[i];

        if (isDeep(node)) {
          deepNodes++;
        } else {
          hadFlatMemberExpressions || (hadFlatMemberExpressions = isMemberExpression(node) || isWildcardExpression(node));
          continue;
        }

        if (isMemberExpression(node) || isWildcardExpression(node)) {
          if (hadFlatMemberExpressions) return true;
          continue;
        }

        return true;
      }

      return isDeep(nodes[nodes.length - 1]) ? hadFlatMemberExpressions || isWildcardExpression(nodes[nodes.length - 1]) : deepNodes > 1;
    } else {
      deep = true;
    }
  }

  return false;
}

var _i = /*#__PURE__*/new WeakMap();

_Symbol$iterator = Symbol.iterator;
class Iterator {
  constructor(nodes) {
    _defineProperty(this, "nodes", void 0);

    _i.set(this, {
      writable: true,
      value: void 0
    });

    this.modifiers = Iterator.trim(nodes);
    this.nodes = Iterator.compact(nodes);

    _classPrivateFieldSet(this, _i, -1);

    this.feedback = Iterator.analyze(this.nodes, this.modifiers.keyed || this.modifiers.parents > 0);
    this.length = this.nodes.length;
    this.state = {
      absolutePos: -1,
      fixed: true,
      inverted: false,
      pos: -1
    };

    if (this.feedback.fixed && this.modifiers.parents > this.length) {
      this.length = -1;
    }
  }

  get nextNode() {
    return _classPrivateFieldGet(this, _i) + 1 < this.nodes.length ? this.nodes[_classPrivateFieldGet(this, _i) + 1] : null;
  }

  static compact(nodes) {
    let marked;

    for (let i = 0; i < nodes.length; i++) {
      if (isWildcardExpression(nodes[i]) && isDeep(nodes[i]) && i !== nodes.length - 1) {
        var _marked;

        ((_marked = marked) !== null && _marked !== void 0 ? _marked : marked = []).push(i);
      }
    }

    if (marked === void 0) {
      return nodes;
    }

    const _nodes = nodes.slice();

    for (let i = 0; i < marked.length; i++) {
      _nodes[marked[i] - i + 1].deep = true;

      _nodes.splice(marked[i] - i, 1);
    }

    return _nodes;
  }

  static trim(nodes) {
    const modifiers = {
      keyed: false,
      parents: 0
    };

    while (nodes.length > 0 && isModifierExpression(nodes[nodes.length - 1])) {
      switch (nodes.pop().type) {
        case 'KeyExpression':
          modifiers.keyed = true;
          modifiers.parents = 0;
          break;

        case 'ParentExpression':
          modifiers.parents++;
          break;
      }
    }

    return modifiers;
  }

  static analyze(nodes) {
    const feedback = {
      bailed: isBailable(nodes),
      fixed: true,
      inverseAt: -1
    };

    if (feedback.bailed) {
      feedback.fixed = false;
      return feedback;
    }

    let potentialInvertAtPoint = -1;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (!isDeep(node)) continue;
      feedback.fixed = false;
      i++;
      potentialInvertAtPoint = i - 1;

      for (; i < nodes.length; i++) {
        const nextNode = nodes[i];

        if (isDeep(nextNode)) {
          potentialInvertAtPoint = -1;
        }
      }
    }

    if (nodes.length > 1 && potentialInvertAtPoint !== -1 && potentialInvertAtPoint < nodes.length - 1) {
      feedback.inverseAt = potentialInvertAtPoint;
    }

    return feedback;
  }

  *[_Symbol$iterator]() {
    if (this.feedback.bailed) {
      return yield* this.nodes;
    }

    const { ...feedback
    } = this.feedback;
    let order = 1;
    const nodes = this.feedback.inverseAt !== -1 ? this.nodes.slice() : this.nodes;

    for (let i = 0; i < nodes.length; i++) {

      if (this.feedback.inverseAt !== -1 && i === this.feedback.inverseAt) {
        nodes.splice(0, i);
        nodes.reverse();
        this.state.pos = 1;
        i = 0;
        this.feedback.inverseAt = -1;
        this.state.inverted = true;
        order = -1;
      }

      const node = nodes[i];
      this.state.pos += order;
      _classPrivateFieldSet(this, _i, (+_classPrivateFieldGet(this, _i)) + 1);
      this.state.absolutePos++;

      if (isDeep(node)) {
        this.state.fixed = false;
        yield node;
        this.state.pos = 0;
      } else {
        yield node;
      }
    }

    Object.assign(this.feedback, { ...feedback,
      mutatesPos: this.feedback.mutatesPos
    });
  }

}

export { Iterator as default };
