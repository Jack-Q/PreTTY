import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';
import { quickActionService } from '../service/quick-action-service';

@defineActionMethod({
  key: 'quick-action-close',
  displayName: 'Close quick action palette',
  accelerator: {
    keyCode: 'Esc',
    withCmdOrCtrl: false,
    withShift: false,
  },
})
export class QuickActionCloseAction implements IApplicationActionClass {
  public actionBody(params: any) {
    quickActionService.closeQuickAction();
  }
}
