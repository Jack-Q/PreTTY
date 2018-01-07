import { Client, ClientChannel } from 'ssh2';
import { EventEmitter } from 'events';
import { SftpContext } from '../util/sftp-context';

export enum SshConnectionStatus {
  NOT_CONNECTED,
  CONNECTING,
  CONNECTED,
  CLOSED,
}

export enum SshConnectionType {
  SHELL,
  SFTP,
}

export enum SshConnectionEvent {
  data = 'data',
}

export interface ISshConnection {
  id: string;
  profileId: string;
  hostId: string;
  status: SshConnectionStatus;
  connectionType: SshConnectionType;

  client: Client;
  channel?: ClientChannel;
  sftpContext?: SftpContext;
  events: EventEmitter;
}
