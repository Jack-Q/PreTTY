import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';
import { pageService } from '../service/page-service';

@defineActionMethod({
  key: 'app-tab-switch-backward',
  displayName: 'Switch application tab in backward order',
  accelerator: {
    keyCode: 'Tab',
    withCmdOrCtrl: true,
    withShift: true,
  },
})
export class AppTabSwitchBackwardAction implements IApplicationActionClass {
  public actionBody(params: any) {
    pageService.activeTab(pageService.getPrevTab(pageService.getCurrentActiveTabId(), true));
  }
}
