import { IDialog, IDialogAction } from '../model/dialog';
import { IApplicationService, AbstractApplicationService } from '../model/service';
import { getServiceConnector } from '../util/connect-to-service';
import { getLogger } from '../util/logger';

interface IStateEvent {
  dialog?: IDialog;
}

class DialogService extends AbstractApplicationService<IStateEvent> implements IApplicationService<IStateEvent> {
  private dialogList: IDialog[] = [];

  public showDialog(dialog: IDialog) {
    this.dialogList.push(dialog);
    this.updateState();
  }

  public handleDialogAction(dialog: IDialog, action: IDialogAction) {
    if (dialog.actions.indexOf(action) === -1) {
      logger.warn('dialog ' + dialog.id + ' does not support action ' + action.title);
    }
    const dialogIndex = this.dialogList.indexOf(dialog);
    if (dialogIndex === -1) {
      logger.warn('no corresponding dialog in registry, register it or trigger it for only once');
      return;
    }
    action.action();
    this.dialogList.splice(dialogIndex, 1);
    this.updateState();
  }

  public getState(): IStateEvent {
    return { dialog: this.dialogList[0] };
  }
}

const logger = getLogger(DialogService.name);

export const dialogService = new DialogService();
export const dialogServiceConnector = getServiceConnector<IStateEvent, DialogService>(dialogService);
