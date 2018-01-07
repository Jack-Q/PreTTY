import { shell } from 'electron';

export const openLink = (url: string) => {
  shell.openExternal(url);
};

export const openFileExternal = (path: string) => {
  shell.openItem(path);
};
