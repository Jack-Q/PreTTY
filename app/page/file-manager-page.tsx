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
        File Manager Page
        <div>
          <div>
            <div
              onClick={(e) => this.transitToProfileList(e)} >
              <i className="material-icons">arrow_back</i>
            </div>
          </div>
          <div>{this.props.currentPath}</div>
          <div>
            <Button label="close" onClick={() => this.closeConnection()} />
          </div>
        </div>
        <div>
          {
            this.props.fileList.map((f) => (
              <div key={f.handle}>
                {f.name}
              </div>
            ))
          }
        </div>
        <div>
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
