import * as stream from 'stream';
import * as crypto from 'crypto';
import * as tls from 'tls';
import * as net from 'net';

type ErrorWithConsumedData = Error & {
    consumedData: Buffer
};

const collectBytes = (stream: stream.Readable, byteLength: number) => {
    if (byteLength === 0) return Buffer.from([]);

    return new Promise<Buffer>(async (resolve, reject) => {
        const closeReject = () => reject(new Error('Stream closed before expected data could be read'));

        const data: Buffer[] = [];

        try {
            stream.on('error', reject);
            stream.on('close', closeReject);
            let dataLength = 0;
            let readNull = false;
            do {
                if (!stream.readable || readNull) await new Promise<Buffer>((resolve) => stream.once('readable', resolve));

                const nextData = stream.read(byteLength - dataLength)
                    ?? stream.read(); // If less than wanted data is available, at least read what we can get

                if (nextData === null) {
                    // Still null => tried to read, not enough data
                    readNull = true;
                    continue;
                }

                data.push(nextData);
                dataLength += nextData.byteLength;
            } while (dataLength < byteLength)

            return resolve(Buffer.concat(data, byteLength));
        } catch (e) {
            Object.assign(e as ErrorWithConsumedData, { consumedData: data });
            reject(e);
        } finally {
            stream.removeListener('error', reject);
            stream.removeListener('close', closeReject);
        }
    });
};

const getUint16BE = (buffer: Buffer, offset: number) =>
    (buffer[offset] << 8) + buffer[offset+1];

// https://datatracker.ietf.org/doc/html/draft-davidben-tls-grease-01 defines GREASE values for various
// TLS fields, reserving 0a0a, 1a1a, 2a2a, etc for ciphers, extension ids & supported groups.
const isGREASE = (value: number) => (value & 0x0f0f) == 0x0a0a;

export type TlsHelloData = {
    serverName: string | undefined;
    alpnProtocols: string[] | undefined;
    fingerprintData: TlsFingerprintData;
};

export type TlsFingerprintData = [
    tlsVersion: number,
    ciphers: number[],
    extensions: number[],
    groups: number[],
    curveFormats: number[]
];

/**
 * Seperate error class. If you want to detect TLS parsing errors, but ignore TLS fingerprint
 * issues from definitely-not-TLS traffic, you can ignore all instances of this error.
 */
export class NonTlsError extends Error {
    constructor(message: string) {
        super(message);

        // Fix prototypes (required for custom error types):
        const actualProto = new.target.prototype;
        Object.setPrototypeOf(this, actualProto);
    }
}

async function extractTlsHello(inputStream: stream.Readable): Promise<Buffer> {
    const consumedData = [];
    try {
        consumedData.push(await collectBytes(inputStream, 1));
        const [recordType] = consumedData[0];
        if (recordType !== 0x16) throw new Error("Can't calculate TLS fingerprint - not a TLS stream");

        consumedData.push(await collectBytes(inputStream, 2));
        const recordLengthBytes = await collectBytes(inputStream, 2);
        consumedData.push(recordLengthBytes);
        const recordLength = recordLengthBytes.readUint16BE();

        consumedData.push(await collectBytes(inputStream, recordLength));

        // Put all the bytes back, so that this stream can still be used to create a real TLS session
        return Buffer.concat(consumedData);
    } catch (error: any) {
        if (error.consumedData) {
            // This happens if there's an error inside collectBytes with a partial read.
            (error.consumedData as ErrorWithConsumedData).consumedData = Buffer.concat([
                ...consumedData,
                error.consumedData as Buffer
            ])
        } else {
            Object.assign(error, { consumedData: Buffer.concat(consumedData) });
        }

        throw error;
    }
}

function parseSniData(data: Buffer) {
    // SNI is almost always just one value - and is arguably required to be, since there's only one type
    // in the RFC and you're only allowed one name per type, but it's still structured as a list:
    let offset = 0;
    while (offset < data.byteLength) {
        const entryLength = data.readUInt16BE(offset);
        offset += 2;
        const entryType = data[offset];
        offset += 1;
        const nameLength = data.readUInt16BE(offset);
        offset += 2;

        if (nameLength !== entryLength - 3) {
            throw new Error('Invalid length in SNI entry');
        }

        const name = data.slice(offset, offset + nameLength).toString('ascii');
        offset += nameLength;

        if (entryType === 0x0) return name;
    }

    // No data, or no names with DNS hostname type.
    return undefined;
}

function parseAlpnData(data: Buffer) {
    const protocols: string[] = [];

    const listLength = data.readUInt16BE();
    if (listLength !== data.byteLength - 2) {
        throw new Error('Invalid length for ALPN list');
    }

    let offset = 2;
    while (offset < data.byteLength) {
        const nameLength = data[offset];
        offset += 1;
        const name = data.slice(offset, offset + nameLength).toString('ascii');
        offset += nameLength;
        protocols.push(name);
    }

    return protocols;
}

export async function readTlsClientHello(inputStream: stream.Readable): Promise<TlsHelloData> {
    const wasFlowing = inputStream.readableFlowing;
    if (wasFlowing) inputStream.pause(); // Pause other readers, so we have time to precisely get the data we need.

    let clientHelloRecordData: Buffer;
    try {
        clientHelloRecordData = await extractTlsHello(inputStream);
    } catch (error: any) {
        if ('consumedData' in error) {
            inputStream.unshift(error.consumedData as Buffer);
        }
        if (wasFlowing) inputStream.resume(); // If there were other readers, resume and let them continue
        throw new NonTlsError(error.message);
    }

    // Put all the bytes back, so that this stream can still be used to create a real TLS session
    inputStream.unshift(clientHelloRecordData);
    if (wasFlowing) inputStream.resume(); // If there were other readers, resume and let them continue

    // Collect all the hello bytes, and then give us a stream of exactly only those bytes, so we can
    // still process them step by step in order:
    const clientHello = clientHelloRecordData.slice(5); // Strip TLS record prefix
    const helloDataStream = stream.Readable.from(clientHello, { objectMode: false });

    const [helloType] = (await collectBytes(helloDataStream, 1));
    if (helloType !== 0x1) throw new Error("Can't calculate TLS fingerprint - not a TLS client hello");

    const helloLength = (await collectBytes(helloDataStream, 3)).readIntBE(0, 3);
    if (helloLength !== clientHello.byteLength - 4) throw new Error(
        `Unexpected client hello length: ${helloLength} (of ${clientHello.byteLength})`
    );

    const clientTlsVersion = await collectBytes(helloDataStream, 2);
    const clientRandom = await collectBytes(helloDataStream, 32);

    const [sessionIdLength] = await collectBytes(helloDataStream, 1);
    const sessionId = await collectBytes(helloDataStream, sessionIdLength);

    const cipherSuitesLength = (await collectBytes(helloDataStream, 2)).readUint16BE();
    const cipherSuites = await collectBytes(helloDataStream, cipherSuitesLength);

    const [compressionMethodsLength] = await collectBytes(helloDataStream, 1);
    const compressionMethods = await collectBytes(helloDataStream, compressionMethodsLength);

    const extensionsLength = (await collectBytes(helloDataStream, 2)).readUint16BE();
    let readExtensionsDataLength = 0;
    const extensions: Array<{ id: Buffer, data: Buffer }> = [];

    while (readExtensionsDataLength < extensionsLength) {
        const extensionId = await collectBytes(helloDataStream, 2);
        const extensionLength = (await collectBytes(helloDataStream, 2)).readUint16BE();
        const extensionData = await collectBytes(helloDataStream, extensionLength);

        extensions.push({ id: extensionId, data: extensionData });
        readExtensionsDataLength += 4 + extensionLength;
    }

    // All data received & parsed! Now turn it into the fingerprint format:
    //SSLVersion,Cipher,SSLExtension,EllipticCurve,EllipticCurvePointFormat

    const tlsVersionFingerprint = clientTlsVersion.readUint16BE()

    const cipherFingerprint: number[] = [];
    for (let i = 0; i < cipherSuites.length; i += 2) {
        const cipherId = getUint16BE(cipherSuites, i);
        if (isGREASE(cipherId)) continue;
        cipherFingerprint.push(cipherId);
    }

    const extensionsFingerprint: number[] = extensions
        .map(({ id }) => getUint16BE(id, 0))
        .filter(id => !isGREASE(id));

    const supportedGroupsData = (
        extensions.find(({ id }) => id.equals(Buffer.from([0x0, 0x0a])))?.data
        ?? Buffer.from([])
    ).slice(2) // Drop the length prefix

    const groupsFingerprint: number[] = [];
    for (let i = 0; i < supportedGroupsData.length; i += 2) {
        const groupId = getUint16BE(supportedGroupsData, i)
        if (isGREASE(groupId)) continue;
        groupsFingerprint.push(groupId);
    }

    const curveFormatsData = extensions.find(({ id }) => id.equals(Buffer.from([0x0, 0x0b])))?.data
        ?? Buffer.from([]);
    const curveFormatsFingerprint: number[] = Array.from(curveFormatsData.slice(1)); // Drop length prefix

    const fingerprintData = [
        tlsVersionFingerprint,
        cipherFingerprint,
        extensionsFingerprint,
        groupsFingerprint,
        curveFormatsFingerprint
    ] as TlsFingerprintData;

    // And capture other client hello data that might be interesting:
    const sniExtensionData = extensions.find(({ id }) => id.equals(Buffer.from([0x0, 0x0])))?.data;
    const serverName = sniExtensionData
        ? parseSniData(sniExtensionData)
        : undefined;

    const alpnExtensionData = extensions.find(({ id }) => id.equals(Buffer.from([0x0, 0x10])))?.data;
    const alpnProtocols = alpnExtensionData
        ? parseAlpnData(alpnExtensionData)
        : undefined;

    return {
        serverName,
        alpnProtocols,
        fingerprintData
    };
}

export function calculateJa3FromFingerprintData(fingerprintData: TlsFingerprintData) {
    const fingerprintString = [
        fingerprintData[0],
        fingerprintData[1].join('-'),
        fingerprintData[2].join('-'),
        fingerprintData[3].join('-'),
        fingerprintData[4].join('-')
    ].join(',');

    return crypto.createHash('md5').update(fingerprintString).digest('hex');
}

export async function getTlsFingerprintAsJa3(rawStream: stream.Readable) {
    return calculateJa3FromFingerprintData(
        (await readTlsClientHello(rawStream)).fingerprintData
    );
}

interface SocketWithHello extends net.Socket {
    tlsClientHello?: TlsHelloData & {
        ja3: string;
    }
}

declare module 'tls' {
    interface TLSSocket {
        /**
         * This module extends the global TLS types so that all TLS sockets may include
         * TLS fingerprint data.
         *
         * This is only set if the socket came from a TLS server where fingerprinting
         * has been enabled with `trackClientHellos`.
         */
        tlsClientHello?: TlsHelloData & {
            ja3: string;
        }
    }
}

/**
 * Modify a TLS server, so that the TLS client hello is always parsed and the result is
 * attached to all sockets at the point when the 'secureConnection' event fires.
 *
 * This method mutates and returns the TLS server provided. TLS client hello data is
 * available from all TLS sockets afterwards in the `socket.tlsClientHello` property.
 *
 * This will work for all standard uses of a TLS server or similar (e.g. an HTTPS server)
 * but may behave unpredictably for advanced use cases, e.g. if you are already
 * manually injecting connections, hooking methods or events or otherwise doing something
 * funky & complicated. In those cases you probably want to use the fingerprint
 * calculation methods directly inside your funky logic instead.
 */
export function trackClientHellos(tlsServer: tls.Server) {
    // Disable the normal TLS 'connection' event listener that triggers TLS setup:
    const tlsConnectionListener = tlsServer.listeners('connection')[0] as (socket: net.Socket) => {};
    if (!tlsConnectionListener) throw new Error('TLS server is not listening for connection events');
    tlsServer.removeListener('connection', tlsConnectionListener);

    // Listen ourselves for connections, get the fingerprint first, then let TLS setup resume:
    tlsServer.on('connection', async (socket: SocketWithHello) => {
        try {
            const helloData = await readTlsClientHello(socket);

            socket.tlsClientHello = {
                ...helloData,
                ja3: calculateJa3FromFingerprintData(helloData.fingerprintData)
            };
        } catch (e) {
            if (!(e instanceof NonTlsError)) { // Ignore totally non-TLS traffic
                console.warn(`TLS client hello data not available for TLS connection from ${
                    socket.remoteAddress ?? 'unknown address'
                }: ${(e as Error).message ?? e}`);
            }
        }

        // Once we have a fingerprint, TLS handshakes can continue as normal:
        tlsConnectionListener.call(tlsServer, socket);
    });

    tlsServer.prependListener('secureConnection', (tlsSocket: tls.TLSSocket) => {
        const fingerprint = (tlsSocket as unknown as {
            _parent?: SocketWithHello, // Private TLS socket field which points to the source
        })._parent?.tlsClientHello;

        tlsSocket.tlsClientHello = fingerprint;
    });

    return tlsServer;
}