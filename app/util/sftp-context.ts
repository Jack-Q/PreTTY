import { EventEmitter } from 'events';
import { SFTPWrapper } from 'ssh2';
import { IFileMode, parseFileMode } from './file-mode';
import { openFileExternal } from './open-external';
import { getLogger } from './logger';

export interface ISftpFile {
  name: string;
  longName: string;
  userId: number;
  groupId: number;
  size: number;
  modeNumber: number;
  mode: IFileMode;
  accessTime: Date;
  modificationTime: Date;
}

export interface ISftpHandle {
  path: string;
  type: 'file' | 'folder';
  value: Buffer;
}

export class SftpContext extends EventEmitter {
  private sftp: SFTPWrapper;
  private processing: boolean = false;
  private isInitialized: boolean = false;
  private currentPath: string = '.';
  private fileList: ISftpFile[] = [];
  private errorState: boolean = false;
  private statusMessage: string = '';

  private pathStack: string[] = [];

  private handlePool: ISftpHandle[] = [];

  constructor(sftp: SFTPWrapper, isInitialized: boolean = false) {
    super();
    this.sftp = sftp;
    this.eventHandlerBinding();
  }

  public isProcessing(): boolean {
    return this.processing;
  }

  public getFileList(): ISftpFile[] {
    return this.fileList;
  }

  public getCurrentPath(): string {
    return this.currentPath;
  }

  public getErrorState(): boolean {
    return this.errorState;
  }

  public getStatusMessage(): string {
    return this.statusMessage;
  }

  public openFile(file: ISftpFile) {
    if (file.mode.isDirectory) {
      return this.changeDirectory(this.currentPath + '/' + file.name);
    }
    return this.downloadFile(file).then((f) => openFileExternal(f));
  }

  public downloadFile(file: ISftpFile, localFileName = '/tmp/' + file.name): Promise<string> {
    return new Promise<string>((res, rej) => {
      this.sftp.fastGet(this.currentPath + '/' + file.name, localFileName, (err) => {
        if (err) {
          logger.warn('download error', err);
          rej(err);
          return;
        }
        res(localFileName);
      });
    });
  }

  public changeDirectory(path: string, pushStack = true) {
    return Promise.resolve(path)
      .then((realPath) => {
        if (pushStack) {
          this.pushCurrentPath(realPath);
        }
        return this.sftpOpenDir(realPath);
      })
      .then((dirHandle) => {
        return this.sftpReadDir(dirHandle);
      })
      .then((fileList) => {
        this.isInitialized = true;
        this.processing = false;
        this.setFileList(fileList);
      }).catch((err) => {
        this.isInitialized = false;
        this.processing = false;
        this.updateState();
      });
  }

  //#region Promisify the sftp API

  public sftpRealPath(path: string): Promise<string> {
    return new Promise<string>((res, rej) => {
      this.sftp.realpath(path, (err, absPath) => {
        if (err) {
          rej(err);
          return;
        }
        res(absPath);
      });
    });
  }

  public sftpOpenDir(path: string): Promise<ISftpHandle> {
    return new Promise<ISftpHandle>((res, rej) => {
      this.sftp.opendir(path, (err, handle) => {
        if (err) {
          rej(err);
          return;
        }
        const h: ISftpHandle = {
          path,
          type: 'folder',
          value: handle,
        };
        this.handlePool.push(h);
        res(h);
      });
    });
  }

  public sftpReadDir(handle: ISftpHandle): Promise<ISftpFile[]> {
    return new Promise<ISftpFile[]>((res, rej) => {
      this.sftp.readdir(handle.value, (err, files) => {
        if (err) {
          rej(err);
          return;
        }
        const fileList: ISftpFile[] = files.map((f) => ({
          name: f.filename,
          longName: f.longname,
          userId: f.attrs.uid,
          groupId: f.attrs.gid,
          size: f.attrs.size,
          modeNumber: f.attrs.mode,
          mode: parseFileMode(f.attrs.mode),
          accessTime: new Date(f.attrs.atime * 1000),
          modificationTime: new Date(f.attrs.mtime * 1000),
        }));
        res(fileList);
      });
    });
  }

  //#endregion

  public initialize() {
    if (this.isInitialized || this.processing) {
      return;
    }
    // get current active directory
    this.processing = true;
    this.updateState();

    Promise.resolve('.')
      .then((initPath) => this.sftpRealPath(initPath))
      .then((realPath) => {
        this.setCurrentPath(realPath);
        return this.sftpOpenDir(realPath);
      })
      .then((dirHandle) => {
        return this.sftpReadDir(dirHandle);
      })
      .then((fileList) => {
        this.isInitialized = true;
        this.processing = false;
        this.setFileList(fileList);
      }).catch((err) => {
        this.isInitialized = false;
        this.processing = false;
        this.updateState();
      });
  }

  public end() {
    this.sftp.end();
  }

  public popCurrentPath() {
    const path = this.pathStack.pop();
    if (!path) {
      return;
    }
    this.setCurrentPath(path);
    this.changeDirectory(path, false);
  }

  private pushCurrentPath(path: string) {
    this.pathStack.push(this.currentPath);
    this.setCurrentPath(path);
  }

  // TODO: use js getter/setter syntax
  private setCurrentPath(currentPath: string) {
    this.currentPath = currentPath;
    this.updateState();
  }

  private setFileList(fileList: ISftpFile[]) {
    this.fileList = fileList;
    this.updateState();
  }

  private eventHandlerBinding() {
    // bypass event to trigger them in self
    this.sftp.on('error', (err) => this.emit('error', err));
    this.sftp.on('close', () => this.emit('close'));
    this.sftp.on('end', () => this.emit('end'));
    this.sftp.on('continue', () => this.emit('continue'));
  }

  private updateState() {
    // for UI or other relevant parts
    this.emit('update');
  }

}

const logger = getLogger(SftpContext.name);
