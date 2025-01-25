/*    Copyright 2021 Google LLC
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

// eslint-disable-next-line node/no-unpublished-import
import {WrappedRE2, InternalMatchResult} from '../wasm/re2';

export interface RE2ExecArray extends Array<string | undefined> {
  index: number;
  input: string;
  groups?: {
    [key: string]: string;
  };
}

export interface RE2MatchArray extends Array<string | undefined> {
  index?: number;
  input?: string;
  groups?: {
    [key: string]: string;
  };
}

const ALPHA_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const HEX = '0123456789ABCDEF';

function isHexadecimal(char: string): boolean {
  return HEX.indexOf(char.toUpperCase()) !== -1;
}

/**
 * Translate a string from Node RegExp syntax RE2 syntax. The algorithm is
 * translated from
 * https://github.com/uhop/node-re2/blob/master/lib/new.cc#L21-L142
 * @param pattern
 * @param multiline
 */
function translateRegExp(pattern: string, multiline: boolean): string {
  const result: string[] = [];
  if (pattern === '') {
    return '(?:)';
  } else if (multiline) {
    result.push('(?m)');
  }
  for (let i = 0; i < pattern.length; ) {
    if (pattern[i] === '\\') {
      if (i + 1 < pattern.length) {
        switch (pattern[i + 1]) {
          case '\\':
            // Consume "\\", output "\\"
            result.push('\\\\');
            i += 2;
            break;
          case 'c':
            if (i + 2 < pattern.length) {
              const alphaIndex = ALPHA_UPPER.indexOf(pattern[i + 2]) + 1;
              if (alphaIndex >= 0) {
                // Consume "\c[upper case character]", output "\x[hex digit][hex digit]"
                result.push(
                  '\\x',
                  HEX[Math.floor(alphaIndex / 16)],
                  HEX[alphaIndex % 16]
                );
                i += 3;
                break;
              }
            }
            // Consume "\c", output "\c"
            result.push('\\c');
            i += 2;
            break;
          case 'u':
            if (i + 2 < pattern.length) {
              const ch2 = pattern[i + 2];
              if (isHexadecimal(ch2)) {
                // Consume "\u[hex digit]", output "\x{[hex digit]"
                result.push('\\x{');
                result.push(ch2);
                i += 3;
                // Consume and output up to 3 more hex digits
                for (
                  let j = 0;
                  j < 3 && i < pattern.length && isHexadecimal(pattern[i]);
                  i++, j++
                ) {
                  result.push(pattern[i]);
                }
                // Output "}"
                result.push('}');
                break;
              } else if (ch2 === '{') {
                // Consume "\u" followed by "{", output "\x"
                // The default case handles the subsequent characters
                result.push('\\x');
                i += 2;
                break;
              }
            }
            // Consume and output "\u"
            result.push('\\u');
            i += 2;
            break;
          default:
            // Consume and output "\[char]"
            result.push('\\', pattern[i + 1]);
            i += 2;
        }
        continue;
      }
    } else if (pattern[i] === '/') {
      // Consume "/"" and output "\/"
      // An existing "\/" would have been handled by the above default case
      result.push('\\/');
      i += 1;
      continue;
    } else if (pattern.substring(i, i + 3) === '(?<') {
      if (pattern[i + 3] !== '=' && pattern[i + 3] !== '!') {
        // Consume "(?<" and output "(?P<"
        result.push('(?P<');
        i += 3;
        continue;
      }
    }
    // Consume and output the next character
    result.push(pattern[i]);
    i += 1;
  }
  return result.join('');
}

/**
 * Escape a RegExp pattern by ensuring that any instance of "/" in the string
 * is preceded by an odd number of backslashes.
 * @param pattern
 */
function escapeRegExp(pattern: string): string {
  return pattern.replace(/(^|[^\\])((?:\\\\)*)\//g, '$1$2\\/');
}

/* This class should implement the RegExp interface, but it can't because of
 * https://github.com/microsoft/TypeScript/issues/42307 */
export class RE2 {
  private _global = false;
  private _ignoreCase = false;
  private _multiline = false;
  private _dotAll = false;
  private _unicode = false;
  private _sticky = false;
  lastIndex = 0;

  private pattern = '(?:)';
  private wrapper: WrappedRE2;

  private groupNames: {[group: number]: string} = {};
  private namedGroups: {[name: string]: number} = {};

  constructor(pattern: string | RegExp | RE2, flags?: string) {
    if (typeof pattern !== 'string') {
      if (pattern instanceof RegExp || pattern instanceof RE2) {
        flags = flags ?? pattern.flags;
        pattern = pattern.source;
      } else {
        if (pattern === undefined) {
          pattern = '(?:)';
        } else {
          pattern = pattern + '';
        }
      }
    }
    if (pattern === '') {
      pattern = '(?:)';
    }
    pattern = escapeRegExp(pattern);
    flags = flags ?? '';
    for (const flag of flags) {
      switch (flag) {
        case 'g':
          this._global = true;
          break;
        case 'i':
          this._ignoreCase = true;
          break;
        case 'm':
          this._multiline = true;
          break;
        case 's':
          this._dotAll = true;
          break;
        case 'u':
          this._unicode = true;
          break;
        case 'y':
          this._sticky = true;
          break;
      }
    }
    if (!this._unicode) {
      throw new Error(
        'RE2 only works in unicode mode. The "u" flag must be passed when constructing a RE2 instance'
      );
    }
    this.pattern = pattern;
    this.wrapper = new WrappedRE2(
      translateRegExp(pattern, this._multiline),
      this._ignoreCase,
      this._multiline,
      this._dotAll
    );
    if (!this.wrapper.ok()) {
      throw new SyntaxError(
        `Invalid regular expression: /${pattern}/${flags}: ${this.wrapper.error()}`
      );
    }
    // Verify that all named groups have unique names
    const groupNames = this.wrapper.capturingGroupNames();
    const groupNumbers = groupNames.keys();
    for (let i = 0; i < groupNumbers.size(); i++) {
      const num = groupNumbers.get(i);
      const name = groupNames.get(num);
      if (name in this.namedGroups) {
        throw new SyntaxError(
          `Invalid regular expression: /${pattern}/${flags}: Duplicate capture group name`
        );
      }
      this.groupNames[num] = name;
      this.namedGroups[name] = num;
    }
  }

  get source() {
    return this.pattern;
  }
  get internalSource() {
    return this.wrapper.pattern();
  }
  get flags() {
    return (
      (this._global ? 'g' : '') +
      (this._ignoreCase ? 'i' : '') +
      (this._multiline ? 'm' : '') +
      (this._dotAll ? 's' : '') +
      (this._unicode ? 'u' : '') +
      (this._sticky ? 'y' : '')
    );
  }
  get global() {
    return this._global;
  }
  get ignoreCase() {
    return this._ignoreCase;
  }
  get multiline() {
    return this._multiline;
  }
  get dotAll() {
    return this._dotAll;
  }
  get unicode() {
    return this._unicode;
  }
  get sticky() {
    return this._sticky;
  }
  toString() {
    return `/${this.pattern}/${this.flags}`;
  }

  private getMaybeStickyIndex() {
    if (this._global || this._sticky) {
      return this.lastIndex;
    } else {
      return 0;
    }
  }

  private isMatchSuccessful(
    match: InternalMatchResult,
    searchStart: number
  ): boolean {
    return match.index === searchStart || (!this._sticky && match.index >= 0);
  }

  private maybeUpdateLastIndex(match: InternalMatchResult, start: number) {
    if (this._global || this._sticky) {
      if (this.isMatchSuccessful(match, start)) {
        this.lastIndex = match.index + match.match.length;
      } else {
        this.lastIndex = 0;
      }
    }
  }

  private getNamedGroups(match: InternalMatchResult): {[name: string]: string} {
    const groups: {[name: string]: string} = {};
    for (const [groupName, groupNum] of Object.entries(this.namedGroups)) {
      if (match.groups[groupNum - 1] !== undefined) {
        groups[groupName] = match.groups[groupNum - 1]!;
      }
    }
    return groups;
  }

  exec(input: string): RE2ExecArray | null {
    if (typeof input !== 'string') {
      input = input + '';
    }
    const startIndex = this.getMaybeStickyIndex();
    const match = this.wrapper.match(input, startIndex, true);
    this.maybeUpdateLastIndex(match, startIndex);
    if (!this.isMatchSuccessful(match, startIndex)) {
      return null;
    }
    const result: RE2ExecArray = [match.match, ...match.groups] as RE2ExecArray;
    result.index = match.index;
    result.input = input;
    const groups = this.getNamedGroups(match);
    if (Object.keys(groups).length > 0) {
      result.groups = groups;
    }
    return result;
  }

  test(input: string): boolean {
    if (typeof input !== 'string') {
      input = input + '';
    }
    const startIndex = this.getMaybeStickyIndex();
    const match = this.wrapper.match(input, this.getMaybeStickyIndex(), false);
    this.maybeUpdateLastIndex(match, startIndex);
    return this.isMatchSuccessful(match, startIndex);
  }
  compile(): this {
    // This method is deprecated on RegExp, so it is intentionally not implemented here
    throw new Error(
      'Deprecated RegExp method compile is not implemented in RE2.'
    );
  }
  [Symbol.match](input: string): RE2MatchArray | null {
    if (typeof input !== 'string') {
      input = input + '';
    }
    if (this._global) {
      const result: string[] = [];
      let nextIndex = 0;
      let success: boolean;
      do {
        const match = this.wrapper.match(input, nextIndex, false);
        success =
          match.index === nextIndex || (!this._sticky && match.index >= 0);
        if (success) {
          result.push(match.match);
          nextIndex = match.index + match.match.length;
        }
      } while (success);
      if (result.length === 0) {
        return null;
      } else {
        return result;
      }
    } else {
      const startIndex = this.getMaybeStickyIndex();
      const match = this.wrapper.match(input, startIndex, true);
      this.maybeUpdateLastIndex(match, startIndex);
      if (!this.isMatchSuccessful(match, startIndex)) {
        return null;
      }
      const result: RE2MatchArray = [match.match, ...match.groups];
      result.index = match.index;
      result.input = input;
      const groups = this.getNamedGroups(match);
      if (Object.keys(groups).length > 0) {
        result.groups = groups;
      }
      return result;
    }
  }

  match(input: string): RE2MatchArray | null {
    return this[Symbol.match](input);
  }

  /**
   * Outputs the replacement for the matched part of the string
   * @param input
   * @param match
   * @param replacer
   */
  private replaceMatch(
    input: string,
    match: InternalMatchResult,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    replacer: string | ((substring: string, ...args: any[]) => string)
  ): string {
    if (typeof replacer === 'string') {
      let result = '';
      for (let i = 0; i < replacer.length; i++) {
        if (replacer[i] === '$') {
          switch (replacer[i + 1]) {
            case '$':
              result += '$';
              i++;
              break;
            case '&':
              result += match.match;
              i++;
              break;
            case '`':
              result += input.substring(0, match.index);
              i++;
              break;
            case "'":
              result += input.substring(match.index + match.match.length);
              i++;
              break;
            case '<': {
              const endCaret = replacer.indexOf('>', i);
              if (endCaret < 0) {
                throw new Error('Invalid named group replacement');
              }
              const groupName = replacer.substring(i + 2, endCaret);
              if (groupName in this.namedGroups) {
                result += match.groups[this.namedGroups[groupName] - 1] ?? '';
              }
              i = endCaret;
              break;
            }
            default: {
              let groupNum: number;
              if ('123456789'.includes(replacer[i + 1])) {
                if ('0123456789'.includes(replacer[i + 2])) {
                  // Subtract 1 because groups are 1-indexed in replacement strings
                  groupNum =
                    Number.parseInt(replacer.substring(i + 1, i + 3)) - 1;
                  i += 2;
                } else {
                  // Subtract 1 because groups are 1-indexed in replacement strings
                  groupNum = Number.parseInt(replacer[i + 1]) - 1;
                  i++;
                }
              } else {
                throw new Error('Invalid replacement string');
              }
              if (groupNum < match.groups.length) {
                result += match.groups[groupNum] ?? '';
              } else {
                result += '$' + groupNum;
              }
            }
          }
        } else {
          result += replacer[i];
        }
      }
      return result;
    } else {
      return replacer(
        match.match,
        ...match.groups,
        match.index,
        input,
        this.getNamedGroups(match)
      );
    }
  }

  [Symbol.replace](
    input: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    replacer: string | ((substring: string, ...args: any[]) => string)
  ): string {
    if (typeof input !== 'string') {
      input = input + '';
    }
    if (typeof replacer !== 'function') {
      replacer = replacer + '';
    }
    if (this._global) {
      let result = '';
      let nextIndex = 0;
      let success: boolean;
      do {
        const match = this.wrapper.match(input, nextIndex, true);
        success =
          match.index === nextIndex || (!this._sticky && match.index >= 0);
        if (success) {
          result +=
            input.substring(nextIndex, match.index) +
            this.replaceMatch(input, match, replacer);
          nextIndex = match.index + match.match.length;
        }
      } while (success);
      result += input.substring(nextIndex);
      this.lastIndex = 0;
      return result;
    } else {
      const startIndex = this.getMaybeStickyIndex();
      const match = this.wrapper.match(input, startIndex, true);
      this.maybeUpdateLastIndex(match, startIndex);
      if (this.isMatchSuccessful(match, startIndex)) {
        return (
          input.substring(0, match.index) +
          this.replaceMatch(input, match, replacer) +
          input.substring(match.index + match.match.length)
        );
      } else {
        return input;
      }
    }
  }
  replace(
    input: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    replacer: string | ((substring: string, ...args: any[]) => string)
  ): string {
    return this[Symbol.replace](input, replacer);
  }
  [Symbol.search](input: string): number {
    if (typeof input !== 'string') {
      input = input + '';
    }
    const result = this.wrapper.match(input, 0, false).index;
    if (this._sticky && result !== 0) {
      return -1;
    } else {
      return result;
    }
  }
  search(input: string): number {
    return this[Symbol.search](input);
  }
  [Symbol.split](input: string, limit?: number): (string | undefined)[] {
    if (typeof input !== 'string') {
      input = input + '';
    }
    const output = [];
    let nextIndex = 0;
    limit = limit ?? Infinity;
    while (output.length < limit) {
      const nextMatch = this.wrapper.match(input, nextIndex, true);
      if (nextMatch.index >= 0) {
        if (nextMatch.match.length === 0) {
          output.push(input.substring(nextIndex, nextIndex + 1));
          nextIndex = nextIndex + 1;
        } else {
          output.push(input.substring(nextIndex, nextMatch.index));
          nextIndex = nextMatch.index + nextMatch.match.length;
        }
        for (const group of nextMatch.groups) {
          if (output.length >= limit) {
            break;
          }
          output.push(group);
        }
      } else {
        output.push(input.substring(nextIndex));
        break;
      }
    }
    return output;
  }
  split(input: string, limit?: number): (string | undefined)[] {
    return this[Symbol.split](input, limit);
  }
}
