export interface IFilePermission {
  read: boolean;
  write: boolean;
  execute: boolean;
}

export interface IFileMode {
  isDirectory: boolean;
  isLink: boolean;
  userPerm: IFilePermission;
  groupPerm: IFilePermission;
  otherPerm: IFilePermission;
}

export const parseFilePerm = (perm: number): IFilePermission => ({
  // tslint:disable-next-line:no-bitwise
  read: (perm & 1) !== 0,
  // tslint:disable-next-line:no-bitwise
  write: (perm & 2) !== 0,
  // tslint:disable-next-line:no-bitwise
  execute: (perm & 4) !== 0,
});

export const parseFileMode = (fileMode: number): IFileMode => ({
  // tslint:disable-next-line:no-bitwise
  isDirectory: (fileMode & 0o40000) !== 0,
  // tslint:disable-next-line:no-bitwise
  isLink: (fileMode & 0o20000) !== 0,
  // tslint:disable-next-line:no-bitwise
  userPerm: parseFilePerm((fileMode >>> 6) & 7),
  // tslint:disable-next-line:no-bitwise
  groupPerm: parseFilePerm((fileMode >>> 3) & 7),
  // tslint:disable-next-line:no-bitwise
  otherPerm: parseFilePerm((fileMode >>> 0) & 7),
});
