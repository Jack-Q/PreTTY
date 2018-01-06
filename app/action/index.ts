import './about-action';
import './github-repo-action';
import './github-wiki-action';
import './github-issue-action';
import './quick-action-open-action';
import './quick-action-close-action';
import './app-tab-new-action';
import './app-tab-close-action';
import './app-tab-next-action';
import './app-tab-prev-action';
import './app-tab-switch-backward-action';
import './app-tab-switch-forward-action';

import { getLogger } from '../util/logger';
const logger = getLogger('action init');

export const init = () => {
  logger.verbose('action initializing');
};
