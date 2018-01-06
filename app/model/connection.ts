import { Client } from 'ssh2';

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

export interface ISshConnection {
  id: string;
  profileId: string;
  hostId: string;
  status: SshConnectionStatus;
  connectionType: SshConnectionType;

  client: Client;
}
