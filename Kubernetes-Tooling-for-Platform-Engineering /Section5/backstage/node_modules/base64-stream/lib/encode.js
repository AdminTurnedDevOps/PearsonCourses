const { Transform } = require('stream');

/**
 * Transforms a Buffer stream of binary data to a stream of Base64 text. Note that this will
 * also work on a stream of pure strings, as the Writeable base class will automatically decode
 * text string chunks into Buffers.
 * You can pass optionally a line length or a prefix
 * @extends Transform
 */
module.exports = class Base64Encode extends Transform {
    /**
     * Creates a Base64Encode
     * @param {Object=} options - Options for stream creation. Passed to Transform constructor as-is.
     * @param {string=} options.inputEncoding - The input chunk format. Default is 'utf8'. No effect on Buffer input chunks.
     * @param {string=} options.outputEncoding - The output chunk format. Default is 'utf8'. Pass `null` for Buffer chunks.
     * @param {number=} options.lineLength - The max line-length of the output stream.
     * @param {string=} options.prefix - Prefix for output string.
     */
    constructor(options) {
        super(options);

        // Any extra chars from the last chunk
        this.extra = null;
        this.lineLength = options && options.lineLength;
        this.currLineLength = 0;
        if (options && options.prefix) {
            this.push(options.prefix);
        }

        // Default string input to be treated as 'utf8'
        const encIn = options && options.inputEncoding;
        this.setDefaultEncoding(encIn || 'utf8');

        // Default output to be strings
        const encOut = options && options.outputEncoding;
        if (encOut !== null) {
            this.setEncoding(encOut || 'utf8');
        }
    }

    /**
     * Adds \r\n as needed to the data chunk to ensure that the output Base64 string meets
     * the maximum line length requirement.
     * @param {string} chunk
     * @returns {string}
     * @private
     */
    _fixLineLength(chunk) {
        // If we care about line length, add line breaks
        if (!this.lineLength) {
            return chunk;
        }

        const size = chunk.length;
        const needed = this.lineLength - this.currLineLength;
        let start, end;

        let _chunk = '';
        for (start = 0, end = needed; end < size; start = end, end += this.lineLength) {
            _chunk += chunk.slice(start, end);
            _chunk += '\r\n';
        }

        const left = chunk.slice(start);
        this.currLineLength = left.length;

        _chunk += left;

        return _chunk;
    }

    /**
    * Transforms a Buffer chunk of data to a Base64 string chunk.
    * @param {Buffer} chunk
    * @param {string} encoding - unused since chunk is always a Buffer
    * @param cb
    * @private
    */
    _transform(chunk, encoding, cb) {
        // Add any previous extra bytes to the chunk
        if (this.extra) {
            chunk = Buffer.concat([this.extra, chunk]);
            this.extra = null;
        }

        // 3 bytes are represented by 4 characters, so we can only encode in groups of 3 bytes
        const remaining = chunk.length % 3;

        if (remaining !== 0) {
            // Store the extra bytes for later
            this.extra = chunk.slice(chunk.length - remaining);
            chunk = chunk.slice(0, chunk.length - remaining);
        }

        // Convert chunk to a base 64 string
        chunk = chunk.toString('base64');

        // Push the chunk
        this.push(Buffer.from(this._fixLineLength(chunk)));
        cb();
    }

    /**
     * Emits 0 or 4 extra characters of Base64 data.
     * @param cb
     * @private
     */
    _flush(cb) {
        if (this.extra) {
            this.push(Buffer.from(this._fixLineLength(this.extra.toString('base64'))));
        }

        cb();
    }

};
