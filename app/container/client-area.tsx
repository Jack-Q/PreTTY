import * as React from 'react';

import { transitionService, quickActionService } from '../service';
import { Button } from '../component';

export class ClientArea extends React.Component {
  public render() {
    return (
      <div style={{ width: '100%', height: '100%' }} onClick={(e) => this.clickTransition(e)}>
        Client Area
        <Button onClick={() => quickActionService.openQuickAction()} label="Open Quick Action List" />
      </div>
    );
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
