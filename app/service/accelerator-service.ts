import { IApplicationAction } from '../model/action';
import { hashAccelerator, hashDomKeyEvent } from '../util/key-code';
import { getLogger } from '../util/logger';
import { actionService } from './action-service';

interface IAcceleratorEntry {
  action: IApplicationAction;
  groupKey: string;
}

class AcceleratorService {
  private keyMap: { [keyHash: string]: IApplicationAction } = {};
  private actionList: IAcceleratorEntry[] = [];

  constructor() {
    this.init();
  }

  public addAcceleratorList(items: IApplicationAction[], listId: string = 'Global') {
    items.forEach((a) => {
      if (a.accelerator && a.accelerator.keyCode) {
        const keyHash = hashAccelerator(a.accelerator);
        if (this.keyMap[keyHash]) {
          logger.warn('accelerator key conflict: ' + a.displayName
            + '(new) conflict with ' + this.keyMap[keyHash].displayName);
          return;
        }
        this.actionList.push({
          action: a,
          groupKey: listId,
        });
        this.keyMap[keyHash] = a;
      }
    });
  }

  private init() {
    document.addEventListener('keydown', (e) => {
      const keyCode = e.keyCode;
      console.log(keyCode);
      const keyHash = hashDomKeyEvent(e);

      const action = this.keyMap[keyHash];
      if (action) {
        logger.info('trigger accelerator ' + keyHash + ' for ' + action.displayName);
        actionService.executeAction(action);
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }
}

const logger = getLogger(AcceleratorService.name);

export const acceleratorService = new AcceleratorService();
