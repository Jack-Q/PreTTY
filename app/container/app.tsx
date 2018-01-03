import * as React from 'react';
import * as styles from './app.scss';

import { Title } from './title';

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
            <div className={styles.minIcon}></div>
            <div className={styles.maxIcon}></div>
            <div className={styles.closeIcon}></div>
          </div>
        </div>
        <div className={styles.body}>
          {this.props.clientArea}
        </div>
      </div>
    );
  }
}
