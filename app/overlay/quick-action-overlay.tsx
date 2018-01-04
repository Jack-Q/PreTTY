import * as React from 'react';

export class QuickActionOverlay extends React.Component {
  public render() {
    return (
      <div onClick={() => console.log('quick action')}>Quick Action Overlay</div>
    );
  }
}
