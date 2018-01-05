import { init as actionInit } from '../action';

import { getLogger } from '../util/logger';

const logger = getLogger('initialization');

export const init = () => {
  logger.verbose('application starts');
  actionInit();
};
