var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function validateSchema(parser, input) {
    return __awaiter(this, void 0, void 0, function* () {
        const schemaParser = parser.parserRegistry.get(input.schemaFormat);
        if (schemaParser === undefined) {
            const { path, schemaFormat } = input;
            path.pop(); // remove 'payload' as last element of path
            return [
                {
                    message: `Unknown schema format: "${schemaFormat}"`,
                    path: [...path, 'schemaFormat'],
                },
                {
                    message: `Cannot validate and parse given schema due to unknown schema format: "${schemaFormat}"`,
                    path: [...path, 'payload'],
                }
            ];
        }
        return schemaParser.validate(input);
    });
}
export function parseSchema(parser, input) {
    return __awaiter(this, void 0, void 0, function* () {
        const schemaParser = parser.parserRegistry.get(input.schemaFormat);
        if (schemaParser === undefined) {
            throw new Error('Unknown schema format');
        }
        return schemaParser.parse(input);
    });
}
export function registerSchemaParser(parser, schemaParser) {
    if (typeof schemaParser !== 'object'
        || typeof schemaParser.validate !== 'function'
        || typeof schemaParser.parse !== 'function'
        || typeof schemaParser.getMimeTypes !== 'function') {
        throw new Error('Custom parser must have "parse()", "validate()" and "getMimeTypes()" functions.');
    }
    schemaParser.getMimeTypes().forEach(schemaFormat => {
        parser.parserRegistry.set(schemaFormat, schemaParser);
    });
}
export function getSchemaFormat(schematFormat, asyncapiVersion) {
    if (typeof schematFormat === 'string') {
        return schematFormat;
    }
    return getDefaultSchemaFormat(asyncapiVersion);
}
export function getDefaultSchemaFormat(asyncapiVersion) {
    return `application/vnd.aai.asyncapi;version=${asyncapiVersion}`;
}
