import * as React from 'react';

import { transitionService } from '../service';
import * as styles from './transition-overlay.scss';

export class TransitionOverlay extends React.Component {

  private canvasElement: HTMLCanvasElement;

  public componentDidMount() {
    setImmediate(this.updateEventHandle);
    window.addEventListener('resize', this.updateEventHandle);
    transitionService.registerCanvas(this.canvasElement);
  }

  public componentWillUnmount() {
    transitionService.removeCanvas(this.canvasElement);
    window.removeEventListener('resize', this.updateEventHandle);
  }

  public render() {
    return (
      <div className={styles.container}>
        <canvas ref={(r) => { if (r) { this.canvasElement = r; } }} />
        <div className={styles.message}>Transition Overlay</div>;
      </div>
    );
  }

  private updateEventHandle = () => this.updateMetrics();

  private updateMetrics() {
    if (!this.canvasElement) {
      return;
    }
    this.canvasElement.width = this.canvasElement.clientWidth;
    this.canvasElement.height = this.canvasElement.clientHeight;
  }
}
