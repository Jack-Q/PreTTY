import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';
import { quickActionService } from '../service/quick-action-service';

@defineActionMethod({
  key: 'quick-action-open',
  displayName: 'Open quick action palette',
  accelerator: {
    keyCode: 'P',
    withCmdOrCtrl: true,
    withShift: true,
  },
})
export class QuickActionOpenAction implements IApplicationActionClass {
  public actionBody(params: any) {
    quickActionService.openQuickAction();
  }
}
