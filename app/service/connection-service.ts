import { Client, ClientErrorExtensions, ClientChannel } from 'ssh2';

import { ISshConnection, SshConnectionStatus, SshConnectionType } from '../model/connection';
import { ISshProfile } from '../model/profile';
import { modelService } from './model-service';
import { getLogger } from '../util/logger';
import { getUid } from '../util/uid';
import { ISshIdentity, SshIdentityAuthMode } from '../model/identity';
import { ISshHostServer } from '../model/host-server';
import { AbstractApplicationService, IApplicationService } from '../model/service';
import { getServiceConnector } from '../util/connect-to-service';

interface IStateEvent {
  connectionList: ISshConnection[];
  activeConnectionId: string;
}

class ConnectionService extends AbstractApplicationService<IStateEvent> implements IApplicationService<IStateEvent> {
  private connectionList: ISshConnection[] = [];
  private activeConnectionId: string;

  public getConnectionById(id: string): ISshConnection {
    const conn = this.connectionList.find((c) => c.id === id);
    return conn || this.connectionList[0];
  }

  public createShellConnection(profile: ISshProfile) {
    return this.createConnection(profile, SshConnectionType.SHELL);
  }

  public createSftpConnection(profile: ISshProfile) {
    return this.createConnection(profile, SshConnectionType.SFTP);
  }

  public createConnection(profile: ISshProfile, type: SshConnectionType) {
    const host = modelService.getHostById(profile.hostId);
    const identity = modelService.getIdentityById(profile.identityId);
    if (!host || !identity) {
      logger.warn('invalid profile for connection');
      return ;
    }
    logger.info(`begin ssh shell connection to ${host.title} using ${identity.profileName}`);

    const connectionId: string = getUid();
    const connectionClient = this.createClient(connectionId);
    const connection: ISshConnection = {
      id: connectionId,
      profileId: profile.id,
      hostId: host.id,
      status: SshConnectionStatus.NOT_CONNECTED,
      connectionType: type,
      client: connectionClient,
    };
    this.connectionList.push(connection);
    this.clientConnect(connection, host, identity);
    this.updateState();
    return connection;
  }

  public getState(): IStateEvent {
    return {
      activeConnectionId: this.activeConnectionId,
      connectionList: this.connectionList,
    };
  }

  //#region SSH connection event handle
  private handleSshBannerEvent(id: string, banner: string) {
    logger.info('Banner message: ' + banner);
  }

  private handleSshGreetingEvent(id: string, msg: string) {
    logger.info('Greeting message: ' + msg);
  }

  private handleSshErrorEvent(id: string, err: Error & ClientErrorExtensions) {
    logger.info('SSH Error: ' + err.name + ' ' + err.description, err);
    const connection = this.getConnectionById(id);
    connection.status = SshConnectionStatus.CLOSED;
    this.updateState();
  }

  private handleSshReadyEvent(id: string) {
    logger.info('SSH Client ready: ' + id);
    const connection = this.getConnectionById(id);
    connection.status = SshConnectionStatus.CONNECTED;
    this.updateState();
    switch (connection.connectionType) {
      case SshConnectionType.SHELL:
        return this.setUpShell(connection);
      case SshConnectionType.SFTP:
        return this.setUpSftp(connection);
    }
  }

  private handleSshCloseEvent(id: string, hasError: boolean) {
    const connection = this.getConnectionById(id);
    connection.status = SshConnectionStatus.CLOSED;
    this.updateState();
  }

  //#endregion

  private createClient(id: string) {
    const client = new Client();
    client.on('banner', (banner) => this.handleSshBannerEvent(id, banner));
    client.on('greeting', (msg) => this.handleSshGreetingEvent(id, msg));
    client.on('error', (err) => this.handleSshErrorEvent(id, err));
    client.on('ready', () => this.handleSshReadyEvent(id));
    client.on('close', (hasError) => this.handleSshCloseEvent(id, hasError));
    return client;
  }

  private clientConnect(connection: ISshConnection, host: ISshHostServer, identity: ISshIdentity) {
    const { client } = connection;
    const passwordAuth = identity.authentications.find((p) => p.mode === SshIdentityAuthMode.PASSWORD);
    const password = passwordAuth && passwordAuth.value;

    connection.status = SshConnectionStatus.CONNECTING;
    client.connect({
      host: host.hostAddress,
      port: host.hostPort,
      username: identity.userName,
      password,
    });
    this.updateState();
  }

  //#region SSH Shell channel event handle
  private handleShellCloseEvent(connection: ISshConnection, channel: ClientChannel) {
    connection.client.destroy();
    connection.status = SshConnectionStatus.CLOSED;
    this.updateState();
  }

  private handleShellDataEvent(connection: ISshConnection, channel: ClientChannel, data: string) {
    logger.info('received message:' + data);
  }
  //#endregion

  //#region SSH SFTP event handle

  //#endregion

  private setUpShell(connection: ISshConnection) {
    connection.client.shell({}, { x11: false }, (err, stream) => {
      if (err) {
        connection.client.destroy();
        this.handleSshCloseEvent(connection.id, true);
        return;
      }
      logger.info('setup shell connection');
      connection.channel = stream;
      stream.on('data', (data: string) => this.handleShellDataEvent(connection, stream, data));
      stream.on('close', () => this.handleShellCloseEvent(connection, stream));
    });
  }

  private setUpSftp(connection: ISshConnection) {
    connection.client.sftp((err, stream) => {
      if (err) {
        connection.client.destroy();
        this.handleSshCloseEvent(connection.id, true);
        return;
      }
      logger.info('setup sftp connection');
      connection.sftpWrapper = stream;
    });
  }

}

const logger = getLogger(ConnectionService.name);

export const connectionService = new ConnectionService();
export const connectionServiceConnector = getServiceConnector<IStateEvent, ConnectionService>(connectionService);
