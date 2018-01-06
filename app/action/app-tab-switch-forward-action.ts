import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';
import { pageService } from '../service/page-service';

@defineActionMethod({
  key: 'app-tab-switch-forward',
  displayName: 'Switch application tab in forward order',
  accelerator: {
    keyCode: 'Tab',
    withCmdOrCtrl: true,
  },
})
export class AppTabSwitchForwardAction implements IApplicationActionClass {
  public actionBody(params: any) {
    pageService.activeTab(pageService.getNextTab(pageService.getCurrentActiveTabId(), true));
  }
}
