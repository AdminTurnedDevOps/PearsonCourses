"use strict";

exports.__esModule = true;
exports.default = void 0;
var _apidomCore = require("@swagger-api/apidom-core");
var _empty = require("@swagger-api/apidom-reference/configuration/empty");
class JSONParser extends _empty.Parser {
  constructor(options = {}) {
    super({
      name: 'json-swagger-client',
      mediaTypes: ['application/json'],
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
        JSON.parse(file.toString());
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
  async parse(file) {
    if (this.sourceMap) {
      throw new _empty.ParserError("json-swagger-client parser plugin doesn't support sourceMaps option");
    }
    const parseResultElement = new _apidomCore.ParseResultElement();
    const source = file.toString();

    // allow empty files
    if (this.allowEmpty && source.trim() === '') {
      return parseResultElement;
    }
    try {
      const element = (0, _apidomCore.from)(JSON.parse(source));
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
var _default = exports.default = JSONParser;