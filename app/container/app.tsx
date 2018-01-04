import * as React from 'react';
import { remote } from 'electron';
const { BrowserWindow } = remote;

import { Title } from './title';
import * as styles from './app.scss';

interface IPropsType {
  clientArea: React.ReactNode;
  stackLayers: React.ReactNode[];
}

export class App extends React.Component<IPropsType> {

  public render() {
    return (
      <div className={styles.container} >
        <div className={styles.stackHost}>
          {this.props.stackLayers}
        </div>
        <div className={styles.title}>
          <div className={styles.appIcon}></div>
          <div className={styles.titleContainer}>
            <Title />
          </div>
          <div className={styles.appControl}>
            <div className={styles.dragIcon}>
              <i className="material-icons">open_with</i>
            </div>
            <div className={styles.minIcon}>
              <i className="material-icons" onClick={() => BrowserWindow.getFocusedWindow().minimize()}>remove</i>
            </div>
            <div className={styles.maxIcon}>
              <i className="material-icons" onClick={() => this.maxIconAction()}>crop_free</i>
            </div>
            <div className={styles.closeIcon}>
              <i className="material-icons" onClick={() => BrowserWindow.getFocusedWindow().close()}>close</i>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          {this.props.clientArea}
        </div>
      </div>
    );
  }

  private maxIconAction() {
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow.isMaximized()) {
      currentWindow.unmaximize();
    } else {
      currentWindow.maximize();
    }
  }
}
