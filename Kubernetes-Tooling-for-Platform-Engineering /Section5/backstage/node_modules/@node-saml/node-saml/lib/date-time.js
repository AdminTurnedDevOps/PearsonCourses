"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateStringToTimestamp = exports.generateInstant = void 0;
/**
 * Return the current time in ISO format.
 */
const generateInstant = () => {
    return new Date().toISOString();
};
exports.generateInstant = generateInstant;
/**
 * Convert a date string to a timestamp (in milliseconds).
 *
 * @param dateString A string representation of a date
 * @param label Descriptive name of the date being passed in, e.g. "NotOnOrAfter"
 * @throws Will throw an error if parsing `dateString` returns `NaN`
 * @returns {number} The timestamp (in milliseconds) representation of the given date
 */
const dateStringToTimestamp = (dateString, label) => {
    const dateMs = Date.parse(dateString);
    if (isNaN(dateMs)) {
        throw new Error(`Error parsing ${label}: '${dateString}' is not a valid date`);
    }
    return dateMs;
};
exports.dateStringToTimestamp = dateStringToTimestamp;
//# sourceMappingURL=date-time.js.map