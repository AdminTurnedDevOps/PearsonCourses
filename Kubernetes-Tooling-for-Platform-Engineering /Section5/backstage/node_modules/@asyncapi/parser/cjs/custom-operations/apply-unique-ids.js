"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyUniqueIds = void 0;
const constants_1 = require("../constants");
/**
 * This function applies unique ids for objects whose key's function as ids, ensuring that the key is part of the value.
 *
 * For v3; Apply unique ids to all channel's, operations, and message's.
 */
function applyUniqueIds(structure) {
    const asyncapiVersion = structure.asyncapi.charAt(0);
    switch (asyncapiVersion) {
        case '3':
            applyUniqueIdToChannels(structure.channels);
            applyUniqueIdToObjects(structure.operations);
            if (structure.components) {
                applyUniqueIdToObjects(structure.components.messages);
                applyUniqueIdToObjects(structure.components.operations);
                applyUniqueIdToChannels(structure.components.channels);
            }
            break;
    }
}
exports.applyUniqueIds = applyUniqueIds;
function applyUniqueIdToChannels(channels) {
    for (const [channelId, channel] of Object.entries((channels !== null && channels !== void 0 ? channels : {}))) {
        if (!channel[constants_1.xParserObjectUniqueId]) {
            channel[constants_1.xParserObjectUniqueId] = channelId;
        }
        applyUniqueIdToObjects(channel.messages);
    }
}
function applyUniqueIdToObjects(objects) {
    for (const [objectKey, object] of Object.entries((objects !== null && objects !== void 0 ? objects : {}))) {
        if (!object[constants_1.xParserObjectUniqueId]) {
            object[constants_1.xParserObjectUniqueId] = objectKey;
        }
    }
}
