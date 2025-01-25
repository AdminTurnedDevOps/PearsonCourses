"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletionItemKind = exports.FileChangeTypeKind = exports.GraphQLDocumentMode = exports.InsertTextFormat = void 0;
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
Object.defineProperty(exports, "InsertTextFormat", { enumerable: true, get: function () { return vscode_languageserver_types_1.InsertTextFormat; } });
var parser_1 = require("./parser");
Object.defineProperty(exports, "GraphQLDocumentMode", { enumerable: true, get: function () { return parser_1.GraphQLDocumentMode; } });
exports.FileChangeTypeKind = {
    Created: 1,
    Changed: 2,
    Deleted: 3,
};
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind.Text = 1;
    CompletionItemKind.Method = 2;
    CompletionItemKind.Function = 3;
    CompletionItemKind.Constructor = 4;
    CompletionItemKind.Field = 5;
    CompletionItemKind.Variable = 6;
    CompletionItemKind.Class = 7;
    CompletionItemKind.Interface = 8;
    CompletionItemKind.Module = 9;
    CompletionItemKind.Property = 10;
    CompletionItemKind.Unit = 11;
    CompletionItemKind.Value = 12;
    CompletionItemKind.Enum = 13;
    CompletionItemKind.Keyword = 14;
    CompletionItemKind.Snippet = 15;
    CompletionItemKind.Color = 16;
    CompletionItemKind.File = 17;
    CompletionItemKind.Reference = 18;
    CompletionItemKind.Folder = 19;
    CompletionItemKind.EnumMember = 20;
    CompletionItemKind.Constant = 21;
    CompletionItemKind.Struct = 22;
    CompletionItemKind.Event = 23;
    CompletionItemKind.Operator = 24;
    CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind = exports.CompletionItemKind || (exports.CompletionItemKind = {}));
//# sourceMappingURL=types.js.map