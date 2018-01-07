import { EventEmitter } from 'events';
import { SFTPWrapper } from 'ssh2';

export interface ISftpFile {
  handle: string;
  name: string;
}

export class SftpContext extends EventEmitter {
  private sftp: SFTPWrapper;
  private processing: boolean = false;
  private isInitialized: boolean = false;
  private currentPath: string = '.';
  private fileList: ISftpFile[] = [];

  constructor(sftp: SFTPWrapper, isInitialized: boolean = false) {
    super();
    this.sftp = sftp;
    this.eventHandlerBinding();
  }

  public isProcessing() {
    return this.processing;
  }

  public getFileList(): ISftpFile[] {
    return this.fileList;
  }

  public getCurrentPath(): string {
    return this.currentPath;
  }

  public initialize() {
    if (this.isInitialized || this.processing) {
      return;
    }
    // get current active directory
    this.processing = true;
    this.isInitialized = true;
  }

  public end() {
    this.sftp.end();
  }

  private eventHandlerBinding() {
    // bypass event to trigger them in self
    this.sftp.on('error', (err) => this.emit('error', err));
    this.sftp.on('close', () => this.emit('close'));
    this.sftp.on('end', () => this.emit('end'));
    this.sftp.on('continue', () => this.emit('continue'));
  }

}
