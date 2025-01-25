import { fullFormats } from "ajv-formats/dist/formats.js";
import draft2019Formats from "ajv-formats-draft2019/formats/index.js";
import isCidr from "is-cidr";
// From: https://github.com/miguelmota/is-base64/blob/0702e189090921a2f11b4342f27906ff8c43d7ec/is-base64.js#L15
const rBase64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
// https://github.com/kubernetes/apimachinery/blob/8c18d83/pkg/api/resource/quantity.go
const rSignedNumber = /[+-]?(?:\d+|\d+\.\d+|\d+\.|\.\d+)/;
// https://physics.nist.gov/cuu/Units/binary.html
const rBinarySI = /[KMGTPE]i/;
// https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes
const rDecimalSI = /(?:[YZEPTGMkhdcmunpfazy]|da)/;
const rDecimalExponent = new RegExp(`[eE]${rSignedNumber.source}`);
const rQuantitySuffix = new RegExp(`(?:${rBinarySI.source}|${rDecimalSI.source}|${rDecimalExponent.source})?`);
const rQuantity = new RegExp(`^${rSignedNumber.source}${rQuantitySuffix.source}$`);
export const formats = {
    ...fullFormats,
    ...draft2019Formats,
    byte: {
        type: "string",
        validate: (value) => rBase64.test(value)
    },
    quantity: {
        type: "string",
        validate: rQuantity
    },
    // This format is used in Istio.
    string: {
        type: "string",
        validate: (value) => typeof value === "string"
    },
    cidr: {
        type: "string",
        validate: (value) => isCidr(value) !== 0
    }
};
export function addFormats(ajv) {
    for (const [name, format] of Object.entries(formats)) {
        ajv.addFormat(name, format);
    }
}
//# sourceMappingURL=formats.mjs.map