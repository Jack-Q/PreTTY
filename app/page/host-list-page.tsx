import * as React from 'react';

import * as styles from './host-list-page.scss';
import { IPageViewProps } from '../model/page';

export class HostListPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        Host List Page
      </div>
    );
  }
 }
