import * as fs from 'fs';
import * as zlib from 'zlib';
import * as path from 'path';
import * as crypto from 'crypto';
import { remote } from 'electron';
import { Stream } from 'stream';
import { getLogger } from '../util/logger';

const { app } = remote;

export interface IModelStorageCipherOption {
  algorithm: 'AES128' | 'AES192' | 'AES256' | 'bypass';
  key: string;
  // TODO: verify initialization vector length, as well as key length
  iv?: string;
}

export interface IModelStorageCompressorOption {
  // TODO: add more compression algorithm support (e.g. xz, lzma)
  format: 'deflate' | 'zlib' | 'gzip' | 'bypass';
}

export interface IModelStorageOption {
  encryption?: IModelStorageCipherOption;
  compression?: IModelStorageCompressorOption;
}

class StorageService {
  private baseDir: string;

  constructor() {
    // use the per user application directory for data file storage
    // https://electronjs.org/docs/api/app#appgetpathname
    this.baseDir = app.getPath('userData');
  }

  public getBaseDir() {
    return this.baseDir;
  }

  public getFullFilePath(name: string): string {
    return path.resolve(path.join(this.getBaseDir(), name));
  }

  public loadModel<Model>(file: string, option: IModelStorageOption): Promise<Model[]> {
    return new Promise((res, rej) => {
      try {
        let stream: Stream = fs.createReadStream(this.getFullFilePath(file));
        if (option.encryption) {
          stream.on('error', (e) => rej(e));
          stream = stream.pipe(this.getDecryptionStream(option.encryption));
        }
        if (option.compression) {
          stream.on('error', (e) => rej(e));
          stream = stream.pipe(this.getDecompressionStream(option.compression));
        }
        const dataBuffs: Buffer[] = [];
        stream.on('data', (d: Buffer) => {
          dataBuffs.push(d);
        }).on('end', () => {
          try {
            const stringData = Buffer.concat(dataBuffs).toString('utf8');
            const model = JSON.parse(stringData) as Model[];
            res(model);
          } catch (e) {
            rej(e);
          }
        }).on('error', (e) => {
          rej(e);
        });
      } catch (e) {
        rej(e);
      }
    });
  }

  public loadOrCreateModel<Model>(file: string, options: IModelStorageOption, defaultModel: Model[] = [])
    : Promise<Model[]> {
    return this.loadModel<Model>(file, options)
      .catch((e) =>
        this.saveModel(file, defaultModel, options)
          .then(() => defaultModel),
    );
  }

  public saveModel<Model>(file: string, data: Model[], option: IModelStorageOption): Promise<void> {
    return new Promise((res, rej) => {
      try {
        let stream: NodeJS.WritableStream = fs.createWriteStream(this.getFullFilePath(file));
        stream.on('finish', () => {
          res();
        }).on('error', (e) => {
          rej(e);
        });

        if (option.encryption) {
          const encryptionStream = this.getEncryptionStream(option.encryption);
          encryptionStream.pipe(stream);
          stream = encryptionStream;
        }
        if (option.compression) {
          const compressionStream = this.getCompressionStream(option.compression);
          compressionStream.pipe(stream);
          stream = compressionStream;
        }

        const buffer = Buffer.from(JSON.stringify(data), 'utf8');
        stream.end(buffer);
      } catch (e) {
        rej(e);
      }
    });
  }

  private getCompressionStream(option: IModelStorageCompressorOption): NodeJS.ReadWriteStream {
    try {
      switch (option.format) {
        case 'deflate': return zlib.createDeflateRaw({ level: zlib.Z_BEST_COMPRESSION });
        case 'gzip': return zlib.createGzip({ level: zlib.Z_BEST_COMPRESSION });
        case 'zlib': return zlib.createDeflate({ level: zlib.Z_BEST_COMPRESSION });
      }
    } catch (e) {
      logger.error('failed to create compressor using config:' + JSON.stringify(option), e);
    }
    // use bypass for unsupported algorithm or engine error
    return new Stream.PassThrough();
  }

  private getDecompressionStream(option: IModelStorageCompressorOption): NodeJS.ReadWriteStream {
    try {
      switch (option.format) {
        case 'deflate': return zlib.createInflateRaw();
        case 'gzip': return zlib.createUnzip();
        case 'zlib': return zlib.createInflate();
      }
    } catch (e) {
      logger.error('failed to create de-compressor using config:' + JSON.stringify(option), e);
    }
    // use bypass for unsupported algorithm or engine error
    return new Stream.PassThrough();
  }

  private getEncryptionStream(option: IModelStorageCipherOption): NodeJS.ReadWriteStream {
    try {
      if (option.algorithm && option.algorithm !== 'bypass') {
        // create openssl backed encryption stream
        if (option.iv) {
          return crypto.createCipheriv(option.algorithm, option.key, option.iv);
        } else {
          return crypto.createCipher(option.algorithm, option.key);
        }
      }
    } catch (e) {
      logger.error('failed to create cipher using config:' + JSON.stringify(option), e);
    }
    // use bypass for unsupported keys or engine error
    return new Stream.PassThrough();
  }

  private getDecryptionStream(option: IModelStorageCipherOption): NodeJS.ReadWriteStream {
    try {
      if (option.algorithm && option.algorithm !== 'bypass') {
        // create openssl backed encryption stream
        if (option.iv) {
          return crypto.createDecipheriv(option.algorithm, option.key, option.iv);
        } else {
          return crypto.createDecipher(option.algorithm, option.key);
        }
      }
    } catch (e) {
      logger.error('failed to create decipher using config:' + JSON.stringify(option), e);
    }
    // use bypass for unsupported keys or engine error
    return new Stream.PassThrough();
  }

}

const logger = getLogger(StorageService.name);

export const storageService = new StorageService();
