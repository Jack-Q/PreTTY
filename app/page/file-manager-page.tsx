import * as React from 'react';

import * as styles from './file-manager-page.scss';
import { IPageViewProps } from '../model/page';
import { connectionServiceConnector, connectionService } from '../service/connection-service';
import { ISshProfile } from '../model/profile';
import { getMessagePage } from './message-page';
import { ISshConnection } from '../model/connection';

interface ISftpFile {
  handle: string;
  name: string;
}
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
          {this.props.currentPath}
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
      </div>
    );
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
      processing: false,
      currentPath: '',
      fileList: [],
    }),
    FileManagerPageView,
  );
  return FileManagerPage;
};
