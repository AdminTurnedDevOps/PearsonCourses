/**
 * Return the current time in ISO format.
 */
export declare const generateInstant: () => string;
/**
 * Convert a date string to a timestamp (in milliseconds).
 *
 * @param dateString A string representation of a date
 * @param label Descriptive name of the date being passed in, e.g. "NotOnOrAfter"
 * @throws Will throw an error if parsing `dateString` returns `NaN`
 * @returns {number} The timestamp (in milliseconds) representation of the given date
 */
export declare const dateStringToTimestamp: (dateString: string, label: string) => number;
