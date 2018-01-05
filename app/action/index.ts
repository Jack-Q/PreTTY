import './about-action';
import './github-repo-action';
import './github-wiki-action';
import './github-issue-action';

import { getLogger } from '../util/logger';
const logger = getLogger('action init');

export const init = () => {
  logger.verbose('action initializing');
};
