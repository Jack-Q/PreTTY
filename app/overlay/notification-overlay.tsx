import * as React from 'react';

export class NotificationOverlay extends React.Component {
  public render() {
    return (
      <div onClick={() => console.log('notification')}>Notification Overlay</div>
    );
  }
}
