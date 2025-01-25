'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var guards = require('./guards.js');

function isBailable(nodes) {
  let deep = false;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!guards.isDeep(node)) continue;

    if (deep) {
      return true;
    } else if (guards.isMemberExpression(node)) {
      i++;
      let hadFlatMemberExpressions = false;
      let deepNodes = 1;

      for (; i < nodes.length - 1; i++) {
        const node = nodes[i];

        if (guards.isDeep(node)) {
          deepNodes++;
        } else {
          hadFlatMemberExpressions || (hadFlatMemberExpressions = guards.isMemberExpression(node) || guards.isWildcardExpression(node));
          continue;
        }

        if (guards.isMemberExpression(node) || guards.isWildcardExpression(node)) {
          if (hadFlatMemberExpressions) return true;
          continue;
        }

        return true;
      }

      return guards.isDeep(nodes[nodes.length - 1]) ? hadFlatMemberExpressions || guards.isWildcardExpression(nodes[nodes.length - 1]) : deepNodes > 1;
    } else {
      deep = true;
    }
  }

  return false;
}

class Iterator {
  nodes;
  #i;

  constructor(nodes) {
    this.modifiers = Iterator.trim(nodes);
    this.nodes = Iterator.compact(nodes);
    this.#i = -1;
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
    return this.#i + 1 < this.nodes.length ? this.nodes[this.#i + 1] : null;
  }

  static compact(nodes) {
    let marked;

    for (let i = 0; i < nodes.length; i++) {
      if (guards.isWildcardExpression(nodes[i]) && guards.isDeep(nodes[i]) && i !== nodes.length - 1) {
        (marked ?? (marked = [])).push(i);
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

    while (nodes.length > 0 && guards.isModifierExpression(nodes[nodes.length - 1])) {
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
      if (!guards.isDeep(node)) continue;
      feedback.fixed = false;
      i++;
      potentialInvertAtPoint = i - 1;

      for (; i < nodes.length; i++) {
        const nextNode = nodes[i];

        if (guards.isDeep(nextNode)) {
          potentialInvertAtPoint = -1;
        }
      }
    }

    if (nodes.length > 1 && potentialInvertAtPoint !== -1 && potentialInvertAtPoint < nodes.length - 1) {
      feedback.inverseAt = potentialInvertAtPoint;
    }

    return feedback;
  }

  *[Symbol.iterator]() {
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
      this.#i++;
      this.state.absolutePos++;

      if (guards.isDeep(node)) {
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

exports['default'] = Iterator;
