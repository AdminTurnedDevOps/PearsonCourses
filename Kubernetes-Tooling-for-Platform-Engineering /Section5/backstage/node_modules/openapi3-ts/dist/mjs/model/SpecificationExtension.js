export class SpecificationExtension {
    static isValidExtension(extensionName) {
        return /^x-/.test(extensionName);
    }
    getExtension(extensionName) {
        if (!SpecificationExtension.isValidExtension(extensionName)) {
            throw new Error(`Invalid specification extension: '${extensionName}'. Extensions must start with prefix 'x-`);
        }
        if (this[extensionName]) {
            return this[extensionName];
        }
        return null;
    }
    addExtension(extensionName, payload) {
        if (!SpecificationExtension.isValidExtension(extensionName)) {
            throw new Error(`Invalid specification extension: '${extensionName}'. Extensions must start with prefix 'x-`);
        }
        this[extensionName] = payload;
    }
    listExtensions() {
        const res = [];
        for (const propName in this) {
            if (Object.prototype.hasOwnProperty.call(this, propName)) {
                if (SpecificationExtension.isValidExtension(propName)) {
                    res.push(propName);
                }
            }
        }
        return res;
    }
}
