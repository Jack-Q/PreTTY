import * as React from 'react';

import { transitionService } from '../service';

export class ClientArea extends React.Component {
  public render() {
    return (
      <div onClick={(e) => this.clickTransition(e)}>Client Area</div>
    );
  }

  private clickTransition(e: React.MouseEvent<Element>) {
    transitionService.transit({
      x: e.clientX,
      y: e.clientY,
      color: '#09c',
    });
  }
}
