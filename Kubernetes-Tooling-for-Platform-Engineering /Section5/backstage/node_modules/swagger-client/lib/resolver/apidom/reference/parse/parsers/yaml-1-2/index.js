"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var _jsYaml = _interopRequireWildcard(require("js-yaml"));
var _apidomCore = require("@swagger-api/apidom-core");
var _empty = require("@swagger-api/apidom-reference/configuration/empty");
class YAMLParser extends _empty.Parser {
  constructor(options = {}) {
    super({
      name: 'yaml-1-2-swagger-client',
      mediaTypes: ['text/yaml', 'application/yaml'],
      ...options
    });
  }
  async canParse(file) {
    const hasSupportedFileExtension = this.fileExtensions.length === 0 ? true : this.fileExtensions.includes(file.extension);
    const hasSupportedMediaType = this.mediaTypes.includes(file.mediaType);
    if (!hasSupportedFileExtension) return false;
    if (hasSupportedMediaType) return true;
    if (!hasSupportedMediaType) {
      try {
        _jsYaml.default.load(file.toString(), {
          schema: _jsYaml.JSON_SCHEMA
        });
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
  async parse(file) {
    if (this.sourceMap) {
      throw new _empty.ParserError("yaml-1-2-swagger-client parser plugin doesn't support sourceMaps option");
    }
    const parseResultElement = new _apidomCore.ParseResultElement();
    const source = file.toString();
    try {
      const pojo = _jsYaml.default.load(source, {
        schema: _jsYaml.JSON_SCHEMA
      });
      if (this.allowEmpty && typeof pojo === 'undefined') {
        return parseResultElement;
      }
      const element = (0, _apidomCore.from)(pojo);
      element.classes.push('result');
      parseResultElement.push(element);
      return parseResultElement;
    } catch (error) {
      throw new _empty.ParserError(`Error parsing "${file.uri}"`, {
        cause: error
      });
    }
  }
}
var _default = exports.default = YAMLParser;