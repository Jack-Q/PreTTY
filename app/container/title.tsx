import * as React from 'react';

import * as styles from './title.scss';
import { getUid } from '../util/uid';

interface ITabInfo {
  key: string;
  displayText: string;
  alert: boolean;
}

interface IPropsType {
  tabs: ITabInfo[];
  currentTab: string;
  onMouseOverTab: string;
  activeTab: (tab: string) => void;
  mouseOverTab: (tab: string) => void;
  addTab: (key: string, displayText: string, alert: boolean) => void;
  delTabByKey: (key: string) => void;
}

// TODO:
// * context menu: close, close all
// * drag & order
// * pin to left

class TitleView extends React.Component<IPropsType> {
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
            this.props.tabs.map((t) => (
              <div key={t.key} className={styles.tab} style={{
                background: t.key === this.props.currentTab && this.props.tabs.length > 1 ? '#222' : 'none',
                color: t.key === this.props.currentTab ? '#fff' : 'rgb(156, 149, 149)',
              }}
                onClick={() => this.props.activeTab(t.key)}
                onMouseOver={() => {
                  this.props.mouseOverTab(t.key);
                }} >
                {t.displayText}
                <div className={styles.close} style={{
                  display: this.props.tabs.length > 1 &&
                    (t.key === this.props.currentTab || t.key === this.props.onMouseOverTab) ?
                    'inline-block' : 'none',
                }}
                  onClick={(e) => { this.props.delTabByKey(t.key); e.stopPropagation(); }} >
                  ×
                </div>
              </div>
            ))
          }
        </div>

        <div className={styles.addBtn} onClick={() => this.props.addTab(getUid(), 'New Tab', false)}>
          <i className="material-icons">add</i>
        </div>
      </div>
    );
  }
}

export class Title extends React.Component<{}, { currentTab: string, onMouseOverTab: string }> {
  private tabs = [
    { key: 'tab1', displayText: 'Tab 01', alert: false },
    { key: 'tab2', displayText: 'Tab 02', alert: false },
    { key: 'tab3', displayText: 'Tab 03', alert: false },
  ];

  constructor(props: any) {
    super(props);
    this.state = { currentTab: 'tab1', onMouseOverTab: '' };
  }

  public activeTab(t: string) {
    console.log(t);
    this.setState({ currentTab: t });
  }
  public render() {
    return (
      <TitleView tabs={this.tabs} currentTab={this.state.currentTab} onMouseOverTab={this.state.onMouseOverTab}
        activeTab={(t) => this.activeTab(t)}
        mouseOverTab={(t) => this.setState({ onMouseOverTab: t })}
        addTab={(key: string, displayText: string, alert: boolean) => {
          this.tabs.push({ key, displayText, alert });
          this.setState({ currentTab: key });
        }}
        delTabByKey={(key: string) => {
          let index = -1;
          for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].key === key) {
              index = i;
            }
          }

          if (index === -1) { return; }

          this.tabs.splice(index, 1);
          if (this.state.currentTab === key && this.tabs.length >= 1) {
            if (index > 1) {
              this.activeTab(this.tabs[index - 1].key);
            } else {
              this.activeTab(this.tabs[0].key);
            }
          }

          this.forceUpdate();
        }} />
    );
  }
}
