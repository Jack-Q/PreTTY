import { getLogger } from '../util/logger';
import { toRgba } from '../util/color';

export interface ILayerTransitionOption {
  x: number;
  y: number;
  color: string; // in hex format with prefix '#'
}

interface ILayerTransitionState {
  option: ILayerTransitionOption;
  r: number;
  alpha: number; // from 0 to 1
  resolver?: () => void;
}

class TransitionService {
  private stateQueue: ILayerTransitionState[] = [];
  private canvasElement: HTMLCanvasElement | null = null;
  private lastTimeStamp: number = 0;
  private willUpdate: boolean = false;

  private params = {
    radiusSpeed: 25,
    growRadius: Math.floor(Math.max(screen.width, screen.height) * 0.85),
  };

  public transit(option: ILayerTransitionOption) {
    logger.verbose(`add new transit at (${option.x},${option.y}) with color ${option.color}`);
    return new Promise((res, rej) => {
      this.stateQueue.push({ option, r: 0, alpha: 0, resolver: res });
      if (this.lastTimeStamp === 0) {
        this.lastTimeStamp = Date.now();
        this.nextFrame();
      }
    });
  }

  public transitOnClick(e: React.MouseEvent<Element>, color: string, onSwitch?: () => void) {
    this.transit({
      x: e.clientX,
      y: e.clientY,
      color,
    }).then(onSwitch);
  }

  public registerCanvas(canvas: HTMLCanvasElement) {
    if (this.canvasElement) {
      logger.warn('register new canvas before removing the existing one');
    }
    this.canvasElement = canvas;
  }

  public removeCanvas(canvas: HTMLCanvasElement) {
    if (this.canvasElement === null) {
      logger.warn('remove canvas before canvas registration');
      return;
    }
    if (this.canvasElement !== canvas) {
      logger.error('canvas to be removed is not the registered one, still removing current canvas');
    }
    this.canvasElement = null;
  }

  private updateAnimate() {
    this.willUpdate = false;
    const timestamp = Date.now();
    const elapsedTime = timestamp - this.lastTimeStamp;
    const queue = this.stateQueue;
    const params = this.params;

    if (elapsedTime < 5) {
      this.nextFrame();
      return;
    }
    // update state
    queue.forEach((e, i) => {
      if (e.r >= 1.5 * params.growRadius) {
        queue.splice(i, 1);
      }
      e.r += elapsedTime * params.radiusSpeed / 60 * Math.log(Math.max(e.r, 400));
      if (e.r > params.growRadius) {
        e.alpha = (1.5 * params.growRadius - e.r) / params.growRadius * 2;
      } else {
        e.alpha = e.r / params.growRadius;
      }
      e.alpha = Math.pow(Math.max(Math.min(1, e.alpha * 1.3), 0), 1 / 2);
      if ((e.alpha >= 0.95) && e.resolver) {
        e.resolver();
        e.resolver = undefined;
      }
    });

    // render state
    if (this.canvasElement !== null) {
      this.drawCanvas(this.canvasElement);
    }

    // register callback
    if (queue.length > 0) {
      this.nextFrame();
      this.lastTimeStamp = timestamp;
    } else {
      this.lastTimeStamp = 0;
    }
  }

  private nextFrame() {
    if (!this.willUpdate) {
      this.willUpdate = true;
      requestAnimationFrame(() => this.updateAnimate());
    }
  }

  private drawCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    if (!ctx) {
      logger.error('filed to get 2D context from canvas element');
      return;
    }

    ctx.fillStyle = 'transparent';
    ctx.clearRect(0, 0, w, h);

    this.stateQueue.map((s) => {
      ctx.fillStyle = toRgba(s.option.color, s.alpha);
      ctx.beginPath();
      ctx.ellipse(s.option.x, s.option.y, s.r, s.r, 0, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    });
  }
}

const logger = getLogger(TransitionService.name);

/**
 * Transition Service
 *
 * Singleton that manages active page transition
 */
export const transitionService = new TransitionService();
