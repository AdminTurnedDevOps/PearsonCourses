"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSegmentFragment = void 0;
const json_1 = require("@stoplight/json");
function decodeSegmentFragment(segment) {
    return typeof segment !== 'string' ? String(segment) : (0, json_1.decodePointerFragment)(segment);
}
exports.decodeSegmentFragment = decodeSegmentFragment;
//# sourceMappingURL=decodeSegmentFragment.js.map