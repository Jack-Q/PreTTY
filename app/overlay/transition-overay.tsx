import * as React from 'react';

import { transitionService } from '../service';
import * as styles from './transition-overlay.scss';

export class TransitionOverlay extends React.Component {

  private canvasElement: HTMLCanvasElement;

  public componentDidMount() {
    transitionService.registerCanvas(this.canvasElement);
  }

  public render() {
    return (
      <div className={styles.container}>
        <canvas ref={(r) => { if (r) { this.canvasElement = r; } }} />
        <div className={styles.message}>Transition Overlay</div>;
      </div>
    );
  }
}
