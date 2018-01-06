import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';
import { pageService } from '../service/page-service';

@defineActionMethod({
  key: 'app-tab-next',
  displayName: 'Switch to next tab in application tab list',
  accelerator: {
    keyCode: 'PageDown',
    withCmdOrCtrl: true,
  },
})
export class AppTabNextAction implements IApplicationActionClass {
  public actionBody(params: any) {
    pageService.activeTab(pageService.getNextTab(pageService.getCurrentActiveTabId()));
  }
}
