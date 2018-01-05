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

  public replaceTabPage(tabId: string, pageView: PageViewType) {
    const tab = this.tabList.find((t) => t.id === tabId);
    if (!tab) {
      logger.warn('attempt to replace page of non-exist tab');
      return;
    }
    const oldPage = this.popPage(tab);
    if (oldPage) {
      this.removePage(oldPage);
    }
    const newPage = this.createPage(pageView);
    this.pushPage(tab, newPage);
    this.updateState();
  }

  public closeTab(tab: ITab) {
    // TODO: check confirmation
    this.removeTab(tab);
    this.updateState();
  }

  public getState(): IStateEvent {
    return {
      pageList: this.pageList,
      tabList: this.tabList,
      activeTabId: this.activeTabId,
    };
  }

  private pushPage(tab: ITab, page: IPage): void {
    if (page.tabId !== '') {
      logger.warn(`attempt to add page ${page.id} to multiple tabs`);
      return;
    }
    page.tabId = tab.id;
    tab.pageStack.push(page);
  }

  private popPage(tab: ITab): IPage | undefined {
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
    const newTab: ITab =  {
      id: getUid(),
      displayText: title,
      alert: false,
      processing: false,
      pageStack: [],
    };
    this.tabList.push(newTab);
    return newTab;
  }

  private createPage(view: PageViewType): IPage {
    const newPage: IPage = {
      id: getUid(),
      tabId: '',
      state: PageViewState.BACKGROUND,
      title: '',
      view,
    };
    this.pageList.push(newPage);
    return newPage;
  }

  private removeTab(tab: ITab) {
    const index = this.tabList.indexOf(tab);
    if (index < 0) {
      logger.warn('cannot remove tab that does not exist in tab list');
      return;
    }
    if (this.activeTabId === tab.id) {
      const nextTab = this.tabList[index ? index - 1 : index + 1];
      if (!nextTab) {
        this.createTab();
      } else {
        this.activeTabId = nextTab.id;
      }
    }
    this.tabList.splice(index, 1);
    tab.pageStack.forEach((p) => this.removePage(p));
    this.updateState();
  }

  // This method won't remove page from tab stack
  private removePage(page: IPage) {
    const index = this.pageList.indexOf(page);
    if (index < 0) {
      logger.warn('cannot remove page that does not exist in page list');
      return;
    }
    this.pageList.splice(index, 1);
    this.updateState();
  }
}

const logger = getLogger(PageService.name);

export const pageService = new PageService();
export const pageServiceConnector = getServiceConnector<IStateEvent, PageService>(pageService);
