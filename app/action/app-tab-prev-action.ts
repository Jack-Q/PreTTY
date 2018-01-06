import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';
import { pageService } from '../service/page-service';

@defineActionMethod({
  key: 'app-tab-prev',
  displayName: 'Switch to previous tab in application tab list',
  accelerator: {
    keyCode: 'PageUp',
    withCmdOrCtrl: true,
  },
})
export class AppTabPrevAction implements IApplicationActionClass {
  public actionBody(params: any) {
    pageService.activeTab(pageService.getPrevTab(pageService.getCurrentActiveTabId()));
  }
}
