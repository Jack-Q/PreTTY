import { init as actionInit } from '../action';

import { getLogger } from '../util/logger';
import { modelService } from '../service/model-service';

const logger = getLogger('initialization');

export const init = () => {
  logger.verbose('application starts');
  actionInit();
  modelService.initialize();
};
