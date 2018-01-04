import { getLogger } from '../util/logger';

export type subscriber<E> = (e: E) => void;

export interface IApplicationService<E> {
  subscribeStateUpdate: (sub: subscriber<E>) => void;
  unsubscribeStateUpdate: (sub: subscriber<E>) => void;
  getState: () => E;
}

export abstract class AbstractApplicationService<E> implements IApplicationService<E> {
  private serviceStateSubs: Array<subscriber<E>> = [];

  public subscribeStateUpdate(sub: subscriber<E>) {
    this.serviceStateSubs.push(sub);
  }

  public unsubscribeStateUpdate(sub: subscriber<E>) {
    const index = this.serviceStateSubs.indexOf(sub);
    if (index < 0) {
      logger.warn('attempting to remove non-exist subscriber from service '
        + (Object.getPrototypeOf(this).constructor.name || 'unknown'));
      return;
    }
    this.serviceStateSubs.splice(index, 1);
  }

  public abstract getState(): E;

  protected updateState() {
    const e = this.getState();
    this.serviceStateSubs.forEach((s) => s(e));
  }

}

const logger = getLogger(AbstractApplicationService.name);
