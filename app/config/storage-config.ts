import { IModelStorageOption } from '../service/storage-service';
export type StorageConfigEntry =
  'IDENTITY_FILE' |
  'HOST_FILE' |
  'PROFILE_FILE' |
  'HISTORY_FILE' |
  'THEME_FILE' |
  'THEME_FOLDER';

const getConfigValue = (entryKey: StorageConfigEntry) => {
  switch (entryKey) {
    case 'IDENTITY_FILE': return 'identity.json.enc';
    case 'HOST_FILE': return 'host.json.enc';
    case 'PROFILE_FILE': return 'profile.json.enc';
    case 'HISTORY_FILE': return 'history.json.enc';
    case 'THEME_FILE': return 'theme.json.enc';
    case 'THEME_FOLDER': return 'theme';
  }
  return '';
};

export const getStorageConfig = (entryKey: StorageConfigEntry) => {
  const prefix = 'pretty_';
  return prefix + getConfigValue(entryKey);
};

export const defaultStorageOption: IModelStorageOption = {
  encryption: {
    algorithm: 'bypass',
    key: 'PreTTY',
  },
  compression: {
    format: 'bypass',
  },
};
