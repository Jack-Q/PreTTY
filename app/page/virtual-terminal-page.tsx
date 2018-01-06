import * as React from 'react';

import * as styles from './virtual-terminal-page.scss';
import { IPageViewProps } from '../model/page';
import { ISshConnection } from '../model/connection';
import { connectionServiceConnector, connectionService } from '../service/connection-service';
import { ISshProfile } from '../model/profile';
import { getMessagePage } from './message-page';

interface IProps {
  connection: ISshConnection;
}
class VirtualTerminalPageView extends React.Component<IPageViewProps & IProps> {
  public render() {
    const conn = this.props.connection;
    return (
      <div className={styles.container}>
        <div className={styles.statusBar}>
          {conn.status}
        </div>
      </div>
    );
  }
 }

export const createVirtualTerminalPage = (profile: ISshProfile) => {
  const conn = connectionService.createShellConnection(profile);
  if (!conn) {
    return getMessagePage('failed to start connection');
  }
  const VirtualTerminalPage = connectionServiceConnector<IProps, IPageViewProps>(
    (state, svc) => ({connection: conn}),
    VirtualTerminalPageView,
  );
  return VirtualTerminalPage;
};
