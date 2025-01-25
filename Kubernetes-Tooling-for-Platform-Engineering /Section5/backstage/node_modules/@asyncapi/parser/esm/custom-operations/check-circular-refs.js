import { setExtension } from '../utils';
import { xParserCircular } from '../constants';
export function checkCircularRefs(document) {
    if (hasInlineRef(document.json())) {
        setExtension(xParserCircular, true, document);
    }
}
function hasInlineRef(data) {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (Object.prototype.hasOwnProperty.call(data, '$ref')) {
            return true;
        }
        for (const p in data) {
            if (hasInlineRef(data[p])) {
                return true;
            }
        }
    }
    return false;
}
