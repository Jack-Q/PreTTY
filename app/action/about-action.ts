import { createDialog } from '../model/dialog';
import { logger } from '../util/logger';
import { dialogService } from '../service';
import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';

@defineActionMethod({ key: 'about', displayName: 'about PreTTY' })
export class AboutAction implements IApplicationActionClass {

  public actionBody(params: any) {
    // TODO: generate more detailed information in build time
    const aboutDialog = createDialog('About', 'PreTTY: A prettier client for SSH connection', [
      {
        title: 'OK',
        action: () => { logger.verbose('close about dialog'); },
      },
    ]);

    dialogService.showDialog(aboutDialog);
  }
}
