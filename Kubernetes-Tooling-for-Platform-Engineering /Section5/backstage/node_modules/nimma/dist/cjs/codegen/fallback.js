'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('./ast/builders.js');

function safeName(name) {
  return `nimma_${name}`;
}

function safeIdentifier(name) {
  return builders.identifier(safeName(name));
}

function getFunctionBody(fn) {
  const source = Reflect.apply(Function.toString, fn, []);
  const paramsDefEnd = source.indexOf(')') + 1;
  const body = source.slice(paramsDefEnd).replace(/^\s*(=>\s*)?/, '');
  const arr = source.slice(source.indexOf('('), paramsDefEnd).split(/[,\s]+/).splice(0, 3);
  return `${arr.join(', ')} => ${body}`;
}

class Fallback {
  #modules = new Set();
  #deps = new Map();
  #fn;
  #extraCode = '';
  runtimeDeps = new Map();

  constructor(deps, fn) {
    this.#fn = fn;

    for (const [source, specifiers] of Object.entries(deps)) {
      const importSpecifiers = [];

      for (const {
        imported,
        local,
        value
      } of specifiers) {
        this.#deps.set(local, value);
        this.runtimeDeps.set(safeName(local), value);
        importSpecifiers.push(builders.importSpecifier(safeIdentifier(local), builders.identifier(imported)));
        this.#modules.add(builders.importDeclaration(importSpecifiers, builders.stringLiteral(source)));
      }
    }
  }

  get extraCode() {
    this.#extraCode || (this.#extraCode = getFunctionBody(this.#fn));
    return this.#extraCode;
  }

  attach(tree) {
    for (const mod of this.#modules) {
      tree.push(mod, 'program');
    }

    const id = builders.identifier('fallback');
    const args = Array.from(this.#deps.keys());
    tree.push(builders.variableDeclaration('const', [builders.variableDeclarator(id, builders.callExpression(builders.memberExpression(builders.callExpression(builders.identifier('Function'), [builders.templateLiteral([builders.templateElement({
      raw: `return ${this.extraCode}`
    })], [])]), builders.identifier('call')), [builders.objectExpression(args.map(arg => builders.objectProperty(builders.stringLiteral(arg), safeIdentifier(arg))))]))]), 'program');
    return id;
  }

}

exports['default'] = Fallback;
