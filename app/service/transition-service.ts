import {getLogger} from '../util/logger';

export interface ILayerTransitionOption {
  x: number;
  y: number;
  r: number;
  color?: string;
}

class TransitionService {
  private stateQueue = [];
  private canvasElement: HTMLCanvasElement | null = null;

  public transit(option: ILayerTransitionOption) {
    // this.stateQueue.push({x: 0, y: 0, r: 100});
  }

  public registerCanvas(canvas: HTMLCanvasElement) {
    if (this.canvasElement) {
      logger.warn('register new canvas before removing the existing one');
    }
  }

  private updateAnimate() {
    const queue = this.stateQueue;
    if (queue.length > 0) {
      requestAnimationFrame(() => this.updateAnimate());
    }
  }
}

const logger = getLogger(TransitionService.name);

/**
 * Transition Service
 *
 * Singleton that manages active page transition
 */
export const transitionService = new TransitionService();
