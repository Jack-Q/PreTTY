import { TestPage } from './test-page';

export { MasterPasswordPage } from './master-password-page';
export { TestPage } from './test-page';
export { WelcomePage } from './welcome-page';
export { FileActionPage } from './file-action-page';
export { FileManagerPage } from './file-manager-page';
export { HistoryListPage } from './history-list-page';
export { HostListPage } from './host-list-page';
export { IdentityListPage } from './identity-list-page';
export { ProfileListPage } from './profile-list-page';
export { SettingsPage } from './settings-page';

export { createIdentityCreatePage } from './identity-create-page';
export { createProfileEditPage } from './profile-edit-page';
export { createVirtualTerminalPage } from './virtual-terminal-page';

// Default page is loaded for each new page creation
export const DefaultPage = TestPage;
