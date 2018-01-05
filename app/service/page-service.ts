import { IPage, ITab, PageViewState, PageViewType } from '../model/page';
import { AbstractApplicationService, IApplicationService } from '../model/service';
import { getLogger } from '../util/logger';
import { getServiceConnector } from '../util/connect-to-service';
import { getUid } from '../util/uid';
import { DefaultPage } from '../page/index';

interface IStateEvent {
  pageList: IPage[];
  tabList: ITab[];
  activeTabId: string;
}

class PageService extends AbstractApplicationService<IStateEvent> implements IApplicationService<IStateEvent> {
  private pageList: IPage[] = [];
  private tabList: ITab[] = [];
  private activeTabId: string;

  constructor() {
    super();
    this.addNewTab();
  }

  public addNewTab(setActive: boolean = true) {
    const newTab = this.createTab();
    const newPage = this.createPage(DefaultPage);
    this.pushPage(newTab, newPage);
    this.activeTab(newTab);
  }

  public activeTab(tab: ITab) {
    if (this.activeTabId === tab.id) {
      return;
    }
    this.activeTabId = tab.id;
    if (tab.alert) {
      tab.alert = false;
    }
    this.updateState();
  }

  public getState(): IStateEvent {
    return {
      pageList: this.pageList,
      tabList: this.tabList,
      activeTabId: this.activeTabId,
    };
  }

  public pushPage(tab: ITab, page: IPage): void {
    if (page.tabId !== '') {
      logger.warn(`attempt to add page ${page.id} to multiple tabs`);
      return;
    }
    page.tabId = tab.id;
    tab.pageStack.push(page);
  }

  public popPage(tab: ITab): IPage | undefined {
    const topPage = tab.pageStack[tab.pageStack.length - 1];
    if (!topPage) {
      logger.warn(`pop page from empty tab ${tab.id}`);
      return undefined;
    }
    logger.info(`pop page ${topPage.id} from tab ${tab.id}`);
    tab.pageStack.pop();

    if (topPage.state !== PageViewState.BACKGROUND) {
      logger.warn(`pop a page before it goes background`);
    }

    topPage.tabId = '';
    topPage.state = PageViewState.BACKGROUND;

    return topPage;
  }

  private createTab(title: string = 'Hello@PreTTY'): ITab {
    return {
      id: getUid(),
      displayText: title,
      alert: false,
      processing: false,
      pageStack: [],
    };
  }

  private createPage(view: PageViewType): IPage {
    return {
      id: getUid(),
      tabId: '',
      state: PageViewState.BACKGROUND,
      title: '',
      view,
    };
  }
}

const logger = getLogger(PageService.name);

export const pageService = new PageService();
export const pageServiceConnector = getServiceConnector<IStateEvent, PageService>(pageService);
