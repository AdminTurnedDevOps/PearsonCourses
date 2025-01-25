"use strict";

// const punycode = require('punycode');
const nearley = require("nearley");

import { default as myGrammar } from "./grammar";
myGrammar.ParserStart = "Mailbox";
const grammar = nearley.Grammar.fromCompiled(myGrammar);

// <https://tools.ietf.org/html/rfc5321#section-4.1.2>

export function parse(address: string) {

    // An insane length, to protect the parsing code from huge input. SMTP line limit, minus command size.
    const insane_length = 1000 - "MAIL FROM:<>\r\n".length;

    if (address.length > insane_length) {
        throw new Error("address too long");
    }

    const parser = new nearley.Parser(grammar);
    parser.feed(address);

    if (parser.results.length !== 1) {
        throw new Error("address parsing failed: ambiguous grammar");
    }

    // Domain checks

    const at_idx = address.lastIndexOf('@'); // must be found, since parse was successful
    const domain = address.substring(at_idx + 1);
    if (domain[0] !== '[') {       // Not an address literal
        if (domain.length > 253) {
            throw new Error("domain too long");
        }
        const labels = domain.split(".");
        if (labels.length < 2) {
            throw new Error("domain not fully qualified");
        }
        if (labels[labels.length - 1].length < 2) {
            throw new Error("top level domain label too short");
        }

        labels.sort(function(a: string, b: string) {
            return b.length - a.length;
        });
        if (labels[0].length > 63) {
            throw new Error("domain label too long");
        }
    }
    return parser.results[0];
}

/** Strip +something, strip '.'s, and map to lower case.
 */
export function normalize_dot_string(dot_string: string) {
    const tagless = (function () {
        const plus_loc = dot_string.indexOf("+");
        if (plus_loc === -1) {
            return dot_string;
        }
        return dot_string.substr(0, plus_loc);
    })();
    const dotless = tagless.replace(/\./g, "");
    return dotless.toLowerCase();
}

/** The G style address normalization.
 */
export function normalize(address: string) {
    const a = parse(address);
    const domain = a.domainPart.AddressLiteral ?? a.domainPart.DomainName.toLowerCase();
    const local = a.localPart.QuotedString ?? normalize_dot_string(a.localPart.DotString);
    return `${local}@${domain}`;
}

export function canonicalize_quoted_string(quoted_string: string) {
    const unquoted = quoted_string.substr(1).substr(0, quoted_string.length - 2);
    const unescaped = unquoted.replace(/(?:\\(.))/g, "$1");
    const reescaped = unescaped.replace(/(?:(["\\]))/g, "\\$1");
    return `"${reescaped}"`; // re-quote
}

/**
 * Apply a canonicalization consistent with standards to support
 * comparison as a string.
 */
export function canonicalize(address: string) {
    const a = parse(address);
    const domain = a.domainPart.AddressLiteral ?? a.domainPart.DomainName.toLowerCase();
    const local = a.localPart.QuotedString
        ? canonicalize_quoted_string(a.localPart.QuotedString)
        : a.localPart.DotString;
    return `${local}@${domain}`;
}
