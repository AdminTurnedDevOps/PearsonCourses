import { Bindings } from './bindings';
import { Binding } from './binding';
import { Extensions } from './extensions';
import { Extension } from './extension';
import { ExternalDocumentation } from './external-docs';
import { Tags } from './tags';
import { Tag } from './tag';
import { createModel } from '../utils';
import { EXTENSION_REGEX } from '../../constants';
export function bindings(model) {
    const bindings = model.json('bindings') || {};
    return new Bindings(Object.entries(bindings || {}).map(([protocol, binding]) => createModel(Binding, binding, { protocol, pointer: model.jsonPath(`bindings/${protocol}`) }, model)), { originalData: bindings, asyncapi: model.meta('asyncapi'), pointer: model.jsonPath('bindings') });
}
export function hasDescription(model) {
    return Boolean(description(model));
}
export function description(model) {
    return model.json('description');
}
export function extensions(model) {
    const extensions = [];
    Object.entries(model.json()).forEach(([id, value]) => {
        if (EXTENSION_REGEX.test(id)) {
            extensions.push(createModel(Extension, value, { id, pointer: model.jsonPath(id) }, model));
        }
    });
    return new Extensions(extensions);
}
export function hasExternalDocs(model) {
    return Object.keys(model.json('externalDocs') || {}).length > 0;
}
export function externalDocs(model) {
    if (hasExternalDocs(model)) {
        return new ExternalDocumentation(model.json('externalDocs'));
    }
}
export function tags(model) {
    return new Tags((model.json('tags') || []).map((tag, idx) => createModel(Tag, tag, { pointer: model.jsonPath(`tags/${idx}`) }, model)));
}
