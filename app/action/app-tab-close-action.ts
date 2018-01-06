import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';
import { pageService } from '../service/page-service';

@defineActionMethod({
  key: 'app-tab-close',
  displayName: 'Close current application tab',
  accelerator: {
    keyCode: 'W',
    withCmdOrCtrl: true,
  },
})
export class AppTabCloseAction implements IApplicationActionClass {
  public actionBody(params: any) {
    pageService.closeActiveTab();
  }
}
