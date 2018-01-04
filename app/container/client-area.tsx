import * as React from 'react';

import { transitionService } from '../service';

export class ClientArea extends React.Component {
  public render() {
    return (
      <div style={{width: '100%', height: '100%'}} onClick={(e) => this.clickTransition(e)}>Client Area</div>
    );
  }

  private clickTransition(e: React.MouseEvent<Element>) {
    transitionService.transit({
      x: e.clientX,
      y: e.clientY,
      color: '#9acdad',
    });
  }
}
