import * as React from 'react';

import { transitionService, quickActionService, notificationService } from '../service';
import { Button } from '../component';
import { createNotification } from '../model/notification';
import { getUid } from '../util/uid';
import { IPageViewProps } from '../model/page';

export class TestPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div style={{ width: '100%', height: '100%' }} onClick={(e) => this.clickTransition(e)}>
        Client Area
        <Button onClick={() => quickActionService.openQuickAction()} label="Open Quick Action List" />
        <Button onClick={() => this.pushNotification()} label="Push notification" />
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
 }
