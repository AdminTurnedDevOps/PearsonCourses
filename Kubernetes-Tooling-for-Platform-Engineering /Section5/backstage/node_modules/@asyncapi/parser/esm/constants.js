import specs from '@asyncapi/specs';
export const xParserSpecParsed = 'x-parser-spec-parsed';
export const xParserSpecStringified = 'x-parser-spec-stringified';
export const xParserApiVersion = 'x-parser-api-version';
export const xParserMessageName = 'x-parser-message-name';
export const xParserMessageParsed = 'x-parser-message-parsed';
export const xParserSchemaId = 'x-parser-schema-id';
export const xParserOriginalSchemaFormat = 'x-parser-original-schema-format';
export const xParserOriginalPayload = 'x-parser-original-payload';
export const xParserOriginalTraits = 'x-parser-original-traits';
export const xParserCircular = 'x-parser-circular';
export const xParserCircularProps = 'x-parser-circular-props';
export const xParserObjectUniqueId = 'x-parser-unique-object-id';
export const EXTENSION_REGEX = /^x-[\w\d.\-_]+$/;
// Only >=2.0.0 versions are supported
export const specVersions = Object.keys(specs.schemas);
export const lastVersion = specVersions[specVersions.length - 1];
