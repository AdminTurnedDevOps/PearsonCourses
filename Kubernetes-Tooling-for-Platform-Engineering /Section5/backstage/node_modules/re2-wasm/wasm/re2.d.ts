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

interface InternalMatchResult {
  match: string;
  index: number;
  groups: (string | undefined)[];
}

interface CppVector<V> {
  get(index: number): V;
  size(): number;
}

interface CppMap<K, V> {
  keys(): CppVector<K>;
  get(index: K): V;
}

export interface WrappedRE2Interface {
  ok(): boolean;
  error(): string;
  pattern(): string;
  match(input: string, start: number, getCapturingGroups: boolean): InternalMatchResult;
  capturingGroupNames(): CppMap<number, string>;
}

export interface WrappedRE2Constructor {
  new(pattern: string, ignoreCase: boolean, multiline: boolean, dotAll: boolean): WrappedRE2Interface;
}

export class WrappedRE2 implements WrappedRE2Interface {
  constructor(pattern: string, ignoreCase: boolean, multiline: boolean, dotAll: boolean);
  ok(): boolean;
  error(): string;
  pattern(): string;
  match(input: string, start: number, getCapturingGroups: boolean): InternalMatchResult;
  capturingGroupNames(): CppMap<number, string>;
}