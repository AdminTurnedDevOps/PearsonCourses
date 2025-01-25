import * as astring$1 from 'astring';

const customGenerator = { ...astring$1.baseGenerator,

  BooleanLiteral(node, state) {
    state.write(`${node.value}`, node);
  },

  NullLiteral(node, state) {
    state.write('null', node);
  },

  NumericLiteral(node, state) {
    state.write(node.value, node);
  },

  ObjectMethod(node, state) {
    // eslint-disable-next-line no-unused-vars
    const {
      key,
      type,
      ...value
    } = node;
    return this.ObjectProperty({
      key: node.key,
      value: {
        type: 'FunctionExpression',
        ...value
      }
    }, state);
  },

  ObjectProperty(node, state) {
    return this.Property({ ...node,
      kind: 'init'
    }, state);
  },

  RegExpLiteral(node, state) {
    state.write(`/${node.pattern}/${node.flags}`, node);
  },

  StringLiteral(node, state) {
    state.write(JSON.stringify(node.value), node);
  }

};
function astring (tree) {
  return astring$1.generate(tree, {
    generator: customGenerator
  });
}

export { astring as default };
