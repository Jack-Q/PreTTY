import * as React from 'react';

import * as styles from './title.scss';
import { pageServiceConnector, pageService } from '../service/page-service';
import { ITab } from '../model/page';

interface IProps {
  tabList: ITab[];
  currentTab: string;
}

interface IState {
  onMouseOverTab: string;
}

// TODO:
// * context menu: close, close all
// * drag & order
// * pin to left

class TitleView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { onMouseOverTab: '' };
  }

  public render() {
    return (
      <div className={styles.title}>
        <div className={styles.tabContainer} onWheel={(e) => {
          if (e.deltaMode === 0) {
            e.currentTarget.scrollLeft += e.deltaY;
          } else if (e.deltaMode === 2) {
            e.currentTarget.scrollLeft += e.deltaY * 50;
          }
          e.preventDefault();
        }}>
          {
            this.props.tabList.map((t) => (
              <div key={t.id} className={styles.tab} style={{
                background: t.id === this.props.currentTab && this.props.tabList.length > 1 ? '#222' : 'none',
                color: t.id === this.props.currentTab ? '#fff' : 'rgb(156, 149, 149)',
              }}
                onClick={() => this.activeTab(t)}
                onMouseOver={() => this.setState({onMouseOverTab: t.id})} >
                {t.displayText}
                <div className={styles.close} style={{
                  display: this.props.tabList.length > 1 &&
                    (t.id === this.props.currentTab || t.id === this.state.onMouseOverTab) ?
                    'inline-block' : 'none',
                }}
                  onClick={(e) => { this.closeTab(t); e.stopPropagation(); }} >
                  ×
                </div>
              </div>
            ))
          }
        </div>

        <div className={styles.addBtn} onClick={() => this.addTab()}>
          <i className="material-icons">add</i>
        </div>
      </div>
    );
  }

  private activeTab(tab: ITab) {
    pageService.activeTab(tab);
  }

  private addTab() {
    pageService.addNewTab();
  }

  private closeTab(tab: ITab) {
    pageService.closeTab(tab);
  }
}

export const Title = pageServiceConnector<IProps, {}>(
  (state, svc) => ({
    tabList: state.tabList,
    currentTab: state.activeTabId,
  }),
  TitleView,
);
