import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';
import { pageService } from '../service/page-service';

@defineActionMethod({
  key: 'app-tab-new',
  displayName: 'Open a new application tab',
  accelerator: {
    keyCode: 'T',
    withCmdOrCtrl: true,
  },
})
export class AppTabNewAction implements IApplicationActionClass {
  public actionBody(params: any) {
    pageService.addNewTab();
  }
}
