'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');
var index = require('../fast-paths/index.js');
var guards = require('../guards.js');
var iterator = require('../iterator.js');
var index$1 = require('../optimizer/index.js');
var emitCall = require('../templates/emit-call.js');
var fnParams = require('../templates/fn-params.js');
var internalScope = require('../templates/internal-scope.js');
var scope = require('../templates/scope.js');
var tree = require('../tree/tree.js');
var generators = require('./generators.js');

const POS_VARIABLE_DECLARATION = builders.variableDeclaration('let', [builders.variableDeclarator(internalScope['default'].pos, builders.numericLiteral(0))]);
function baseline(jsonPaths, opts) {
  const tree$1 = new tree['default'](opts);
  const hashes = new Map();
  const callbacks = new Map();

  traverse: for (const [id, nodes] of jsonPaths) {
    const iterator$1 = new iterator['default'](nodes);

    if (iterator$1.length === -1) {
      continue;
    }

    const hash = JSON.stringify(iterator$1.nodes);
    const existingHash = hashes.get(hash);

    if (existingHash !== void 0) {
      var _callbacks$get$push, _callbacks$get;

      void ((_callbacks$get$push = (_callbacks$get = callbacks.get(existingHash)) === null || _callbacks$get === void 0 ? void 0 : _callbacks$get.push(id)) !== null && _callbacks$get$push !== void 0 ? _callbacks$get$push : callbacks.set(existingHash, [id]));
      const method = tree$1.getMethodByHash(existingHash);
      let body = method.body.body;

      if (iterator$1.feedback.bailed) {
        body = body[0].expression.arguments[1].body.body;
      }

      body.push(emitCall['default'](id, iterator$1.modifiers));
      continue;
    } else {
      hashes.set(hash, id);
    }

    if (iterator$1.feedback.bailed || nodes.length > 0 && guards.isDeep(nodes[0])) {
      tree$1.traversalZones.destroy();
    }

    const ctx = {
      id,
      iterator: iterator$1
    };
    tree$1.ctx = ctx;

    for (const fastPath of index['default']) {
      if (fastPath(nodes, tree$1, ctx)) {
        continue traverse;
      }
    }

    const branch = iterator$1.feedback.bailed ? [] : [builders.ifStatement(builders.binaryExpression(iterator$1.feedback.fixed ? '!==' : '<', scope['default'].depth, builders.numericLiteral(iterator$1.length - 1)), builders.returnStatement())].concat(iterator$1.feedback.fixed ? [] : POS_VARIABLE_DECLARATION);
    const zone = iterator$1.feedback.bailed ? null : tree$1.traversalZones.create();
    const inverseAt = iterator$1.feedback.inverseAt;

    for (const node of iterator$1) {
      if (guards.isDeep(node) || inverseAt === iterator$1.state.absolutePos) {
        zone === null || zone === void 0 ? void 0 : zone.allIn();
      }

      let treeNode;

      switch (node.type) {
        case 'MemberExpression':
          treeNode = generators.generateMemberExpression(iterator$1, node);
          zone === null || zone === void 0 ? void 0 : zone.expand(node.value);
          break;

        case 'MultipleMemberExpression':
          treeNode = generators.generateMultipleMemberExpression(iterator$1, node);
          zone === null || zone === void 0 ? void 0 : zone.expandMultiple(node.value);
          break;

        case 'SliceExpression':
          treeNode = generators.generateSliceExpression(iterator$1, node, tree$1);
          zone === null || zone === void 0 ? void 0 : zone.resize();
          break;

        case 'ScriptFilterExpression':
          treeNode = generators.generateFilterScriptExpression(iterator$1, node, tree$1);
          zone === null || zone === void 0 ? void 0 : zone.resize();
          break;

        case 'WildcardExpression':
          treeNode = generators.generateWildcardExpression(iterator$1);
          zone === null || zone === void 0 ? void 0 : zone.resize();

          if (treeNode === null) {
            continue;
          }

          break;
      }

      if (iterator$1.feedback.bailed) {
        branch.push(builders.objectExpression([builders.objectProperty(builders.identifier('fn'), builders.arrowFunctionExpression([scope['default']._], treeNode)), builders.objectProperty(builders.identifier('deep'), builders.booleanLiteral(node.deep))]));
      } else {
        branch.push(builders.ifStatement(treeNode, builders.returnStatement()));
      }
    }

    if (!iterator$1.feedback.fixed && !iterator$1.feedback.bailed && !iterator$1.state.inverted) {
      branch.push(builders.ifStatement(builders.binaryExpression('!==', scope['default'].depth, iterator$1.state.pos === 0 ? internalScope['default'].pos : builders.binaryExpression('+', internalScope['default'].pos, builders.numericLiteral(iterator$1.state.pos))), builders.returnStatement()));
    }

    const placement = iterator$1.feedback.bailed ? 'body' : 'traverse';

    if (iterator$1.feedback.bailed) {
      branch.splice(0, branch.length, builders.expressionStatement(builders.callExpression(scope['default'].bail, [builders.stringLiteral(id), builders.arrowFunctionExpression([scope['default']._], builders.blockStatement([builders.expressionStatement(emitCall['default'](ctx.id, iterator$1.modifiers).expression)])), builders.arrayExpression([...branch])])));
    } else {
      branch.push(emitCall['default'](ctx.id, iterator$1.modifiers));
    }

    if (placement === 'body') {
      tree$1.push(builders.expressionStatement(builders.callExpression(builders.memberExpression(internalScope['default'].tree, builders.stringLiteral(id), true), fnParams['default'])), placement);
    } else {
      tree$1.push(builders.stringLiteral(id), placement);
    }

    index$1['default'](branch, iterator$1);
    tree$1.push(builders.blockStatement(branch), 'tree-method');
    zone === null || zone === void 0 ? void 0 : zone.attach();
  }

  return tree$1;
}

exports['default'] = baseline;
