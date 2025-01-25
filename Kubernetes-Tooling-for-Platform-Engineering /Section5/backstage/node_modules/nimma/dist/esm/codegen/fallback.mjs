import { importDeclaration, variableDeclaration, variableDeclarator, callExpression, objectExpression, objectProperty, memberExpression, identifier, templateLiteral, templateElement, importSpecifier, stringLiteral } from './ast/builders.mjs';

function safeName(name) {
  return `nimma_${name}`;
}

function safeIdentifier(name) {
  return identifier(safeName(name));
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
        importSpecifiers.push(importSpecifier(safeIdentifier(local), identifier(imported)));
        this.#modules.add(importDeclaration(importSpecifiers, stringLiteral(source)));
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

    const id = identifier('fallback');
    const args = Array.from(this.#deps.keys());
    tree.push(variableDeclaration('const', [variableDeclarator(id, callExpression(memberExpression(callExpression(identifier('Function'), [templateLiteral([templateElement({
      raw: `return ${this.extraCode}`
    })], [])]), identifier('call')), [objectExpression(args.map(arg => objectProperty(stringLiteral(arg), safeIdentifier(arg))))]))]), 'program');
    return id;
  }

}

export { Fallback as default };
