import * as React from 'react';

import { transitionService, quickActionService, notificationService } from '../service';
import { Button } from '../component';
import { createNotification } from '../model/notification';
import { getUid } from '../util/uid';
import { IPageViewProps, PageViewType } from '../model/page';
import { pageService } from '../service/page-service';
import { MasterPasswordPage } from './master-password-page';
import { IdentityCreatePage } from './identity-create-page';

export class TestPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div style={{ width: '100%', height: '100%' }} onClick={(e) => this.clickTransition(e)}>
        Client Area in tab {this.props.tabId}
        <div>
          <Button onClick={() => quickActionService.openQuickAction()} label="Open Quick Action List" />
          <Button onClick={() => this.pushNotification()} label="Push notification" />
          <Button onClick={(e) => this.requestMasterPassword(e)} label="Request master password" />
          <Button onClick={(e) => this.createNewIdentity(e)} label="Create new identity" />
        </div>
      </div>
    );
  }

  private pushNotification() {
    notificationService.pushNotification(createNotification('Hello PreTTY #' + getUid()));
  }

  private clickTransition(e: React.MouseEvent<Element>) {
    // ignore bubbled events
    if (e.currentTarget !== e.target) { return; }
    transitionService.transit({
      x: e.clientX,
      y: e.clientY,
      color: '#9acdad',
    });
  }

  private requestMasterPassword(e: React.MouseEvent<HTMLDivElement>) {
    this.replaceTabPage(e, MasterPasswordPage);
  }
  private createNewIdentity(e: React.MouseEvent<HTMLDivElement>) {
    this.replaceTabPage(e, IdentityCreatePage);
  }

  private replaceTabPage(e: React.MouseEvent<HTMLDivElement>, component: PageViewType) {
    transitionService.transit({
      x: e.clientX,
      y: e.clientY,
      color: '#09c',
    }).then(() => {
      pageService.replaceTabPage(this.props.tabId, component);
    });
  }
}
