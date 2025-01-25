"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateServiceProviderMetadata = void 0;
const crypto_1 = require("./crypto");
const types_1 = require("./types");
const utility_1 = require("./utility");
const xml_1 = require("./xml");
const crypto_2 = require("./crypto");
const constants_1 = require("./constants");
const generateServiceProviderMetadata = (params) => {
    const { issuer, callbackUrl, logoutCallbackUrl, decryptionPvk, privateKey, metadataContactPerson, metadataOrganization, identifierFormat = constants_1.DEFAULT_IDENTIFIER_FORMAT, wantAssertionsSigned = constants_1.DEFAULT_WANT_ASSERTIONS_SIGNED, 
    // This matches the default used in the `SAML` class.
    generateUniqueId = crypto_2.generateUniqueId, } = params;
    let { publicCerts, decryptionCert } = params;
    if (decryptionPvk != null) {
        if (!decryptionCert) {
            throw new Error("Missing decryptionCert while generating metadata for decrypting service provider");
        }
    }
    else {
        decryptionCert = null;
    }
    if (privateKey != null) {
        if (!publicCerts) {
            throw new Error("Missing publicCert while generating metadata for signing service provider messages");
        }
        publicCerts = !Array.isArray(publicCerts) ? [publicCerts] : publicCerts;
    }
    else {
        publicCerts = null;
    }
    const metadata = {
        EntityDescriptor: {
            "@xmlns": "urn:oasis:names:tc:SAML:2.0:metadata",
            "@xmlns:ds": "http://www.w3.org/2000/09/xmldsig#",
            "@entityID": issuer,
            "@ID": generateUniqueId(),
            SPSSODescriptor: {
                "@protocolSupportEnumeration": "urn:oasis:names:tc:SAML:2.0:protocol",
                "@AuthnRequestsSigned": "false",
            },
            ...(metadataOrganization ? { Organization: metadataOrganization } : {}),
            ...(metadataContactPerson ? { ContactPerson: metadataContactPerson } : {}),
        },
    };
    if (decryptionCert != null || publicCerts != null) {
        metadata.EntityDescriptor.SPSSODescriptor.KeyDescriptor = [];
        if ((0, types_1.isValidSamlSigningOptions)(params)) {
            (0, utility_1.assertRequired)(publicCerts, "Missing publicCert while generating metadata for signing service provider messages");
            metadata.EntityDescriptor.SPSSODescriptor["@AuthnRequestsSigned"] = true;
            const certArray = Array.isArray(publicCerts) ? publicCerts : [publicCerts];
            const signingKeyDescriptors = certArray.map((cert) => ({
                "@use": "signing",
                "ds:KeyInfo": {
                    "ds:X509Data": {
                        "ds:X509Certificate": {
                            "#text": (0, crypto_1.stripPemHeaderAndFooter)(cert),
                        },
                    },
                },
            }));
            metadata.EntityDescriptor.SPSSODescriptor.KeyDescriptor.push(signingKeyDescriptors);
        }
        if (decryptionPvk != null) {
            (0, utility_1.assertRequired)(decryptionCert, "Missing decryptionCert while generating metadata for decrypting service provider");
            decryptionCert = (0, crypto_1.stripPemHeaderAndFooter)(decryptionCert);
            metadata.EntityDescriptor.SPSSODescriptor.KeyDescriptor.push({
                "@use": "encryption",
                "ds:KeyInfo": {
                    "ds:X509Data": {
                        "ds:X509Certificate": {
                            "#text": decryptionCert,
                        },
                    },
                },
                EncryptionMethod: [
                    // this should be the set that the xmlenc library supports
                    { "@Algorithm": "http://www.w3.org/2009/xmlenc11#aes256-gcm" },
                    { "@Algorithm": "http://www.w3.org/2009/xmlenc11#aes128-gcm" },
                    { "@Algorithm": "http://www.w3.org/2001/04/xmlenc#aes256-cbc" },
                    { "@Algorithm": "http://www.w3.org/2001/04/xmlenc#aes128-cbc" },
                ],
            });
        }
    }
    if (logoutCallbackUrl != null) {
        metadata.EntityDescriptor.SPSSODescriptor.SingleLogoutService = {
            "@Binding": "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
            "@Location": logoutCallbackUrl,
        };
    }
    if (identifierFormat != null) {
        metadata.EntityDescriptor.SPSSODescriptor.NameIDFormat = identifierFormat;
    }
    if (wantAssertionsSigned) {
        metadata.EntityDescriptor.SPSSODescriptor["@WantAssertionsSigned"] = true;
    }
    metadata.EntityDescriptor.SPSSODescriptor.AssertionConsumerService = {
        "@index": "1",
        "@isDefault": "true",
        "@Binding": "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
        "@Location": callbackUrl,
    };
    let metadataXml = (0, xml_1.buildXmlBuilderObject)(metadata, true);
    if (params.signMetadata === true && (0, types_1.isValidSamlSigningOptions)(params)) {
        metadataXml = (0, utility_1.signXmlMetadata)(metadataXml, {
            privateKey: params.privateKey,
            signatureAlgorithm: params.signatureAlgorithm,
            xmlSignatureTransforms: params.xmlSignatureTransforms,
            digestAlgorithm: params.digestAlgorithm,
        });
    }
    return metadataXml;
};
exports.generateServiceProviderMetadata = generateServiceProviderMetadata;
//# sourceMappingURL=metadata.js.map