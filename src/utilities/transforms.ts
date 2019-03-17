import { Transform, TransformCallback } from 'stream';
import { createGzip, createUnzip } from 'zlib';
import * as crypto from 'crypto';
import { config } from './../config';

const createCustomTransform = (chunkEditor: (chunkString: string) => string) =>
    new Transform({
        transform(chunk: any, encoding: string, callback: TransformCallback) {
            this.push(chunkEditor(chunk.toString()));
            callback();
        }
    });

const allowerTransforms: object = {
    upperCase: () => createCustomTransform((chunkString: string) => chunkString.toUpperCase()),
    lowerCase: () => createCustomTransform((chunkString: string) => chunkString.toUpperCase()),
    removeSpaces: () => createCustomTransform((chunkString: string) => chunkString.replace(/\s/g, '')),
    encrypt: () => crypto.createCipher('aes-256-cbc', crypto.createHash('sha256').update(config.cryptPassword).digest()),
    decrypt: () => crypto.createDecipher('aes-256-cbc', crypto.createHash('sha256').update(config.cryptPassword).digest()),
    gzip: createGzip,
    unzip: createUnzip
};

export { allowerTransforms };