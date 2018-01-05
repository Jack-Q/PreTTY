import * as React from 'react';

import * as styles from './history-list-page.scss';
import { IPageViewProps } from '../model/page';

export class HistoryListPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        History List Page
      </div>
    );
  }
 }
