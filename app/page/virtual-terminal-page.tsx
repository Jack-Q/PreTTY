import * as React from 'react';

import * as styles from './virtual-terminal-page.scss';
import { IPageViewProps } from '../model/page';
import { ISshConnection, SshConnectionStatus } from '../model/connection';
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
          {this.getConnectionStateName(conn.status)}
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
}

export const createVirtualTerminalPage = (profile: ISshProfile) => {
  const conn = connectionService.createShellConnection(profile);
  if (!conn) {
    return getMessagePage('failed to start connection');
  }
  const VirtualTerminalPage = connectionServiceConnector<IProps, IPageViewProps>(
    (state, svc) => ({ connection: conn }),
    VirtualTerminalPageView,
  );
  return VirtualTerminalPage;
};
