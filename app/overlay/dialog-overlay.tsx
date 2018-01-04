import * as React from 'react';

export class DialogOverlay extends React.Component {
  public render() {
    return (
      <div onClick={() => console.log('dialog')}>Dialog Overlay</div>
    );
  }
}
