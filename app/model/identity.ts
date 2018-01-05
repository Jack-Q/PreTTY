export enum SshIdentityAuthMode {
  EMPTY,
  PASSWORD,
  SSH_KEY,
}

export interface ISshIdentityAuth {
  mode: SshIdentityAuthMode;
  value: string;
}

export interface ISshIdentity {
  id: string;
  profileName: string;
  remark: string;
  authentications: SshIdentityAuthMode[];
}
