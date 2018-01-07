import * as React from 'react';

import * as styles from './file-manager-page.scss';
import { IPageViewProps, PageViewType } from '../model/page';
import { connectionServiceConnector, connectionService } from '../service/connection-service';
import { ISshProfile } from '../model/profile';
import { getMessagePage } from './message-page';
import { ISshConnection, SshConnectionStatus } from '../model/connection';
import { Button } from '../component/button';
import { ProfileListPage } from './profile-list-page';
import { pageService } from '../service/page-service';
import { transitionService } from '../service/transition-service';
import { ISftpFile } from '../util/sftp-context';
import { FileEntry } from '../component/file-entry';
import { createDialog } from '../model/dialog';
import { dialogService } from '../service/dialog-service';
import { dialog as ElectronDialog } from 'electron';
import { openFileExternal } from '../util/open-external';

interface IProps {
  connection: ISshConnection;
  processing: boolean;
  currentPath: string;
  fileList: ISftpFile[];
}
class FileManagerPageView extends React.Component<IPageViewProps & IProps> {
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div
            className={styles.arrowBack}
            onClick={(e) => this.transitToProfileList(e)} >
            <i className="material-icons">arrow_back</i>
          </div>
          <div className={styles.currentPath}>
            {this.props.currentPath}
          </div>
          <div className={styles.headerActions}>
            <Button label="close" onClick={() => this.closeConnection()} />
          </div>
        </div>
        <div className={styles.fileArea}>
          {
            this.props.fileList.map((f) => (
              <FileEntry
                key={f.name}
                file={f}
                openEntry={() => this.openFile(f)}
                downloadFile={() => this.downloadFile(f)}
                showFileInfo={() => this.showFileInfo(f)}
              />
            ))
          }
        </div>
        <div className={styles.footer}>
          <div>
            {this.getConnectionStateName(this.props.connection.status)}
          </div>
        </div>
      </div>
    );
  }

  private getConnectionStateName(state: SshConnectionStatus) {
    switch (state) {
      case SshConnectionStatus.NOT_CONNECTED: return 'not connected';
      case SshConnectionStatus.CONNECTING: return 'connecting';
      case SshConnectionStatus.CONNECTED: return 'connected';
      case SshConnectionStatus.CLOSED: return 'closed';
    }
    return 'unknown';
  }

  private closeConnection() {
    connectionService.closeConnection(this.props.connection);
  }

  private transitToProfileList(e: React.MouseEvent<Element>) {
    this.transitPage(e, ProfileListPage);
  }

  private transitPage(e: React.MouseEvent<Element>, page: PageViewType) {
    transitionService.transitOnClick(e, '#09c', () => {
      pageService.replaceTabPage(this.props.tabId, page);
    });
  }

  private downloadFile(file: ISftpFile) {
    const sftp = this.props.connection.sftpContext;
    if (sftp) {
      const path = ElectronDialog.showSaveDialog({
        title: 'save as',
        defaultPath: file.name,
        message: 'download and save file to local storage',
      });
      sftp.downloadFile(file, path).then((f) => {
        openFileExternal(f);
      });
    }
  }

  private openFile(file: ISftpFile) {
    const sftp = this.props.connection.sftpContext;
    if (sftp) {
      sftp.openFile(file);
    }
  }

  private showFileInfo(file: ISftpFile) {
    const dialog = createDialog(
      'File Info: ' + file.name,
      [
        `file name: ${file.name}`,
        `long name: ${file.longName}`,
        `size: ${file.size}`,
        `user id: ${file.userId}`,
        `group id: ${file.groupId}`,
        `modification time: ${file.modificationTime}`,
        `accessTime time: ${file.accessTime}`,
      ].join('\n'),
    );
    dialogService.showDialog(dialog);
  }

}

export const createFileManagerPage = (profile: ISshProfile) => {
  const conn = connectionService.createSftpConnection(profile);
  if (!conn) {
    return getMessagePage('failed to start connection');
  }

  const FileManagerPage = connectionServiceConnector<IProps, IPageViewProps>(
    (state, svc) => ({
      connection: conn,
      processing: conn.sftpContext ? conn.sftpContext.isProcessing() : true,
      currentPath: conn.sftpContext ? conn.sftpContext.getCurrentPath() : '',
      fileList: conn.sftpContext ? conn.sftpContext.getFileList() : [],
    }),
    FileManagerPageView,
  );
  return FileManagerPage;
};
