import AggregateError from './errors/aggregate-error.mjs';
import proxyCallbacks from './proxy-callbacks.mjs';
import { Sandbox } from './sandbox.mjs';
import { zonedTraverse, traverse, bailedTraverse } from './traverse.mjs';

class Scope {
  #parent;
  #output;

  constructor(root, callbacks, parent = null) {
    this.root = root;
    this.#parent = parent;
    this.path = [];
    this.errors = [];
    this.sandbox = new Sandbox(this.path, root, null);
    this.callbacks = proxyCallbacks(callbacks, this.errors);
    const self = this;
    this.#output = {
      path: this.path,

      get value() {
        return self.value;
      }

    };
  }

  get depth() {
    return this.path.length - 1;
  }

  get property() {
    return this.sandbox.property;
  }

  get value() {
    return this.sandbox.value;
  }

  enter(key) {
    this.path.push(key);
    this.sandbox = this.sandbox.push();
    return this.path.length;
  }

  exit(depth) {
    const length = Math.max(0, depth - 1);

    while (this.path.length > length) {
      this.path.pop();
    }

    this.sandbox = this.sandbox.pop();
    return this.path.length;
  }

  fork(path) {
    const newScope = new Scope(this.root, this.callbacks, this);

    for (const segment of path) {
      newScope.enter(segment);

      if (newScope.value === void 0) {
        return null;
      }
    }

    return newScope;
  }

  traverse(fn, zones) {
    if (zones !== null) {
      zonedTraverse.call(this, fn, zones);
    } else {
      traverse.call(this, fn);
    }
  }

  bail(id, fn, deps) {
    const scope = this.fork(this.path);
    bailedTraverse.call(scope, fn, deps);
  }

  emit(id, pos, withKeys) {
    const fn = this.callbacks[id];

    if (pos === 0 && !withKeys) {
      return void fn(this.#output);
    }

    if (pos !== 0 && pos > this.depth + 1) {
      return;
    }

    const output = pos === 0 ? this.#output : {
      path: this.#output.path.slice(0, Math.max(0, this.#output.path.length - pos)),
      value: (this.sandbox.at(-pos - 1) ?? this.sandbox.at(0)).value
    };

    if (!withKeys) {
      fn(output);
    } else {
      fn({
        path: output.path,
        value: output.path.length === 0 ? void 0 : output.path[output.path.length - 1]
      });
    }
  }

  destroy() {
    this.path.length = 0;
    this.sandbox.destroy();
    this.sandbox = null;

    if (this.errors.length > 0) {
      throw new AggregateError(this.errors, 'Error running Nimma');
    }
  }

}

export { Scope as default };
