import { Transform, TransformOptions, TransformCallback } from 'stream';
import { createGzip, createUnzip } from 'zlib';
import crypto = require('crypto');
import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';
import { config } from './../config';

class UpperCase extends Transform {
    constructor(options?: TransformOptions) {
        super(options);
    }

    _transform(chunk: any, encoding: string, callback: TransformCallback) {
        const upperChunk = chunk.toString().toUpperCase();
        this.push(upperChunk, 'utf8');
        callback();
    }
}

class LowerCase extends Transform {
    constructor(options?: TransformOptions) {
        super(options);
    }

    _transform(chunk: any, encoding: string, callback: TransformCallback) {
        const lowerChunk = chunk.toString().toLowerCase();
        this.push(lowerChunk, 'utf8');
        callback();
    }
}

class RemoveSpaces extends Transform {
    constructor(options?: TransformOptions) {
        super(options);
    }

    _transform(chunk: any, encoding: string, callback: TransformCallback) {
        const chunkWithoutSpaces = chunk.toString().replace(' ', '');
        this.push(chunkWithoutSpaces, 'utf8');
        callback();
    }
}

const upperCase = new UpperCase();
const lowerCase = new LowerCase();
const removeSpaces = new RemoveSpaces();

const key = crypto.scryptSync(config.cryptPassword, config.salt, 24);

const encrypt = createCipheriv(
    config.algorithm,
    key,
    Buffer.alloc(16, 0)
);
const decrypt = createDecipheriv(
    config.algorithm,
    key,
    Buffer.alloc(16, 0)
);
const gzip = createGzip();
const unzip = createUnzip();

const allowerTransforms: object = {
    upperCase: upperCase,
    lowerCase: lowerCase,
    removeSpaces: removeSpaces,
    encrypt: encrypt,
    decrypt: decrypt,
    gzip: gzip,
    unzip: unzip
};

export { allowerTransforms };