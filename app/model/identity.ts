export enum SshIdentityAuthMode {
  EMPTY = 'Empty',
  PASSWORD = 'Password',
  SSH_KEY = 'SSH Key',
}

export interface ISshIdentityAuth {
  mode: SshIdentityAuthMode;
  value: string;
}

export interface ISshIdentity {
  id: string;
  profileName: string;
  userName: string;
  remark: string;
  authentications: ISshIdentityAuth[];
}
