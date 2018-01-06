import * as React from 'react';
import * as Terminal from 'xterm';

import * as styles from './virtual-terminal-page.scss';
import { IPageViewProps, PageViewType } from '../model/page';
import { ISshConnection, SshConnectionStatus, SshConnectionEvent } from '../model/connection';
import { connectionServiceConnector, connectionService } from '../service/connection-service';
import { ISshProfile } from '../model/profile';
import { getMessagePage } from './message-page';
import { Button } from '../component/button';
import { transitionService } from '../service/transition-service';
import { pageService } from '../service/page-service';
import { HistoryListPage } from './history-list-page';
import { modelService } from '../service/model-service';

// tslint:disable-next-line:no-var-requires
require('xterm/lib/addons/fit');
(Terminal as any).loadAddon('fit');
interface IProps {
  connection: ISshConnection;
  terminal: Terminal;
}
class VirtualTerminalPageView extends React.Component<IPageViewProps & IProps> {
  private termRef: HTMLDivElement;

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
          <div className={styles.statusBarMsg}>
            {this.getConnectionStateName(conn.status)}
          </div>
          <div className={styles.statusBarAction}>
            {
              conn.status === SshConnectionStatus.CONNECTED &&
              <Button label="close" onClick={() => this.closeConnection()} />
            }
          </div>
        </div>
        <div
          className={`${styles.connectingOverlay} ${
            conn.status === SshConnectionStatus.CONNECTING ? styles.active : ''
            }`}>
          <div className={styles.overlayIcon}>
            <i className="material-icons">loop</i>
          </div>
          <div className={styles.overlayMessage}>
            connecting
          </div>
          <div className={styles.overlayActions}>
            <Button label="cancel" onClick={() => this.closeConnection()} />
          </div>
        </div>
        <div
          className={`${styles.closeOverlay} ${
            conn.status === SshConnectionStatus.CLOSED ? styles.active : ''
            }`}>
          <div className={styles.overlayIcon}>
            <i className="material-icons">portable_wifi_off</i>
          </div>
          <div className={styles.overlayMessage}>
            connection to server is closed
          </div>
          <div className={styles.overlayActions}>
            <Button label="view history" onClick={(e) => this.viewHistory(e)} />
            <Button label="connect again" onClick={(e) => this.connectAgain(e)} />
          </div>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.terminal} ref={(r) => r && (this.termRef = r)} />
        </div>;
      </div >
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

  private viewHistory(e: React.MouseEvent<Element>) {
    this.transitPage(e, HistoryListPage);
  }

  private connectAgain(e: React.MouseEvent<Element>) {
    const profile = modelService.getProfileById(this.props.connection.profileId);
    if (profile) {
      this.transitPage(e, createVirtualTerminalPage(profile));
    }
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

  private transitPage(e: React.MouseEvent<Element>, page: PageViewType) {
    transitionService.transitOnClick(e, '#09c', () => {
      pageService.replaceTabPage(this.props.tabId, page);
    });
  }
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
