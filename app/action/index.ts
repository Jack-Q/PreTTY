import './about-action';

import { getLogger } from '../util/logger';
const logger = getLogger('action init');

export const init = () => {
  logger.verbose('action initializing');
};
