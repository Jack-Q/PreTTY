import * as React from 'react';
import { ISftpFile } from '../util/sftp-context';

import * as styles from './file-entry.scss';

interface IProps {
  file: ISftpFile;
  downloadFile: () => void;
  openEntry: () => void;
  showFileInfo: () => void;
}

export class FileEntry extends React.Component<IProps> {
  public render() {
    const file = this.props.file;
    return (
      <div className={styles.fileEntry} onClick={() => this.props.openEntry()}>
        <div className={styles.fileIcon}>
          <div className={styles.icon}>
            <i className="material-icons">insert_drive_file</i>
          </div>
        </div>
        <div className={styles.fileName}>
          {file.name}
        </div>
        <div className={styles.fileOptions}>
          <div className={styles.fileAttrs}>
            {file.mode.toString(8)}
          </div>
          <div className={styles.fileActions}>
            <div className={styles.fileAction} onClick={(e) => this.showFileInfo(e)}>
              <i className="material-icons">info_outline</i>
            </div>
            <div className={styles.fileAction} onClick={(e) => this.downloadFile(e)}>
              <i className="material-icons">file_download</i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private showFileInfo(e: React.MouseEvent<Element>) {
    this.props.showFileInfo();
    e.stopPropagation();
  }
  private downloadFile(e: React.MouseEvent<Element>) {
    this.props.downloadFile();
    e.stopPropagation();
  }

}
