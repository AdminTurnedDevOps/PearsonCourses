type DependencySpecifier = {
  imported: string;
  local: string;
  value: unknown;
};

export default class Fallback {
  constructor(dependencies: Record<string, DependencySpecifier>[], fn: Function): Fallback;
}
