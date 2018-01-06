import { IApplicationAction, IApplicationActionClass } from '../model/action';
import { getLogger } from '../util/logger';
import { quickActionService } from './quick-action-service';
import { acceleratorService } from './accelerator-service';

interface IActionServiceAction<T = any> {
  actionMeta: IApplicationAction<T>;
  actionBody: (params: T) => void;
}

class ActionService {
  private actionList: IActionServiceAction[] = [];

  public defineActionMethod<T = any>(
    options: Partial<IApplicationAction<T>> & Pick<IApplicationAction, 'key' | 'displayName'>,
    actionBody: (params: T) => void,
  ) {
    const actionMeta: IApplicationAction<T> = {
      key: options.key,
      displayName: options.displayName,
      description: options.description || options.displayName,
      accelerator: options.accelerator,
      getParams: options.getParams,
    };

    const serviceAction: IActionServiceAction<T> = {
      actionMeta,
      actionBody,
    };

    logger.info('register application action: ' + serviceAction.actionMeta.key);
    this.actionList.push(serviceAction);
    quickActionService.addActionListDedup([actionMeta]);
    acceleratorService.addAcceleratorList([actionMeta]);
    return actionBody;
  }

  public executeAction(appAction: IApplicationAction) {
    const action = this.actionList.find((a) => a.actionMeta.key === appAction.key);
    if (!action) {
      logger.warn('attempting to execute undefined action ' + appAction.key);
      return;
     }

    logger.verbose('execution action ' + action.actionMeta.key);
    const params = action.actionMeta.getParams ? action.actionMeta.getParams() : undefined;
    action.actionBody(params);
  }
}

const logger = getLogger(ActionService.name);

export const actionService = new ActionService();
export const defineActionMethod = <T = any>(
  options: Partial<IApplicationAction<T>> & Pick<IApplicationAction, 'key' | 'displayName'>,
) => (
  ActionBodyClass: { new(): IApplicationActionClass<T> },
  ) => {
    actionService.defineActionMethod(options, (p: T) => new ActionBodyClass().actionBody(p));
    return ActionBodyClass;
  };
