import { getLogger } from '../util/logger';
import { IApplicationAction } from '../model/action';
import { AbstractApplicationService, IApplicationService } from '../model/service';
import { connectToService } from '../util/connect-to-service';

// TODO: add persistence storage based storage for usage statistics and ranking

interface IQuickActionEntry {
  action: IApplicationAction;
  groupKey: string;
}

interface IStateEvent {
  isPanelOpen: boolean;
  filterQuery: string;
  filterResult: IQuickActionEntry[];
}
class QuickActionService extends AbstractApplicationService<IStateEvent> implements IApplicationService<IStateEvent> {
  private isPanelOpen: boolean = false;
  private actionList: IQuickActionEntry[] = [];
  private filterQuery: string = '';
  private filterResult: IQuickActionEntry[] = [];

  public openQuickAction() {
    if (!this.isPanelOpen) {
      this.isPanelOpen = true;
    }
    this.updateState();
  }

  public closeQuickAction() {
    if (this.isPanelOpen) {
      this.isPanelOpen = false;
    }
    this.updateState();
  }

  public addActionList(listId: string, items: IApplicationAction[]) {
    items.forEach((a) => this.actionList.push({ action: a, groupKey: listId }));
    this.applyFilter();
  }

  public removeActionList(listId: string) {
    this.actionList.forEach((a, i) => {
      if (a.groupKey === listId) {
        this.actionList.splice(i, 1);
      }
    });
    this.applyFilter();
  }

  public updateFilter(filter: string): IQuickActionEntry[] {
    if (this.filterQuery === filter) { return this.filterResult; }
    this.filterQuery = filter;
    return this.applyFilter();
  }

  public getState(): IStateEvent {
    return {
      isPanelOpen: this.isPanelOpen,
      filterQuery: this.filterQuery,
      filterResult: this.filterResult,
    };
  }

  private applyFilter() {
    logger.info('filter action list using query ' + this.filterQuery);
    const list = this.actionList;
    const query = this.filterQuery;
    const result = list.map((a) => {
      // TODO: filter result and labeling the result
      return {
        weight: (a.action.displayName.indexOf(query) > 0 ? 3 : 0) + (a.action.description.indexOf(query) > 0 ? 1 : 0),
        action: a,
      };
    })
      .filter((r) => r.weight > 0)
      .sort((a, b) => a.weight - b.weight)
      .map((r) => r.action);
    this.updateState();
    return result;
  }
}

const logger = getLogger(QuickActionService.name);

export const quickActionService = new QuickActionService();
export const quickActionServiceConnector =
  <P, O = {}>(mapper: (state: IStateEvent, svc: QuickActionService) => P, Component: React.ComponentType<P | O>) =>
  connectToService<IStateEvent, QuickActionService, O, P>(quickActionService, mapper)(Component);
