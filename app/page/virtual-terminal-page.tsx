import * as React from 'react';
import * as Terminal from 'xterm';

import * as styles from './virtual-terminal-page.scss';
import { IPageViewProps } from '../model/page';
import { ISshConnection, SshConnectionStatus, SshConnectionEvent } from '../model/connection';
import { connectionServiceConnector, connectionService } from '../service/connection-service';
import { ISshProfile } from '../model/profile';
import { getMessagePage } from './message-page';

// tslint:disable-next-line:no-var-requires
require('xterm/lib/addons/fit');
(Terminal as any).loadAddon('fit');
interface IProps {
  connection: ISshConnection;
  terminal: Terminal;
}
class VirtualTerminalPageView extends React.Component<IPageViewProps & IProps> {
  private termRef: HTMLDivElement;
  // private handlerRefs: { [key: string]: () => void };

  public componentDidMount() {
    const term = this.props.terminal;
    const sshEvents = this.props.connection.events;

    // bind event handler
    term.on('resize', this.handleTermResize);
    term.on('data', this.handleTermData);

    // handle resize
    window.addEventListener('resize', this.handleWindowResize);

    // ssh events
    sshEvents.addListener(SshConnectionEvent.data, this.handleSshData);

    // display content
    term.open(this.termRef, true);
    this.handleWindowResize();
  }

  public componentWillUnmount() {
    const term = this.props.terminal;
    const sshEvents = this.props.connection.events;
    term.off('resize', this.handleTermResize);
    term.off('data', this.handleTermData);
    window.removeEventListener('resize', this.handleWindowResize);
    sshEvents.removeListener(SshConnectionEvent.data, this.handleSshData);
  }

  public render() {
    const conn = this.props.connection;
    return (
      <div className={styles.container}>
        <div className={styles.statusBar}>
          {this.getConnectionStateName(conn.status)}
        </div>
        <div className={styles.mainContent}>
          <div className={styles.terminal} ref={(r) => r && (this.termRef = r) } />
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

  private handleTermResize = (data: any) => {
    if (data && this.props.connection.channel) {
      this.props.connection.channel.setWindow(data.rows, data.cols, data.rows, data.cols);
    }
  }

  private handleTermData = (data: any) => {
    if (data && this.props.connection.channel) {
      this.props.connection.channel.write(data);
    }
  }

  private handleWindowResize = () => {
    // cast to any to use extension function
    (this.props.terminal as any).fit();
  }

  private handleSshData = (data: any) => {
    this.props.terminal.write(data && data.toString());
  }

  // private getBondHandler(key: keyof VirtualTerminalPageView) {
  //   if (this.handlerRefs.hasOwnProperty(key)) {
  //     return this.handlerRefs[key];
  //   }
  //   const func = this[key].bind(this);
  //   this.handlerRefs[key] = func;
  //   return func;
  // }
}

export const createVirtualTerminalPage = (profile: ISshProfile) => {
  const conn = connectionService.createShellConnection(profile);
  if (!conn) {
    return getMessagePage('failed to start connection');
  }
  const term = new Terminal();
  const VirtualTerminalPage = connectionServiceConnector<IProps, IPageViewProps>(
    (state, svc) => ({
      connection: conn,
      terminal: term,
    }),
    VirtualTerminalPageView,
  );
  return VirtualTerminalPage;
};
