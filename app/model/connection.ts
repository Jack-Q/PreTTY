export enum SshConnectionStatus {

}

export interface ISshConnection {
  id: string;
  host: string;
  status: SshConnectionStatus;
}
