import { ifStatement, returnStatement, binaryExpression, numericLiteral, objectExpression, objectProperty, arrowFunctionExpression, identifier, booleanLiteral, expressionStatement, callExpression, stringLiteral, blockStatement, arrayExpression, memberExpression, variableDeclaration, variableDeclarator } from '../ast/builders.mjs';
import fastPaths from '../fast-paths/index.mjs';
import { isDeep } from '../guards.mjs';
import Iterator from '../iterator.mjs';
import optimizer from '../optimizer/index.mjs';
import generateEmitCall from '../templates/emit-call.mjs';
import fnParams from '../templates/fn-params.mjs';
import internalScope from '../templates/internal-scope.mjs';
import scope from '../templates/scope.mjs';
import ESTree from '../tree/tree.mjs';
import { generateWildcardExpression, generateFilterScriptExpression, generateSliceExpression, generateMultipleMemberExpression, generateMemberExpression } from './generators.mjs';

const POS_VARIABLE_DECLARATION = variableDeclaration('let', [variableDeclarator(internalScope.pos, numericLiteral(0))]);
function baseline(jsonPaths, opts) {
  const tree = new ESTree(opts);
  const hashes = new Map();
  const callbacks = new Map();

  traverse: for (const [id, nodes] of jsonPaths) {
    const iterator = new Iterator(nodes);

    if (iterator.length === -1) {
      continue;
    }

    const hash = JSON.stringify(iterator.nodes);
    const existingHash = hashes.get(hash);

    if (existingHash !== void 0) {
      var _callbacks$get;

      void (((_callbacks$get = callbacks.get(existingHash)) === null || _callbacks$get === void 0 ? void 0 : _callbacks$get.push(id)) ?? callbacks.set(existingHash, [id]));
      const method = tree.getMethodByHash(existingHash);
      let body = method.body.body;

      if (iterator.feedback.bailed) {
        body = body[0].expression.arguments[1].body.body;
      }

      body.push(generateEmitCall(id, iterator.modifiers));
      continue;
    } else {
      hashes.set(hash, id);
    }

    if (iterator.feedback.bailed || nodes.length > 0 && isDeep(nodes[0])) {
      tree.traversalZones.destroy();
    }

    const ctx = {
      id,
      iterator
    };
    tree.ctx = ctx;

    for (const fastPath of fastPaths) {
      if (fastPath(nodes, tree, ctx)) {
        continue traverse;
      }
    }

    const branch = iterator.feedback.bailed ? [] : [ifStatement(binaryExpression(iterator.feedback.fixed ? '!==' : '<', scope.depth, numericLiteral(iterator.length - 1)), returnStatement())].concat(iterator.feedback.fixed ? [] : POS_VARIABLE_DECLARATION);
    const zone = iterator.feedback.bailed ? null : tree.traversalZones.create();
    const inverseAt = iterator.feedback.inverseAt;

    for (const node of iterator) {
      if (isDeep(node) || inverseAt === iterator.state.absolutePos) {
        zone === null || zone === void 0 ? void 0 : zone.allIn();
      }

      let treeNode;

      switch (node.type) {
        case 'MemberExpression':
          treeNode = generateMemberExpression(iterator, node);
          zone === null || zone === void 0 ? void 0 : zone.expand(node.value);
          break;

        case 'MultipleMemberExpression':
          treeNode = generateMultipleMemberExpression(iterator, node);
          zone === null || zone === void 0 ? void 0 : zone.expandMultiple(node.value);
          break;

        case 'SliceExpression':
          treeNode = generateSliceExpression(iterator, node, tree);
          zone === null || zone === void 0 ? void 0 : zone.resize();
          break;

        case 'ScriptFilterExpression':
          treeNode = generateFilterScriptExpression(iterator, node, tree);
          zone === null || zone === void 0 ? void 0 : zone.resize();
          break;

        case 'WildcardExpression':
          treeNode = generateWildcardExpression(iterator);
          zone === null || zone === void 0 ? void 0 : zone.resize();

          if (treeNode === null) {
            continue;
          }

          break;
      }

      if (iterator.feedback.bailed) {
        branch.push(objectExpression([objectProperty(identifier('fn'), arrowFunctionExpression([scope._], treeNode)), objectProperty(identifier('deep'), booleanLiteral(node.deep))]));
      } else {
        branch.push(ifStatement(treeNode, returnStatement()));
      }
    }

    if (!iterator.feedback.fixed && !iterator.feedback.bailed && !iterator.state.inverted) {
      branch.push(ifStatement(binaryExpression('!==', scope.depth, iterator.state.pos === 0 ? internalScope.pos : binaryExpression('+', internalScope.pos, numericLiteral(iterator.state.pos))), returnStatement()));
    }

    const placement = iterator.feedback.bailed ? 'body' : 'traverse';

    if (iterator.feedback.bailed) {
      branch.splice(0, branch.length, expressionStatement(callExpression(scope.bail, [stringLiteral(id), arrowFunctionExpression([scope._], blockStatement([expressionStatement(generateEmitCall(ctx.id, iterator.modifiers).expression)])), arrayExpression([...branch])])));
    } else {
      branch.push(generateEmitCall(ctx.id, iterator.modifiers));
    }

    if (placement === 'body') {
      tree.push(expressionStatement(callExpression(memberExpression(internalScope.tree, stringLiteral(id), true), fnParams)), placement);
    } else {
      tree.push(stringLiteral(id), placement);
    }

    optimizer(branch, iterator);
    tree.push(blockStatement(branch), 'tree-method');
    zone === null || zone === void 0 ? void 0 : zone.attach();
  }

  return tree;
}

export { baseline as default };
