import isObject from './codegen-functions/is-object.mjs';

function printSegment(path, segment) {
  return path + `[${typeof segment === 'string' ? `'${segment}'` : segment}]`;
}

function dumpPath(path) {
  return `$${path.reduce(printSegment, '')}`;
}

class Sandbox {
  #history;
  #path;
  #value;

  constructor(path, root, history = null) {
    this.root = root;
    this.#path = path;
    this.#history = history ?? [[0, root]];
    this.#value = void 0;
  }

  get path() {
    return dumpPath(this.#path);
  }

  get depth() {
    return this.#path.length - 1;
  }

  get value() {
    if (this.#value !== void 0) {
      return this.#value;
    }

    return this.#value ?? (this.#value = this.#history[this.#history.length - 1][1]);
  }

  get property() {
    return unwrapOrNull(this.#path, this.depth);
  }

  get #parent() {
    if (this.#history.length < 3) {
      return void 0;
    }

    return this.#history[this.#history.length - 3];
  }

  get parentValue() {
    var _this$parent;

    return (_this$parent = this.#parent) === null || _this$parent === void 0 ? void 0 : _this$parent[1];
  }

  get parentProperty() {
    var _this$parent2;

    return this.#path[(_this$parent2 = this.#parent) === null || _this$parent2 === void 0 ? void 0 : _this$parent2[0]];
  }

  destroy() {
    this.#history.length = 0;
  }

  push() {
    const root = this.property !== null && isObject(this.value) ? this.value[this.property] : null;
    this.#history.push([this.#path.length, root]);
    this.#value = root;
    return this;
  }

  pop() {
    const length = Math.max(0, this.#path.length + 1);

    while (this.#history.length > length) {
      this.#history.pop();
    }

    this.#value = void 0;
    return this;
  }

  at(pos) {
    if (Math.abs(pos) > this.#history.length) {
      return null;
    }

    const actualPos = (pos < 0 ? this.#history.length : 0) + pos;
    const history = this.#history.slice(0, actualPos + 1);
    return new Sandbox(this.#path.slice(0, history[history.length - 1][0]), history[history.length - 1][1], history);
  }

}

function unwrapOrNull(collection, pos) {
  return pos >= 0 && collection.length > pos ? collection[pos] : null;
}

export { Sandbox };
