import { isObject } from '../../../utils';
import { getAllOperations } from './getAllOperations';
export function* getAllMessages(asyncapi) {
    for (const { path, operation } of getAllOperations(asyncapi)) {
        if (!isObject(operation)) {
            continue;
        }
        const maybeMessage = operation.message;
        if (!isObject(maybeMessage)) {
            continue;
        }
        const oneOf = maybeMessage.oneOf;
        if (Array.isArray(oneOf)) {
            for (const [index, message] of oneOf.entries()) {
                if (isObject(message)) {
                    yield {
                        path: [...path, 'message', 'oneOf', index],
                        message,
                    };
                }
            }
        }
        else {
            yield {
                path: [...path, 'message'],
                message: maybeMessage,
            };
        }
    }
}
